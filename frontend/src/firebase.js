import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA0LWwn5TS88jdzC_FNYFsBCb-UmaZrNuI",
    authDomain: "zimonlinemarket1.firebaseapp.com",
    projectId: "zimonlinemarket1",
    storageBucket: "zimonlinemarket1.appspot.com",
    messagingSenderId: "585600560567",
    appId: "1:585600560567:web:35acc28a99580ce6564c32",
    measurementId: "G-CVNF9JVCNS"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage };
