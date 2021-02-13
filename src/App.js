import './App.css';
import React, { useState, useEffect } from 'react';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/database";

function App() {
    const [currentQueue, setCurrentQueue] = useState(0);
    const [maxTempQueue, setMaxTempQueue] = useState(0);
    useEffect(() => {
        firebase.auth().signInAnonymously()
            .then(() => {
                console.log("sign in!!")
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
        // https://firebase.google.com/docs/database
        var starCountRef = firebase.database().ref('/current_queue');
        starCountRef.on('value', (snapshot) => {
            const data = snapshot.val();
            setCurrentQueue(data);
        });
        firebase.database().ref('max_temp_queue').on('value', (snapshot) => {
            const data = snapshot.val();
            setMaxTempQueue(data);
        });
    });
    const onButtonClick = () => {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).set(maxTempQueue + 1);
        firebase.database().ref('max_temp_queue').set(maxTempQueue + 1);
    }
    return (
        <div className="App">
            <header className="App-header">
                <p>{`คิวปัจจุบัน ${currentQueue}`}</p>
                <button onClick={() => onButtonClick()}>
                  เริ่มจองคิว
                </button>
            </header>
        </div>
    );
}

export default App;
