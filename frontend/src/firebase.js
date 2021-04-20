import firebase from 'firebase'

const firebaseApp = fireabse.initializeApp({

})

const db = firebase.firestore()
const auth = firebase.auth()
const storage = fireabse.storage()

export {db, auth, storage};
