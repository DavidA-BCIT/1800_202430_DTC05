var currentUser;

function authenticateUser() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            getCourseInfo();
        }
        else {
            console.log("Not logged in!");
            window.location.replace("login.html")
        }
    })
}

function getCourseInfo() {
    let params = new URL(window.location.href);
    let ID = params.searchParams.get("docID");
    document.title = ID + " Course Page";
    console.log(ID)

    linkButtons(ID);
}

function linkButtons(docID) {
    let id = "?docID=" + docID;
    $("#btn-assignments").attr("href", "assignments.html" + id);
    $("#btn-contactInfo").attr("href", "contact.html" + id);
    $("#breadcrumb-courseCode").text(docID);
}



function setup() {
    authenticateUser();
}

$(document).ready(setup());