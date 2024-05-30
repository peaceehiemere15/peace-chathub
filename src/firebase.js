import { initializeApp } from "firebase/app";
import  {getAuth} from  "firebase/auth"
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCHxVNKLqT0XMjqIxZYrcxnjwmfleZ9vbs",
  authDomain: "chat-app-peace-ehiemere.firebaseapp.com",
  projectId: "chat-app-peace-ehiemere",
  storageBucket: "chat-app-peace-ehiemere.appspot.com",
  messagingSenderId: "723391659587",
  appId: "1:723391659587:web:10d860df12760ffde91ef6",
  measurementId: "G-KVJV65LZSL"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()


