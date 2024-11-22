var currentUser;

function authenticateUser() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
        }
        else {
            console.log("Not logged in!");
            window.location.replace("login.html")
        }
    })
}

function makeBreadcrumb() {
    let params = new URL(window.location.href);
    let ID = params.searchParams.get("docID");
    $("#breadcrumb-courseCode").text(ID);
    $("#breadcrumb-courseCode").attr("href", "course.html?docID=" + ID);
}

function tryAddCourse(form) {

}

function hideDynamicUI() {
    // $("#message-noAssignments").hide();
}

function setup() {
    hideDynamicUI();
    authenticateUser();
    makeBreadcrumb();
    $('#addAssignmentForm').load('./text/add_assignment.html', function () {
        console.log("loaded!")
    })
}

$(document).ready(setup());