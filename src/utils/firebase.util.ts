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
  onAuthStateChanged,
  User,
  NextOrObserver,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  writeBatch,
  collection,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Category } from "../store/categories/categories-types";
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

type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDoc = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectToAdd.forEach((obj) => {
    const docRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(docRef, obj);
  });

  await batch.commit();
};

export const getCategoriesAndDocument = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const categoriesMap = querySnapshot.docs.map(
    (category) => category.data() as Category
  );

  return categoriesMap;
};

export type AdditionalInfo = {
  displayName: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};
export const createUserDocFromAuth = async (
  userAuth: User,
  additionalInfo = {} as AdditionalInfo
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  const docSnapshot = await getDoc(userDocRef);

  if (!docSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const creatAt = new Date();

    try {
      await setDoc(userDocRef, {
        ...additionalInfo,
        displayName,
        email,
        creatAt,
      });
    } catch (error) {
      console.log("error creating user", error);
    }
  }

  return docSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPass = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPass = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};
