let currentUser;

function globalSetup() {
    // Show settings modal when the settings button is clicked
    $("#settings-btn").on("click", function () {
        $("#settings-modal").modal("show");
    });

    // Save settings and apply changes
    $("#save-settings").on("click", function () {
        const selectedTheme = $("#theme").val();
        const selectedLayout = $("#layout").val();

        // Save user preferences to Firestore
        currentUser.update({
            settings: {
                theme: selectedTheme,
                layout: selectedLayout
            }
        }).then(() => {
            console.log("Settings saved successfully");
            applyUserSettings(selectedTheme, selectedLayout);
            $("#settings-modal").modal("hide");
        }).catch(error => {
            console.error("Error saving settings:", error);
        });
    });
}

// Define setting function
function applyUserSettings(theme, layout) {
    // Apply theme
    if (theme === "dark") {
        $("body").addClass("dark-theme").removeClass("light-theme");
    } else {
        $("body").addClass("light-theme").removeClass("dark-theme");
    }

    // Apply layout
    const courseList = $("#courseList");
    if (layout === "list") {
        courseList.addClass("list-layout").removeClass("grid-layout");
    } else {
        courseList.addClass("grid-layout").removeClass("list-layout");
    }
}

function authenticateUser() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid); //global
            console.log("Logged in as uid: " + user.uid)
            
            globalSetup(); // Initialize global settings

            $("#add-course-btn").show();
            populateCards();

            // Fetch and apply settings
            currentUser.get().then(doc => {
                if (doc.exists) {
                    const userData = doc.data();
                    const settings = userData.settings || {};
                    const theme = settings.theme || "light"; // Default theme
                    const layout = settings.layout || "grid"; // Default layout
                    applyUserSettings(theme, layout);
                }
            });
            return true;
        }
        else {
            console.log("Not logged in")
            $("#not-logged-in").show();
            return false;
        }
    });
}
$(document).ready(() => {authenticateUser()})


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

function populateCards() {
    const noCourseMessage = $("#message-NoCourses");
    noCourseMessage.hide()
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
                    newCard.find(".courseCode").text(courseSubject + " " + courseNumber);
                    newCard.find(".courseCRN").text(courseCRN);

                    const docID = courseSubject + courseNumber;
                    newCard.find(".stretched-link").attr("href", "course.html?docID=" + docID);
                    courseList.append(newCard);
                })
            }
            else {
                console.log("no courses to show")
                noCourseMessage.show();
            }
        })
}
$(document).ready(() => {populateCards()})

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
    // Show settings modal
    $("#settings-btn").on("click", function () {
        $("#settings-modal").modal("show");
    });

    // Save settings and apply changes
    $("#save-settings").on("click", function () {
        const selectedTheme = $("#theme").val();
        const selectedLayout = $("#layout").val();

        // Save user preferences to Firestore
        currentUser.update({
            settings: {
                theme: selectedTheme,
                layout: selectedLayout
            }
        }).then(() => {
            console.log("Settings saved successfully");
            applyUserSettings(selectedTheme, selectedLayout);
            $("#settings-modal").modal("hide");
        }).catch(error => {
            console.error("Error saving settings:", error);
        });
    });
    authenticateUser();
}

$(document).ready(setup())