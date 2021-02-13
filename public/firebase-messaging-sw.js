// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");
const firebaseConfig = {
    apiKey: "AIzaSyBDdUJPdBT0s0TqZpgQzDqkzLIBXDHn3Hs",
    authDomain: "react-queue-d3e89.firebaseapp.com",
    projectId: "react-queue-d3e89",
    storageBucket: "react-queue-d3e89.appspot.com",
    messagingSenderId: "135870202303",
    appId: "1:135870202303:web:29acf5ceb056835109610a",
    measurementId: "G-96RND75CS1"
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
    // eslint-disable-next-line no-undef
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true,
        })
        .then((windowClients) => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            // eslint-disable-next-line no-undef
            return registration.showNotification("my notification title");
        });
    return promiseChain;
});
// eslint-disable-next-line no-restricted-globals
self.addEventListener("notificationclick", function(event) {
    console.log(event);
});
