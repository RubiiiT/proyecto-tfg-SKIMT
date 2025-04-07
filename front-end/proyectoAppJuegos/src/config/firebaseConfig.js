// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDfm1L_07cv07mk0mrl6AaiTxBFiaz3pRA",
    authDomain: "tfg-dam-appjuegos.firebaseapp.com",
    projectId: "tfg-dam-appjuegos",
    storageBucket: "tfg-dam-appjuegos.firebasestorage.app",
    messagingSenderId: "890975446919",
    appId: "1:890975446919:web:c6e60485049b67561d5522",
    measurementId: "G-FPPEMTF0Y4"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export{app,auth,signInWithEmailAndPassword};
