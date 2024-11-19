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
    getCourseInfo();
}

$(document).ready(setup());