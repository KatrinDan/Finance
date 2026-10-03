import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyCDn9s48vpFfcTTD63IC1CdFA7XCTKfIiE",
  authDomain: "finance-tracker-5b924.firebaseapp.com",
  projectId: "finance-tracker-5b924",
  storageBucket: "finance-tracker-5b924.firebasestorage.app",
  messagingSenderId: "33106637321",
  appId: "1:33106637321:web:7ba3d6a023e57f96dd7ed8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);