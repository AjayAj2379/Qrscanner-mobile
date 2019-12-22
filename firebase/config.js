import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
const settings = {timestampsInSnapshots: true};




const firebaseConfig = {
  apiKey: "AIzaSyDCY6rHOoOWbCfk-3otRMMgcDcUwuaum3g",
  authDomain: "weather-forecast-7df64.firebaseapp.com",
  databaseURL: "https://weather-forecast-7df64.firebaseio.com",
  projectId: "weather-forecast-7df64",
  storageBucket: "weather-forecast-7df64.appspot.com",
  messagingSenderId: "371026169793",
  appId: "1:371026169793:web:2da9334c76d35dbc9de940"
  };

  firebase.initializeApp(firebaseConfig);

  firebase.firestore()

  export default firebase;