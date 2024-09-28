import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMzrd_1OGfaKctuJzV2vHi8zNGCxH43uQ",
  authDomain: "llm-models-comparison.firebaseapp.com",
  projectId: "llm-models-comparison",
  storageBucket: "llm-models-comparison.appspot.com",
  messagingSenderId: "1082819733202",
  appId: "1:1082819733202:web:4dd91615a2ae1570fdaf0b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
