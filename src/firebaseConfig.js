// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALBJb95Iii9TkqXyXUtkdqOvy0Owpyfk8",
  authDomain: "fire-detect-37214.firebaseapp.com",
  databaseURL: "https://fire-detect-37214-default-rtdb.firebaseio.com",
  projectId: "fire-detect-37214",
  storageBucket: "fire-detect-37214.appspot.com",
  messagingSenderId: "440410504810",
  appId: "1:440410504810:web:1a464feaa3efd7dd035413",
  measurementId: "G-HKYJP0W1CR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const storage = getStorage(app); 
export { database,storage };