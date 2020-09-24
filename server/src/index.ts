import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

const createHttpsFunctionWithAuthWall = (
  handler: (userEmail: string) => Promise<unknown>
): functions.HttpsFunction =>
  functions.https.onRequest(
    async (request, response): Promise<void> => {
      const { accessToken } = request.query;
      if (typeof accessToken !== 'string') {
        response.status(403).send('Permission denied');
        return;
      }
      if (process.env.UNSAFE === 'true') {
        // Allow us to impersonate users with certain email during development.
        // Treat access token as userEmail.
        const json = await handler(accessToken);
        response.status(200).send(json);
      } else {
        const decodedIDToken = await admin.auth().verifyIdToken(accessToken);
        const userEmail = decodedIDToken.email;
        if (userEmail == null) {
          response.status(403).send('Permission denied');
          return;
        }
        const json = await handler(userEmail);
        response.status(200).send(json);
      }
    }
  );

// TODO: implement this function when we have more DB structures.
export const getTrending = createHttpsFunctionWithAuthWall(async () => []);

export const getInterested = createHttpsFunctionWithAuthWall(async () => []);
