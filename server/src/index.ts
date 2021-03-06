/* eslint-disable no-console */

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { cosineSimilarity, DocumentInterestVector } from './interest-vector';
import computeInterestVector from './nlp-process';

admin.initializeApp();

type User = { readonly name: string; readonly email: string };

const createHttpsFunctionWithAuthWall = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (user: User, data: any) => Promise<unknown>
): functions.HttpsFunction =>
  functions.https.onCall(
    async (data, context): Promise<unknown> => {
      const decodedIDToken = context.auth?.token;
      if (decodedIDToken == null) {
        return 'PERMISSION_DENIED';
      }
      const { name, email } = decodedIDToken;
      if (email == null) {
        return 'PERMISSION_DENIED';
      }
      return await handler({ name, email }, data);
    }
  );

const getAppStudyFromSnapshot = (
  snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
): readonly AppStudy[] => snapshot.docs.map((it) => ({ ...it.data(), id: it.id } as AppStudy));

const getAppStudyWithOccupiedTimes = async (
  study: AppStudy
): Promise<AppStudyWithOccupiedTimes> => {
  const snapshot = await admin
    .firestore()
    .collection('schedules')
    .where('studyID', '==', study.id)
    .get();
  const occupiedTimes = snapshot.docs.map((it) => it.data().timeSlot as string);
  return { ...study, occupiedTimes };
};

export const createStudySchedule = createHttpsFunctionWithAuthWall(
  async (
    { email: owner },
    { studyID, timeSlot }: { readonly studyID: string; readonly timeSlot: string }
  ) => {
    const occupiedTimes = (
      await admin.firestore().collection('schedules').where('studyID', '==', studyID).get()
    ).docs.map((it) => it.data().timeSlot as string);
    const availableTimes =
      ((await admin.firestore().collection('studies').doc(studyID).get()).data() as
        | AppStudy
        | undefined)?.availableTimes ?? [];
    if (occupiedTimes.includes(timeSlot) || !availableTimes.includes(timeSlot)) {
      return { status: 'FAILED' };
    }
    const appScheduleWithoutID: AppScheduleWithoutID = { owner, studyID, timeSlot };
    await admin.firestore().collection('schedules').add(appScheduleWithoutID);
    return { status: 'SUCCESS' };
  }
);

export const getTrending = createHttpsFunctionWithAuthWall(async () => {
  // TODO: actually compute it according to reservations.
  const snapshot = await admin.firestore().collection('studies').limit(10).get();
  return await Promise.all(getAppStudyFromSnapshot(snapshot).map(getAppStudyWithOccupiedTimes));
});

export const getInterested = createHttpsFunctionWithAuthWall(async ({ email }) => {
  const userInterestVectorSnapshot = await admin
    .firestore()
    .collection('profile-interest-vector')
    .doc(email)
    .get();
  if (!userInterestVectorSnapshot.exists) {
    const snapshot = await admin.firestore().collection('studies').limit(5).get();
    return await Promise.all(getAppStudyFromSnapshot(snapshot).map(getAppStudyWithOccupiedTimes));
  }
  const userInterestVector = userInterestVectorSnapshot.data() as DocumentInterestVector;
  const studiesInterestVectorsSnapshot = await admin
    .firestore()
    .collection('studies-interest-vector')
    .get();
  const interestVectorSimilaritySortedInDescendingOrder = studiesInterestVectorsSnapshot.docs
    .map(
      (document) =>
        [
          document.id,
          cosineSimilarity(userInterestVector, document.data() as DocumentInterestVector),
        ] as const
    )
    .sort(([, s1], [, s2]) => s2 - s1)
    .slice(0, 5);
  console.log(
    `id => cos similarity with ${email}: [${interestVectorSimilaritySortedInDescendingOrder
      .map(([id, similarity]) => `${id}: ${similarity}`)
      .join(', ')}]`
  );

  const mostInterestedStudyDocumentSnapshots = await Promise.all(
    interestVectorSimilaritySortedInDescendingOrder.map(([id]) =>
      admin.firestore().collection('studies').doc(id).get()
    )
  );
  return await Promise.all(
    mostInterestedStudyDocumentSnapshots.map((it) =>
      getAppStudyWithOccupiedTimes({ ...it.data(), id: it.id } as AppStudy)
    )
  );
});

const createDocumentListenerFunctionForInterestVectorComputation = (
  documentPath: string,
  textField: string,
  interestVectorCollection: string
) =>
  functions.firestore.document(documentPath).onWrite(async (change) => {
    console.log(`A document create/update on text is detected for ${documentPath} is detected.`);
    // Do nothing if data is removed.
    if (!change.after.exists) return;
    const textBefore = change.before.data()?.[textField];
    const textAfter = change.after.data()?.[textField];
    if (textAfter === textBefore) {
      console.log('No change in text. Avoid recomputing interest vector.');
      return;
    }
    if (typeof textAfter !== 'string') return;
    const interestVector = await computeInterestVector(textAfter);
    console.log(`Interest vector for "${textAfter}" is ${JSON.stringify(interestVector)}`);
    await admin
      .firestore()
      .collection(interestVectorCollection)
      .doc(change.after.id)
      .set(interestVector);
  });

export const onProfileWrite = createDocumentListenerFunctionForInterestVectorComputation(
  'profiles/{documentID}',
  'selfIntroduction',
  'profile-interest-vector'
);

export const onStudyWrite = createDocumentListenerFunctionForInterestVectorComputation(
  'studies/{documentID}',
  'description',
  'studies-interest-vector'
);
