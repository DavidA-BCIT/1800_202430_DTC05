var currentUser;

function authenticateUser() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid); //global
            console.log("Logged in as uid: " + user.uid)
            $("#btn-login").hide();
            return true;
        }
        else {
            console.log("Not logged in")
            return false;
        }
    });
}

function setup() {
    authenticateUser();
}

$(document).ready(setup());