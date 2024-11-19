var currentUser;
var course;

function authenticateUser() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            getCourseInfo();
        }
        else {
            console.log("Not logged in!");
        }
    })
}

function getCourseInfo() {
    let params = new URL(window.location.href);
    let ID = params.searchParams.get("docID");
    document.title = ID + " Contact Info";

    currentUser.collection("courses").doc(ID).get()
        .then(courseDoc => {
            course = courseDoc;
            populateContactInfo();
        })
}

function populateContactInfo() {
    let name = course.data().contact_name;
    let email = course.data().contact_email;
    let phone = course.data().contact_phone;

    if (name != null) {
        $("#nameInput").val(name);
    }
    if (email != null) {
        $("#emailInput").val(email);
    }
    if (phone != null) {
        $("#phoneInput").val(phone);
    }
}

function setContactInfo() {
    let params = new URL(window.location.href);
    let ID = params.searchParams.get("docID");

    currentUser.collection("courses").doc(ID).update({
        contact_name: $("#nameInput").val(),
        contact_email: $("#emailInput").val(),
        contact_phone: $("#phoneInput").val()
    })
}

function setup() {
    authenticateUser();
    $("#btn-edit").on("click", function () {
        $("#contactInfoFields").prop("disabled", false)
    })
    $("#btn-save").on("click", function () {
        $("#contactInfoFields").prop("disabled", true)
        setContactInfo();
    })
}

$(document).ready(setup());