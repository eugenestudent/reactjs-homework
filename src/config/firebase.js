import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAknBcKaJ73x3k6Nie_MtgIr_sqMJ61XFw",
  authDomain: "react-hw-6d4f4.firebaseapp.com",
  projectId: "react-hw-6d4f4",
  storageBucket: "react-hw-6d4f4.firebasestorage.app",
  messagingSenderId: "600575595992",
  appId: "1:600575595992:web:89169fc7fa2337a0d44ead",
  measurementId: "G-29TCNXZCY0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;