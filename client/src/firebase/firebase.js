import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/analytics';

var firebaseConfig = {
  apiKey: "AIzaSyDvtsW-elV2Oh0hgN-ueIV2Ojcre3t6WjY",
  authDomain: "mvp-images.firebaseapp.com",
  projectId: "mvp-images",
  storageBucket: "mvp-images.appspot.com",
  messagingSenderId: "595122006120",
  appId: "1:595122006120:web:fe8fb10ea4a92a375673dd",
  measurementId: "G-DPSK7F85QF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
firebase.analytics();

export  {
  storage, firebase as default
}