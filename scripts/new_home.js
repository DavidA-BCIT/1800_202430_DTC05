var currentUser;

function authenticateUser() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid); //global
            console.log("Logged in as uid: " + user.uid)
            $("#not-logged-in").hide();
            return true;
        }
        else {
            console.log("Not logged in")
            $("#add-course-btn").hide();
            return false;
        }
    });
}

function tryAddCourse(form) {
    const newCourse_subject = $("#newCourse-subject").val();
    const newCourse_number = $("#newCourse-number").val();
    const newCourse_name = $("#newCourse-title").val();
    const newCourse_crn = $("#newCourse-crn").val();

    currentUser.collection("courses").doc(newCourse_subject + newCourse_number).set({
        subject: newCourse_subject,
        number: newCourse_number,
        name: newCourse_name,
        crn: newCourse_crn
    })
}

function setup() {
    $('#addCourseForm').load('./text/add_course.html', function () {
        $("#submit-new-course").on("click", function () {
            const form = $(this).closest("#add-course-modal")
            tryAddCourse(form);
        })
    });
    authenticateUser();

}

$(document).ready(setup())