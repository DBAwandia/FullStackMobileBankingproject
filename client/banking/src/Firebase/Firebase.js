import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAct-9hEWd2nCl6MmtGSrjTvpO1DokX090",
  authDomain: "banking-b89cf.firebaseapp.com",
  projectId: "banking-b89cf",
  storageBucket: "banking-b89cf.appspot.com",
  messagingSenderId: "320262820315",
  appId: "1:320262820315:web:1371e1b9c67a61815557fe"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)