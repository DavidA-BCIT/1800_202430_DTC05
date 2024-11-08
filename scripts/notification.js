
const firebaseConfig = {
 apiKey: "AIzaSyAo-ZfjJIyK2lYNYscaPDWaly4-V0Qbby4",
 authDomain: "project-dtc05.firebaseapp.com",
 projectId: "project-dtc05",
 storageBucket: "project-dtc05.firebasestorage.app",
 messagingSenderId: "172960139284",
 appId: "1:172960139284:web:2cdc5646b51af558fdff01"
};


const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


messaging.requestPermission()
    .then(() => messaging.getToken())
    .then((token) => {
        console.log("Token received:", token);
       
    })
    .catch((error) => {
        console.error("Permission denied or error in getting token:", error);
    });


messaging.onMessage((payload) => {
    console.log("Foreground message received:", payload);
    alert(payload.notification.title + ": " + payload.notification.body);
});
