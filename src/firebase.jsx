import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHxMBs8zkokKnQvd5bZ0XK7ZrKByHQS9Q",
  authDomain: "mentorhub-hackathon.firebaseapp.com",
  projectId: "mentorhub-hackathon",
  storageBucket: "mentorhub-hackathon.appspot.com",
  messagingSenderId: "518089208103",
  appId: "1:518089208103:web:08954b3e4c1bee6d983902",
  measurementId: "G-KHFQ6WKXW6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

export default app;