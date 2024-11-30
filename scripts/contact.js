var course;
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
            currentUser = db.collection("users").doc(user.uid); // global
            console.log("Logged in as uid: " + user.uid);

            globalSetup(); // Initialize global settings

            currentUser.get().then(doc => {
                if (doc.exists) {
                    const userData = doc.data();
                    const settings = userData.settings || {};
                    const theme = settings.theme || "light";
                    const layout = settings.layout || "grid";
                    applyUserSettings(theme, layout);
                }
            });
        } else {
            console.log("Not logged in");
        }
    });
}

$(document).ready(() => {
    authenticateUser();
});


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
    $("#confirmPopup").toast("show");
}

async function setClipboard(text) {
    const type = "text/plain";
    const blob = new Blob([text], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    await navigator.clipboard.write(data);
}

function makeBreadcrumb() {
    let params = new URL(window.location.href);
    let ID = params.searchParams.get("docID");
    $("#breadcrumb-courseCode").text(ID);
    $("#breadcrumb-courseCode").attr("href", "course.html?docID=" + ID);
}

function setup() {
    authenticateUser();
    makeBreadcrumb();
    $("#btn-save").on("click", function () {
        setContactInfo();
    })
    $(".btn-clipboard").on("click", function () {
        setClipboard("test");
    })
}

$(document).ready(setup());