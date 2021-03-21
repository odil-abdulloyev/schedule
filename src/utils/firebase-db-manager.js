import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAZo91RB4gN6KUYjsbHgy1YX6X_1JTehM0',
  authDomain: 'schedule-86279.firebaseapp.com',
  databaseURL: 'https://schedule-86279-default-rtdb.firebaseio.com',
  projectId: 'schedule-86279',
  storageBucket: 'schedule-86279.appspot.com',
  messagingSenderId: '555220549021',
  appId: '1:555220549021:web:fd34d525b3f6d1134a4374',
  measurementId: 'G-3JBYPE8F76',
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default class FirebaseDBManager {
  constructor() {
    this.database = firebase.database();
  }

  ref(path) {
    return this.database.ref(path);
  }

  write(path, data) {
    this.ref(path).set(data);
    return this;
  }

  push(path, data) {
    return this.ref(path).push(data).key;
  }

  remove(path) {
    this.ref(path).remove();
    return this;
  }

  update(path, newData) {
    this.ref(path).update(newData);
    return this;
  }

  async select(path, callback) {
    return await this.ref(path).on('value', (snapshot) => callback(snapshot.val()));
  }
}
