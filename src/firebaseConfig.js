export const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    "AIzaSyAibCF7RzjGHqB89xMWqdxSD6Lh81FN_RI",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "katielynch-63c34.firebaseapp.com",
  databaseURL:
    process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
    "https://katielynch-63c34-default-rtdb.firebaseio.com",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "katielynch-63c34",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "katielynch-63c34.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1026023205228",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:1026023205228:web:5d667908bcb87ca3afab49",
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-NLGS5SF6YX",
};

export const firebaseDatabaseUrl = firebaseConfig.databaseURL;
