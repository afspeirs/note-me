# NoteMe

[![Netlify Status](https://api.netlify.com/api/v1/badges/5c3fcfd1-3410-451b-ae2c-82cd72888332/deploy-status)](https://app.netlify.com/sites/noteme/deploys)
![GitHub package.json version](https://img.shields.io/github/package-json/v/afspeirs/note-me)
[![LICENSE](https://img.shields.io/github/license/afspeirs/note-me)](LICENSE)

Create and store markdown notes

## Configuration

Create a `.env.local` with the following variables:

```plaintext
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
```

The values, for the variables prefixed with FIREBASE, can be grabbed from the [Firebase Console](https://console.firebase.google.com).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

Open [http://localhost:4100](http://localhost:4100) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
