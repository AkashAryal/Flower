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

// TODO: implement this function when we have more DB structures.
export const getTrending = createHttpsFunctionWithAuthWall(async () => []);

export const getInterested = createHttpsFunctionWithAuthWall(async () => []);

export const getUserNameForTesting = createHttpsFunctionWithAuthWall(async (user) => user);
