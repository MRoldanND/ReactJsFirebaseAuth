import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAY9rDF5fb1ZGL7t4cBgzRFZOuz3UZXx7Y",
  authDomain: "login-agencia.firebaseapp.com",
  databaseURL: "https://login-agencia.firebaseio.com",
  projectId: "login-agencia",
  storageBucket: "login-agencia.appspot.com",
  messagingSenderId: "474994441231",
  appId: "1:474994441231:web:9503a587ca3494f294b77a",
  measurementId: "G-JDQPLEHZLJ"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
 
    this.auth = app.auth();
  }
 
  //API de Atenticacion 

 
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
 
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
 
  doSignOut = () => this.auth.signOut();
 
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

}

export default Firebase;