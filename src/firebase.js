import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC5JGQyuwPIleTZBCIYJbCtpeHu_VbyiaY",
  authDomain: "todosproject-d27c8.firebaseapp.com",
  projectId: "todosproject-d27c8",
  storageBucket: "todosproject-d27c8.appspot.com",
  messagingSenderId: "904153994825",
  appId: "1:904153994825:web:b068b7189d1b6f2de85198",
  databaseURL:
    "https://todosproject-d27c8-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
