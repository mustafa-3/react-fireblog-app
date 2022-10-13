import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

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

export const db = getDatabase(app);
export const dbRef = ref(getDatabase());
