function getCourseInfo() {
    let params = new URL(window.location.href);
    let ID = params.searchParams.get("docID");
    document.title = ID + " Course Page";
    console.log(ID)

    linkButtons(ID);
}

function linkButtons(docId) {
    let url = "courses.html?docID=" + docId + "/";
    $("#btn-assignments").attr("href", url + "assignments");
    $("#btn-contactInfo").attr("href", url + "ContactInfo");
}
function setup() {
    getCourseInfo();
}

$(document).ready(setup());