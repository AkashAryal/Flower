/* eslint-disable no-console */

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import computeInterestVector from './nlp-process';

admin.initializeApp();

type User = { readonly name: string; readonly email: string };

const createHttpsFunctionWithAuthWall = (
  handler: (user: User) => Promise<unknown>
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
      return await handler({ name, email });
    }
  );

export const getTrending = createHttpsFunctionWithAuthWall(async () => {
  // TODO: actually compute it according to reservations.
  const snapshot = await admin.firestore().collection('studies').limit(10).get();
  return snapshot.docs.map((it) => ({ ...it.data(), id: it.id }));
});

export const getInterested = createHttpsFunctionWithAuthWall(async () => {
  // TODO: actually compute it according to interest vector.
  const snapshot = await admin.firestore().collection('studies').get();
  return snapshot.docs.map((it) => ({ ...it.data(), id: it.id }));
});

export const getUserNameForTesting = createHttpsFunctionWithAuthWall(async (user) => user);

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
