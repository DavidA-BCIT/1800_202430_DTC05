var currentUser;
var currentCourse;

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

function tryAddAssignment(form) {
    const newAssignment_title = $("#newAssignment-title").val();
    const newAssignment_link = $("#newAssignment-link").val();
    const newAssignment_dueDate = $("#newAssignment-dueDate").val();

    let params = new URL(window.location.href);
    let ID = params.searchParams.get("docID");

    test = currentUser.collection("courses").doc(ID);
    test.collection("assignments").doc(newAssignment_title).set({
        title: newAssignment_title,
        link: newAssignment_link,
        dueDate: newAssignment_dueDate
    })
}

function hideDynamicUI() {
    // $("#message-noAssignments").hide();
}

function setup() {
    hideDynamicUI();
    authenticateUser();
    makeBreadcrumb();
    $('#addAssignmentForm').load('./text/add_assignment.html', function () {
        $("#submit-newAssignment").on("click", function () {
            const form = $(this).closest("#add-course-modal")
            tryAddAssignment(form);
        })
    })
}

$(document).ready(setup());