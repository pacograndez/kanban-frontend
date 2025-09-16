export const environment = {
    urlApi: 'http://127.0.0.1:5001/apps-tasks-fda89/us-central1/api/api',
    useEmulators: true,
    firebaseConfig: {
        apiKey: process.env['NG_APP_FIREBASE_API_KEY'],
        authDomain: process.env['NG_APP_FIREBASE_AUTH_DOMAIN'],
        projectId: process.env['NG_APP_FIREBASE_PROJECT_ID'],
        storageBucket: process.env['NG_APP_FIREBASE_STORAGE_BUCKET'],
        messagingSenderId: process.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID'],
        appId: process.env['NG_APP_FIREBASE_APP_ID']
    }
};
