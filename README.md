# NoteMe [![pipeline status](https://gitlab.com/AFSpeirs/note-me/badges/master/pipeline.svg)](https://gitlab.com/AFSpeirs/note-me/commits/master)


# Configuration
Create a `.env.local` with the following variables:

```
PORT=4100
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_DATABASE_URL=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_VERSION=$npm_package_version
```

The values, for the variables prefixed with FIREBASE, can be grabbed from the [Firebase Console](https://console.firebase.google.com).

## Available Scripts

In the project directory, you can run:


### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:4100](http://localhost:4100) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.


## More information

You can find the most recent version of the Create React App guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) for more information on how to perform common tasks.
