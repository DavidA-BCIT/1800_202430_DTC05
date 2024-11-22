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


function makeBreadcrumb() {
    const breadcrumb = $("#breadcrumbContent");
    console.log(breadcrumb)
    let breadcrumb_html = `<li class="breadcrumb-item active" aria-current="page">Courses</li>`
    const new_breadcrumb = $(breadcrumb_html);

    breadcrumb.append(new_breadcrumb)
    console.log("breadcrumb baked")
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
    populateCards();
    $("#close-modal").click();
}

// function populateCards() {
//     const noCourseMessage = $("#message-NoCourses");
//     noCourseMessage.hide()
//     currentUser.collection("courses").get()
//         .then(allCourses => {
//             if (allCourses && !allCourses.empty) {
//                 const courseList = $("#courseList");
//                 courseList.empty();
//                 const courseTemplate = $("#courseListingTemplate");
//                 allCourses.forEach(course => {
//                     const courseName = course.data().name;
//                     const courseSubject = course.data().subject;
//                     const courseNumber = course.data().number;
//                     const courseCRN = course.data().crn;

//                     let newCard_html = courseTemplate.html();
//                     const newCard = $(newCard_html);
//                     newCard.find(".courseName").text(courseName);
//                     newCard.find(".courseCode").text(courseSubject + " " + courseNumber);
//                     newCard.find(".courseCRN").text(courseCRN);

//                     const docID = courseSubject + courseNumber;
//                     newCard.find(".stretched-link").attr("href", "course.html?docID=" + docID);
//                     courseList.append(newCard);
//                 })
//             }
//             else {
//                 console.log("no courses to show")
//                 noCourseMessage.show();
//             }
//         })
// }


function populateCards() {
    const noCourseMessage = $("#message-NoCourses");
    noCourseMessage.hide();
    currentUser.collection("courses").get()
        .then(allCourses => {
            if (allCourses && !allCourses.empty) {
                const courseList = $("#courseList");
                courseList.empty();
                const courseTemplate = $("#courseListingTemplate");
                allCourses.forEach(course => {
                    const courseName = course.data().name;
                    const courseSubject = course.data().subject;
                    const courseNumber = course.data().number;
                    const courseCRN = course.data().crn;

                    let newCard_html = courseTemplate.html();
                    const newCard = $(newCard_html);
                    newCard.find(".courseName").text(courseName);
                    newCard.find(".courseCode").text(`${courseSubject} ${courseNumber}`);
                    newCard.find(".courseCRN").text(courseCRN);

                    const docID = courseSubject + courseNumber;
                    newCard.find(".stretched-link").attr("href", `course.html?docID=${docID}`);

                    // Add Delete Button with updated style
                    const deleteButton = $(`<button class="btn-delete">Delete</button>`);
                    deleteButton.data("docID", docID); // Store the docID for the course
                    deleteButton.on("click", function () {
                        deleteCourse($(this).data("docID"));
                    });


                    newCard.append(deleteButton);
                    courseList.append(newCard);
                });
            } else {
                console.log("no courses to show");
                noCourseMessage.show();
            }
        });
}



function deleteCourse(docID) {
    if (confirm("Are you sure you want to delete this course?")) {
        currentUser.collection("courses").doc(docID).delete()
            .then(() => {
                console.log(`Course ${docID} deleted successfully.`);
                populateCards(); // Refresh the list of courses
            })
            .catch(error => {
                console.error("Error deleting course: ", error);
            });
    }
}


function clearAddCourseForm(form) {
    console.log("bp1");
    form.find(".form-control").each(function (index) {
        $(this).val("")
    })
}



function setup() {
    hideDynamicElements();
    $('#addCourseForm').load('./text/add_course.html', function () {
        $("#submit-new-course").on("click", function () {
            const form = $(this).closest("#add-course-modal")
            tryAddCourse(form);
        })
        $("#add-course-modal").on("hidden.bs.modal", function () {
            clearAddCourseForm($(this));
        })
    });
    $("#breadcrumbContent").on("ready", function () {
        console.log("cringe")
        makeBreadcrumb();
    })
    authenticateUser();
}

$(document).ready(setup())