// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import auth
import {
  getAuth,
  //   signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDmLtSizJxXR3E70RGHeo0L6b8kWeIBgqY",
  authDomain: "crwn-clothing-db-2e5e4.firebaseapp.com",
  projectId: "crwn-clothing-db-2e5e4",
  storageBucket: "crwn-clothing-db-2e5e4.appspot.com",
  messagingSenderId: "304659162980",
  appId: "1:304659162980:web:39eb5f2bdc5cf20940fc71",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signWithGoogle = () => signInWithPopup(auth, googleProvider);
// export const signWithGoogleRedirect = () =>
//   signInWithRedirect(auth, googleProvider);

const db = getFirestore();

export const createUserDocFromAuth = async (userAuth, additionalInfo) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  const docSnapshot = await getDoc(userDocRef);

  if (!docSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const creatAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        creatAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPass = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const singInAuthUserWithEmailAndPass = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);
