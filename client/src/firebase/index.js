import firebase from 'firebase/app'
import 'firebase/storage'

require("dotenv").config({ path: __dirname+'.env'} )

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: 'AIzaSyCtVqICzE7i7kJSmarv2D7_rUNrzoG0B8k',
    authDomain: 'websiteproject.firebaseapp.com',
    databaseURL: 'https://websiteproject.firebaseio.com',
    projectId: 'websiteproject',
    storageBucket: 'websiteproject.appspot.com',
    messagingSenderId: '581809465419',
    appId: '1:581809465419:web:8e99eb8ecc4122ba61c5ce'
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage()

  export {
    storage, firebase as default
  }
