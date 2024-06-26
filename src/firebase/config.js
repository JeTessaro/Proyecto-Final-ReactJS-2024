// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjdl3ENkXXPsZexWYWMiOzcMsvuY7DKOI",
  authDomain: "sillones-57765-react.firebaseapp.com",
  projectId: "sillones-57765-react",
  storageBucket: "sillones-57765-react.appspot.com",
  messagingSenderId: "280246092892",
  appId: "1:280246092892:web:9fd01c4af6514ffc33d299"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);