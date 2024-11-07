const tags = ["Quiz", "Lab"];
const cards = [];
var $contextMenu = $("#contextMenu");

function openTags(event) {
    let tagList = "";
    tags.forEach(function (item) {
        tagList += `<button class="dropdown-item" type="button">` + item + `</button>`;
    });
    tagList += `<div class="dropdown-divider"></div> <button onClick="prompt_new_tag()" class="dropdown-item" type="button">Create new</button>`
    $("#contextMenu")
        .empty()
        .append(tagList)
        .css({
            position: "absolute",
            left: event.pageX,
            top: event.pageY
        })
        .show()
        .trigger("focusin");
    return;
}

function validate_tag(tag) {
    if (tag == "") return 1;
    if (tag == null) return 2;
    for (let i = 0; i < tags.length; ++i) {
        if (tag.toLowerCase() == tags[i].toLowerCase()) return 3;
    }
    return 0;
}

function prompt_new_tag() {
    console.log("called");
    let user_tag = window.prompt("Enter new tag:", "");
    let valid = validate_tag(user_tag);
    if (valid == 0) {
        tags.push(user_tag);
        console.log("new tag:" + user_tag);
    }
    else if (valid == 1) { window.alert("No tag entered!"); }
    else if (valid == 3) { window.alert("Tag already exists!") }
}

function new_tag() {
    user_tag = $("#tag_input").val().toLowerCase();
    if (user_tag != "" && !tags.includes(user_tag)) {
        tags.push(user_tag);
        console.log("new tag:" + user_tag);
        $("#tag_input").val("");
    }
}
function setup() {
    $(window).on("click", function (e) {
        $("#contextMenu").hide();
    })
    $(".tag-list").on("click", function (e) {
        openTags(e);
        e.stopPropagation();
    })
    console.log('setup');
}
$(document).ready(setup);
