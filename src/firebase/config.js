import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbRuq4z6T0nbrG6W38gRzahy7si-x3qyM",
  authDomain: "musical-mystery-v2.firebaseapp.com",
  projectId: "musical-mystery-v2",
  storageBucket: "musical-mystery-v2.appspot.com",
  messagingSenderId: "417812095024",
  appId: "1:417812095024:web:9e3444b88cc9d1cf818df5",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
