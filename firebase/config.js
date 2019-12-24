import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
const settings = {timestampsInSnapshots: true};




const firebaseConfig = {
  // apiKey: "AIzaSyDCY6rHOoOWbCfk-3otRMMgcDcUwuaum3g",
  // authDomain: "weather-forecast-7df64.firebaseapp.com",
  // databaseURL: "https://weather-forecast-7df64.firebaseio.com",
  // projectId: "weather-forecast-7df64",
  // storageBucket: "weather-forecast-7df64.appspot.com",
  // messagingSenderId: "371026169793",
  // appId: "1:371026169793:web:2da9334c76d35dbc9de940"
    apiKey: "AIzaSyC0LW8oT83QijG10-Mh4oS0FqzIfrvlNk4",
    authDomain: "live-tracking-material.firebaseapp.com",
    databaseURL: "https://live-tracking-material.firebaseio.com",
    projectId: "live-tracking-material",
    storageBucket: "live-tracking-material.appspot.com",
    messagingSenderId: "563267877669",
    appId: "1:563267877669:web:696c4dc14975d3785338cc"
  };

  firebase.initializeApp(firebaseConfig);

  firebase.firestore()

  export default firebase;