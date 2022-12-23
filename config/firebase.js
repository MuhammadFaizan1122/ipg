import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCBLKKFnJ26WQEs6gahD8raB3xiB_jCm0U",
    authDomain: "iron-power-gy.firebaseapp.com",
    projectId: "iron-power-gy",
    storageBucket: "iron-power-gy.appspot.com",
    messagingSenderId: "654189422613",
    appId: "1:654189422613:web:4265c0688b939f613e061c",
    measurementId: "G-86TPD9YNC1"
};

const firebase = initializeApp(firebaseConfig);
export const db = getDatabase(firebase)
export const fsDb = getFirestore(firebase)
export const storage = getStorage(firebase)