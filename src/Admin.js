import React, {useState} from "react";
import { Modal,Button } from 'react-bootstrap';
import firebase from "firebase/app";
import "firebase/database";

export default function Admin(props){
    const [show, setShow] = useState(false);
    const nextQueue = () => {
        firebase.database().ref('/current_queue').set(props.currentQueue + 1);
        firebase.database().ref('/max_temp_queue').set(props.currentQueue + 1);
    };
    const prevQueue = () => {
        firebase.database().ref('/current_queue').set(props.currentQueue - 1);
        firebase.database().ref('/max_temp_queue').set(props.currentQueue - 1);
    };
    return (
        <div>
            <Button variant="danger" className="mb-5" style={{position:'absolute',top: '0px',right: '0px'}} onClick={() => setShow(true)}>
                Admin panel
            </Button>
            <Modal
                size="lg"
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Test For Admin Only
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="primary" className="mr-4" onClick={() => prevQueue()}>
                        Previous
                    </Button>
                    <Button variant="primary" onClick={() => nextQueue()}>
                        Next
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export function sendNotification(clientToken) {
    console.log("send notice by token: " + clientToken);
    // https://firebase.google.com/docs/cloud-messaging/js/first-message
    const fetchOptions = {
        "mode": "cors",
        "method": "POST",
        "headers": {
            "authorization": "key=AAAAH6J-wb8:APA91bHIFFRqTP0H25oo9s4vAntKcDhptOcXzetfs66j0Ag1zN7ttkSFPyogqeSR5MF9ImXVIJff_z9-1qEN02serDWmag88vWoTEk7kR7j1P6d77kZH7Eh__xDzWNkl3XVdg7ZXugUn",
            "content-type": "application/json"
        },
        "body": JSON.stringify({
            "collapse_key" : "type_a",
            "notification" : {
                "body" : "ตอนนี้ถึงคิวของคุณแล้ว",
                "title": "แจ้งเตือนจาก React Queue",
                "icon": "http://www.liberaldictionary.com/wp-content/uploads/2019/02/icon-0326.jpg",
                "sound": "default"
            },
            "webpush": {
                "fcm_options": {
                    "link": "https://react-queue-d3e89.web.app/"
                },
                "headers": {
                    "Urgency": "high",
                    "TTL":"3600"
                }
            },
            // "data" : {
            //     "body" : "ถึงคิวของคุณแล้ว",
            //     "title": "แจ้งเตือนจาก React Queue",
            //     // "key_1" : "Value for key_1",
            //     // "key_2" : "Value for key_2"
            // },
            "to": clientToken
        })
    };
    console.info(fetchOptions);
    fetch("https://fcm.googleapis.com/fcm/send", fetchOptions)
        .then(response => response.json())
        .then(data => console.log(data));
}

