// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTRF0OPhFjBL6qR-IpXXv4C3ZKXnfamMs",
  authDomain: "text-tracker-fcbec.firebaseapp.com",
  projectId: "text-tracker-fcbec",
  storageBucket: "text-tracker-fcbec.appspot.com",
  messagingSenderId: "537615360916",
  appId: "1:537615360916:web:8832030548f16f18d86581",
  measurementId: "G-RCYK0V5L1J"
};

// Initialize Firebase
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); 