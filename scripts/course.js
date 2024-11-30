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