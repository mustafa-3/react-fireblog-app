import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  ToastErrorNotify,
  ToastSuccessNotify,
  ToastWarnNotify,
} from "../helpers/ToastNotify";

const firebaseConfig = {
  apiKey: "AIzaSyAZKLWGhOqwxkdCWH9tVc-twnwUmIaK6Kw",
  authDomain: "firestore-a817c.firebaseapp.com",
  databaseURL: "https://firestore-a817c-default-rtdb.firebaseio.com",
  projectId: "firestore-a817c",
  storageBucket: "firestore-a817c.appspot.com",
  messagingSenderId: "684835426547",
  appId: "1:684835426547:web:f0dc25e976c93cbfd36786",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getDatabase(app);
export const dbRef = ref(getDatabase());

export const signUp = async (email, password, navigate, displayName) => {
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    navigate("/");
    console.log(userCredential);
    ToastSuccessNotify("Successfully Registered");
  } catch (error) {
    ToastErrorNotify(error.message);
  }
};
export const login = async (email, password, navigate) => {
  try {
    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    navigate("/");
    console.log(userCredential);
    ToastSuccessNotify("Successfully Logged in");
  } catch (error) {
    ToastErrorNotify(error.message);
  }
};
export const signInWithGoogle = (navigate) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      navigate("/");
      ToastSuccessNotify("Successfully Logged in");
    })
    .catch((error) => {
      ToastErrorNotify(error.message);
    });
};

export const logOut = () => {
  signOut(auth);
  ToastSuccessNotify("Successfully Logged out");
};
export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(false);
    }
  });
};

export const passwordReset = async (forgotEmail) => {
  await sendPasswordResetEmail(auth, forgotEmail)
    .then(() => {
      ToastWarnNotify("Please check your mail box!");
    })
    .catch((err) => {
      ToastErrorNotify(err.message);
    });
};
