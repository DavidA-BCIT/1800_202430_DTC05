var currentUser;

function authenticateUser() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid); //global
            console.log("Logged in as uid: " + user.uid)
            $("#add-course-btn").show();
            populateCards();
            return true;
        }
        else {
            console.log("Not logged in")
            $("#not-logged-in").show();
            return false;
        }
    });
}

function hideDynamicElements() {
    $("#not-logged-in").hide();
    $("#add-course-btn").hide();
    $("#message-NoCourses").hide();
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

function populateCards() {
    const noCourseMessage = $("message-NoCourses");
    noCourseMessage.hide()
    currentUser.collection("courses").get()
        .then(allCourses => {
            if (allCourses) {
                const courseTemplate = $("#courseListingTemplate");
                const courseList = $("#courseList");

                allCourses.forEach(course => {
                    const courseName = course.data().name;
                    const courseSubject = course.data().subject;
                    const courseNumber = course.data().number;
                    const courseCRN = course.data().crn;

                    let newCard_html = courseTemplate.html();
                    const newCard = $(newCard_html);
                    newCard.find(".courseName").text(courseName);
                    newCard.find(".courseCode").text(courseSubject + " " + courseNumber);
                    newCard.find(".courseCRN").text(courseCRN);

                    courseList.append(newCard);
                })
            }
            else {
                noCourseMessage.show();
            }
        })
}

function setup() {
    hideDynamicElements();
    $('#addCourseForm').load('./text/add_course.html', function () {
        $("#submit-new-course").on("click", function () {
            const form = $(this).closest("#add-course-modal")
            tryAddCourse(form);
        })
    });
    authenticateUser();
}

$(document).ready(setup())