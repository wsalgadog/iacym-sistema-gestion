// Conveniently import this file anywhere to use db

import firebase from 'firebase/app'
import 'firebase/firestore'

export const db = firebase
    .initializeApp({ 
        apiKey: "AIzaSyBWNb2g6ZAb5_Xvx_aD1xsTcNkPvMZrBbg",
        authDomain: "iacym-gestion-personas.firebaseapp.com",
        databaseURL: "https://iacym-gestion-personas.firebaseio.com",
        projectId: "iacym-gestion-personas",
        storageBucket: "iacym-gestion-personas.appspot.com",
        messagingSenderId: "266501441745",
        appId: "1:266501441745:web:f18c63cfe07fb9ef4a5df0"        
    })
    .firestore()

//export const db = app.database();
// Export types that exists in Firestore - Uncomment if you need them in your app
// const { Timestamp, GeoPoint } = firebase.firestore
// export { Timestamp, GeoPoint }

//export const personasRef = db.collection('personas')

export const personasRef = db.collection('personas')
export const gruposRef = db.collection('grupos')
