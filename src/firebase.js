import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
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
