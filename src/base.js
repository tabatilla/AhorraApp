import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDuYP8p8eykAj0u0yVZjWbzIa48YgSe82I",
    authDomain: "ahorra-616c0.firebaseapp.com",
    databaseURL: "https://ahorra-616c0.firebaseio.com",
    projectId: "ahorra-616c0",
    storageBucket: "ahorra-616c0.appspot.com",
    messagingSenderId: "481126956430"
  });


const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;