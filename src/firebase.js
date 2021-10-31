import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { enableIndexedDbPersistence, getFirestore } from 'firebase/firestore';

const {
	VITE_FIREBASE_API_KEY,
	VITE_FIREBASE_AUTH_DOMAIN,
	VITE_FIREBASE_DATABASE_URL,
	VITE_FIREBASE_PROJECT_ID,
	VITE_FIREBASE_STORAGE_BUCKET,
	VITE_FIREBASE_MESSAGING_SENDER_ID,
} = import.meta.env;

const firebaseConfig = {
	apiKey: VITE_FIREBASE_API_KEY,
	authDomain: VITE_FIREBASE_AUTH_DOMAIN,
	databaseURL: VITE_FIREBASE_DATABASE_URL,
	projectId: VITE_FIREBASE_PROJECT_ID,
	storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

// This enables offline support
// Firebase is smart enough to update the changes when the user goes online again
enableIndexedDbPersistence(db)
	.catch((error) => {
		if (error.code === 'failed-precondition') {
			// Multiple tabs open, persistence can only be enabled in one tab at a a time.
			const event = new Event('firebasePersistenceFailedPrecondition');
			window.dispatchEvent(event);
		} else if (error.code === 'unimplemented') {
			// The current browser does not support all of the features required to enable persistence
			const event = new Event('firebasePersistenceUnimplemented');
			window.dispatchEvent(event);
		}
	});
