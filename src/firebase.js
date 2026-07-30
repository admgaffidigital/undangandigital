import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPTi4SIQybqHRTSIELbQChomtclrYjYZ4",
  authDomain: "undangan-digital-e6a6e.firebaseapp.com",
  projectId: "undangan-digital-e6a6e",
  storageBucket: "undangan-digital-e6a6e.firebasestorage.app",
  messagingSenderId: "942526145506",
  appId: "1:942526145506:web:a0528459c634acd58a0fbb",
  measurementId: "G-3LJBS1LN3V"
};

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  }),
  experimentalForceLongPolling: true,
});

export const auth = getAuth(app);
