const tags = ["quiz", "lab"];
const cards = [];
var $contextMenu = $("#contextMenu");

function openTags(event) {
    let tagList = "";
    tags.forEach(function(item) {
        tagList += `<button class="dropdown-item" type="button">` + item + `</button>`;
    });
    tagList += `<div class="dropdown-divider"></div> <button class="dropdown-item" type="button">Create new</button>`
    $("#contextMenu")
        .empty()
        .append(tagList)
        .css({position: "absolute",
            left: event.pageX,
            top: event.pageY
        })
        .show()
        .trigger("focusin");
    return;
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
    $("#add_tag").click(new_tag)
    $(window).on("click", function(e) {
        $("#contextMenu").hide();
    })
    $(".tag-list").on("click", function(e) {
        openTags(e);
        e.stopPropagation();
    })    
    console.log('setup');
}
$(document).ready(setup);
