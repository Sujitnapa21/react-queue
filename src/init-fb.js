import firebase from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyBDdUJPdBT0s0TqZpgQzDqkzLIBXDHn3Hs",
    authDomain: "react-queue-d3e89.firebaseapp.com",
    projectId: "react-queue-d3e89",
    storageBucket: "react-queue-d3e89.appspot.com",
    messagingSenderId: "135870202303",
    appId: "1:135870202303:web:29acf5ceb056835109610a",
    measurementId: "G-96RND75CS1"
};
const initializedFirebaseApp = firebase.initializeApp(firebaseConfig);
export { initializedFirebaseApp };
