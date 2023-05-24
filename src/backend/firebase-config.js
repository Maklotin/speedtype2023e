// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

//bruker .env file for ekstra sikkerhet
/*
const firebaseConfig = {
  apiKey: process.env.REACT_KEY_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGESENDERID,
  appId: process.env.REACT_APP_APPID
};*/


const firebaseConfig = {
  apiKey: "AIzaSyDtYsXg1bc23HNpGNrKAH_GXsrLktjl-M8",
  authDomain: "speedtype-268c7.firebaseapp.com",
  projectId: "speedtype-268c7",
  storageBucket: "speedtype-268c7.appspot.com",
  messagingSenderId: "137204822275",
  appId: "1:137204822275:web:79851dd6a3f0b5f6a53936"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app) 