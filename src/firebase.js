import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAibCF7RzjGHqB89xMWqdxSD6Lh81FN_RI",
  authDomain: "katielynch-63c34.firebaseapp.com",
  databaseURL: "https://katielynch-63c34-default-rtdb.firebaseio.com",
  projectId: "katielynch-63c34",
  storageBucket: "katielynch-63c34.firebasestorage.app",
  messagingSenderId: "1026023205228",
  appId: "1:1026023205228:web:5d667908bcb87ca3afab49",
  measurementId: "G-NLGS5SF6YX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();