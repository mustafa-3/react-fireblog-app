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
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};
export const signInWithGoogle = (navigate) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      navigate("/");
    })

    .catch((error) => {
      console.log(error);
    });
};

export const logOut = () => {
  signOut(auth);
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
  //? Email yoluyla şifre sıfırlama için kullanılan firebase metodu
  await sendPasswordResetEmail(auth, forgotEmail)
    .then(() => {
      // Password reset email sent!
      alert("sadas");
      // alert("Please check your mail box!");
    })
    .catch((err) => {
      alert(err);
      // alert(err.message);
      // ..
    });
};
