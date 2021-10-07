import {
  API_KEY,
  AUTH_DOMAIN,
  FIREBASE_APP_ID,
  MEASUREMENT_ID,
  MESSAGING_SENDER_ID,
  PROYECT_ID,
  STORAGE_BUCKET,
} from "./constants";

export const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROYECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: MEASUREMENT_ID,
};
