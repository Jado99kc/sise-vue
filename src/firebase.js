import firebase from 'firebase/app'
require('firebase/auth')


let firebaseConfig = {
    apiKey: "AIzaSyCFT7FUM_fFp1UK0cDZdmnV15maOfCqt9k",
    authDomain: "sise-upb.firebaseapp.com",
    projectId: "sise-upb",
    storageBucket: "sise-upb.appspot.com",
    messagingSenderId: "300089289784",
    appId: "1:300089289784:web:de4bfa6c829aebc26d8acd"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase