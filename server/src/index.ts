import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

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
