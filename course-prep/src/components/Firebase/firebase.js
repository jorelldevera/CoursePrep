import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDjg-BPB5gSO7d1cXPQdVdNe2-S5zFajbg",
    authDomain: "course-prep-3f4e4.firebaseapp.com",
    databaseURL: "https://course-prep-3f4e4.firebaseio.com",
    projectId: "course-prep-3f4e4",
    storageBucket: "course-prep-3f4e4.appspot.com",
    messagingSenderId: "826638564444",
    appId: "1:826638564444:web:2fbb7151ac7ab9c8457a99",
    measurementId: "G-ZKXBNBKJCC"
  };

  class Firebase {

      constructor() {
          app.initializeApp(firebaseConfig);

          this.auth = app.auth();
          this.db = app.database();
      }

      /*
        Authentication API
      */
      doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

      doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

      doSignOut = () => this.auth.signOut();

      doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

      doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

      /*
        User API
      */
      user = uid => this.db.ref(`user_test/${uid}`);

      users = () => this.db.ref('user_test');
  }


  export default Firebase;