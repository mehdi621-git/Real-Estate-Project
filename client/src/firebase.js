// Import the functions you need from the SDKs you need

import { initializeApp , getApps} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_firebaseApiKey,
  authDomain: "mern-estate-e6f1e.firebaseapp.com",
  projectId: "mern-estate-e6f1e",
  storageBucket: "mern-estate-e6f1e.firebasestorage.app",
  messagingSenderId:"620515211273",
  appId: "1:620515211273:web:2b8afaf26264099b52a0d8",
};

// Initialize Firebase
export const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];
