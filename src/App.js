// import './App.css';
import React, { useState, useEffect } from 'react';
// https://react-bootstrap.netlify.app/components/alerts/
import { Button,Spinner,Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { sendNotification } from './admin';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/database";
import 'firebase/messaging';

// for notification
import { messaging } from "./init-fb";

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [currentQueue, setCurrentQueue] = useState(-1);
    const [clientToken, setClientToken] = useState("");
    const [myQueue, setMyQueue] = useState(0);
    const [isQueued, setIsQueued] = useState(false);
    const [maxTempQueue, setMaxTempQueue] = useState(0);

    useEffect(() => {
        // messaging.getToken({vapidKey: 'BG-a-Os5Oj_h6vslrY_T4O1HspRzkGSNi-EX5BGaGD_4t8lrU3IUYZzfLe_lOm4ktJrkfer3eqqR8FdIkStPXcQ'}).then((currentToken) => {
        //     if (currentToken) {
        //         // Send the token to your server and update the UI if necessary
        //         // ...
        //         console.log(currentToken);
        //         setClientToken(currentToken);
        //     } else {
        //         // Show permission request UI
        //         console.log('No registration token available. Request permission to generate one.');
        //         // ...
        //     }
        // }).catch((err) => {
        //     console.log('An error occurred while retrieving token. ', err);
        //     // ...
        // });
        // set notification
        messaging.requestPermission()
            .then(async function() {
                const token = await messaging.getToken();
                console.log(token);
                setClientToken(token);
            })
            .catch(function(err) {
                console.log("Unable to get permission to notify.", err);
            });
        navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
        // sign in
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
    },[]);
    useEffect(() => {
        if (firebase.auth().currentUser){
            firebase.database().ref('users/' + firebase.auth().currentUser.uid).on('value', (snapshot) => {
                if(snapshot.exists()){
                    const data = snapshot.val();
                    setMyQueue(data);
                    setIsQueued(true);
                }else{
                    setIsQueued(false);
                }
                setIsLoading(false);
            });
        }
        if(currentQueue === myQueue){
            sendNotification(clientToken);
        }
    });
    const onButtonClick = () => {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).set(maxTempQueue + 1);
        firebase.database().ref('max_temp_queue').set(maxTempQueue + 1);
    };
    const showMyPanel = () => {
        if(isQueued && myQueue >= currentQueue){
            if(currentQueue !== myQueue){
                return (
                    <div>
                        <h2>คิวของคุณ คือ <Badge variant="primary">{myQueue}</Badge></h2>
                        <Badge variant="warning">{`เหลืออีก ${myQueue - currentQueue} คิว`}</Badge>
                    </div>
                )
            }else{
                return (
                    <div>
                        <h1><Badge variant="success">ถึงคิวของคุณแล้ว</Badge></h1>
                    </div>
                )
            }

        }else{
            return (
                <Button variant="primary" onClick={() => onButtonClick()}>
                    เริ่มจองคิว
                </Button>
            )
        }
    };
    const showMainPanel = () => {
        if (isLoading){
            return (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )
        }else{
            return (
                <div>
                    <h1 className="">คิวปัจจุบัน คือ <Badge variant="danger">{currentQueue}</Badge></h1>
                    <hr className="text-white"/>
                    {showMyPanel()}
                </div>
            )
        }
    };
    return (
        <div className="App">
            <header className="App-header">
                {showMainPanel()}
                {/*<Button onClick={() => testSendNotice()}>Test Send notification</Button>*/}
            </header>
        </div>
    );
}

export default App;
