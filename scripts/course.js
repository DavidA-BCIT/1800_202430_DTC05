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

function loadWelcomeBanner() {
    // Fetch the welcome banner template and insert it into the page
    fetch('welcomeBanner.html')
        .then(response => response.text())
        .then(data => {
            // Insert the banner at the top of the body
            document.body.insertAdjacentHTML('afterbegin', data);
        })
        .catch(error => console.error('Error loading the welcome banner:', error));
}

// Call the function once the DOM is ready
document.addEventListener("DOMContentLoaded", loadWelcomeBanner);


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