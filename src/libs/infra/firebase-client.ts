// src/libs/infra/firebase-client.ts
import { getAnalytics, Analytics } from "firebase/analytics";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const clientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};

let firebaseApp: FirebaseApp;
let analytics: Analytics | undefined;
let db: Firestore;
let auth: Auth;

export function getFirebaseClient() {
  if (!firebaseApp) {
    firebaseApp = initializeApp(clientConfig);
    if (typeof window !== "undefined") {
      analytics = getAnalytics(firebaseApp);
    }
    db = getFirestore(firebaseApp);
    auth = getAuth(firebaseApp);
  }
  return { firebaseApp, analytics, db, auth };
}
