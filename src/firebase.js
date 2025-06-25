
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyBTbSb90cD6O61aKXDxpR6m8J55_wwA1zA",
  authDomain: "netflix-clone-527d9.firebaseapp.com",
  projectId: "netflix-clone-527d9",
  storageBucket:  "netflix-clone-527d9.firebasestorage.app",
  messagingSenderId: "271499957982",
  appId: "1:271499957982:web:0fdd49869466e08c1e144f"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    
     await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
      name,
    });

    
    return true;
    
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
    return false;
  }
};

const login = async (email, password) => {
  try {
    
   const result = await signInWithEmailAndPassword(auth, email, password);
   console.log('login success',result.user)
   return true;

  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
    return false;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

export { auth, db, login, signup, logout };