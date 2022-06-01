import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAaFY-3RwCqkSPpeJlA-YwngT2l-U3S-GM",
  authDomain: "walletnode-819e6.firebaseapp.com",
  projectId: "walletnode-819e6",
  storageBucket: "walletnode-819e6.appspot.com",
  messagingSenderId: "572485137093",
  appId: "1:572485137093:web:5d870e63e7b6f2d02e76ac",
  measurementId: "G-Z1TZMDTQ8G",
});

export const socialMediaAuth = (provider) => {
  return auth
    .signInWithPopup(provider)
    .then((res) => {
      return res.user;
    })
    .catch((err) => {
      return err;
    });
};

export const db = firebase.firestore();

export const createUserDocument = async (user, firstName, lastName) => {
  const userRef = db.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exits) {
    const { email } = user;
    try {
      userRef.set({
        email,
        firstName,
        lastName,
        createdAt: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return user;
};

export const storage = firebase.storage();
export const auth = app.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default app;
