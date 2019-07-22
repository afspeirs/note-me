import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const {
	REACT_APP_FIREBASE_API_KEY,
	REACT_APP_FIREBASE_AUTH_DOMAIN,
	REACT_APP_FIREBASE_DATABASE_URL,
	REACT_APP_FIREBASE_PROJECT_ID,
	REACT_APP_FIREBASE_STORAGE_BUCKET,
	REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
} = process.env;

const config = {
	apiKey: REACT_APP_FIREBASE_API_KEY,
	authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
	projectId: REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();

// This enables offline support
// Firebase is smart enough to update the changes when the user
// goes online again
firebase.firestore()
	.enablePersistence()
	.catch((error) => {
		if (error.code === 'failed-precondition') {
			// Multiple tabs open, persistence can only be enabled
			// in one tab at a a time.
			// ...
			console.log('Please close other tabs to allow the app to work offline');
		} else if (error.code === 'unimplemented') {
			// The current browser does not support all of the
			// features required to enable persistence
			// ...
			console.log('Offline support is not supported in this browser');
		}
	});
