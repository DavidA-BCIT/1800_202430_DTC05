var course;

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