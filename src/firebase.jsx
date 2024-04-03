import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGpVxaOqQgHZUgFEdpQq7ujvE54c456vc",
  authDomain: "mentorhub-databse.firebaseapp.com",
  projectId: "mentorhub-databse",
  storageBucket: "mentorhub-databse.appspot.com",
  messagingSenderId: "944346962302",
  appId: "1:944346962302:web:19a68a5912a4abda1c3b2f",
  measurementId: "G-CNX80G5E68"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage();


export default app;