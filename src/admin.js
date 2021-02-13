
export function sendNotification(clientToken) {
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
    fetch("https://fcm.googleapis.com/fcm/send", fetchOptions)
        .then(response => response.json())
        .then(data => console.log(data));
}
