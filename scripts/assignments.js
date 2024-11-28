var currentUser;
var currentCourse;

function authenticateUser() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            populateCards();
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
    populateCards();
    $("#close-modal").click();
}

function populateCards() {
    let params = new URL(window.location.href);
    let ID = params.searchParams.get("docID");

    const noAssignmentMessage = $("#message-noAssignments");
    noAssignmentMessage.hide()

    courses = currentUser.collection("courses").doc(ID);
    courses.collection("assignments").get()
        .then(allCourses => {
            if (allCourses && !allCourses.empty) {
                const courseList = $("#assignmentList");
                courseList.empty();
                const courseTemplate = $("#assignmentListingTemplate");
                allCourses.forEach(course => {
                    const courseName = course.data().title;
                    console.log(courseName)
                    const courseSubject = course.data().link;
                    const courseNumber = course.data().dueDate;

                    let newCard_html = courseTemplate.html();
                    const newCard = $(newCard_html);
                    newCard.find(".assignmentName").text(courseName);
                    newCard.find(".assignmentLink").text(courseSubject);
                    newCard.find(".assignmentDueDate").text(courseNumber);

                    
                    courseList.append(newCard);
                })
            }
            else {
                console.log("no courses to show")
                noAssignmentMessage.show();
            }
        })
}

function hideDynamicUI() {
    $("#message-noAssignments").hide();
}

function clearAddAssignmentForm(form) {
    form.find(".form-control").each(function (index) {
        $(this).val("")
    })
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
        $("#modal-addAssignment").on("hidden.bs.modal", function () {
            clearAddAssignmentForm($(this));
        })
    })
}

$(document).ready(setup());