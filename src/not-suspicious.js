import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/messaging';

const config = {
  apiKey: "AIzaSyA7uG2d0Q8j9INnu9D4M7vk4bQEeeLWsS8",
  authDomain: "botnet-eb509.firebaseapp.com",
  databaseURL: "https://botnet-eb509.firebaseio.com",
  projectId: "botnet-eb509",
  storageBucket: "botnet-eb509.appspot.com",
  messagingSenderId: "309446817270"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

document.addEventListener('DOMContentLoaded', () => {
  const messaging = firebase.messaging();
  const db        = firebase.firestore();

  messaging.usePublicVapidKey('BPLhVMkPS8wiQ4dbz8zTwkDuw8S_bE1t_m-kEoIZel8XXXdGJx4kxmuLTgJEV8BoZAy0Dy02xIqo_RVj-W_eX6I');

  messaging.requestPermission().then(() => {
    console.log('Notification permission granted.');
  
    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken().then(token => {
      if (token) {
        db.collection('users').add({ token }).then(() => console.log('Success')).catch(err => console.error(err));
      } else {
        console.log('No Instance ID token available. Request permission to generate one.');
      }
    }).catch(err => {
      console.error(err);
    });
  }).catch(err => {
    console.log('Unable to get permission to notify.', err);
  });
})
