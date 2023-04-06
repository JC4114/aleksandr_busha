

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBNJgitqiCTTuFhaj0UGM62sSaY1MV-U7I",
    authDomain: "project-6934319074923327217.firebaseapp.com",
    projectId: "project-6934319074923327217",
    storageBucket: "project-6934319074923327217.appspot.com",
    messagingSenderId: "946232669450",
    appId: "1:946232669450:web:be524d716cb149441bf6f3",
    measurementId: "G-G41K66KTN5"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
