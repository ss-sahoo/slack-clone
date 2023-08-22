// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAIUr-NDhWSDwqy9Wq4xe6KLTmTIwUoVBU",
  authDomain: "slack-clone-35a0a.firebaseapp.com",
  projectId: "slack-clone-35a0a",
  storageBucket: "slack-clone-35a0a.appspot.com",
  messagingSenderId: "1038541172046",
  appId: "1:1038541172046:web:a4d2d3d8975eacc7eb821f",
  measurementId: "G-KF26DWRDXR",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();
export { db, auth,provider };

