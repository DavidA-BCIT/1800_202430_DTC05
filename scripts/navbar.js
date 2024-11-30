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


// JavaScript to toggle menu visibility
        const menuButton = document.getElementById('menuButton');
        const menu = document.getElementById('menu');

        menuButton.addEventListener('click', () => {
            // Toggle the display of the menu
            menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
        });

        // Optional: Close menu if clicked outside
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !menuButton.contains(e.target)) {
                menu.style.display = 'none';
            }
        });

        result_html<`div`>
        // JavaScript to toggle menu visibility
        document.getElementById('menuButton').addEventListener('click', () => {
            const menu = document.getElementById('menu');
    // Toggle the display of the menu
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        });

        // Optional: Close the menu if clicked outside
        document.addEventListener('click', (e) => {
            const menu = document.getElementById('menu');
    const menuButton = document.getElementById('menuButton');
    if (!menu.contains(e.target) && !menuButton.contains(e.target)) {
        menu.style.display = 'none';
            }
        });
