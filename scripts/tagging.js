const tags = ["Quiz", "Lab"];

const cardDataTemplate = {
    title: "template",
    course: "debug",
    assignDate: "1970-01-01",
    dueDate: "1970-01-01",
    cardTags: [],
    customOrder: -1
}

function createCardData(_title, _course, _assignDate, _dueDate, _tags) {
    let newCard = { ...cardDataTemplate };
    newCard.title = _title;
    newCard.course = _course;
    newCard.assignDate = _assignDate;
    newCard.dueDate = _dueDate;
    newCard.cardTags = _tags;
    return newCard;
}

function createCardFromData(data) {
    let newCard_html = $("#card-template").html();
    const container = $("#card-container");
    const newCard_elem = $(newCard_html);

    newCard_elem.data("cardData", data);
    newCard_elem.find(".card-assignment-title").text(data.title);
    newCard_elem.find(".card-course-title").text(data.course);
    newCard_elem.find(".card-assign-date").text(data.assignDate);
    newCard_elem.find(".card-due-date").text(data.dueDate);
    newCard_elem.find(".card-id").text(data.id);
    tags.forEach(function (tag) {
        let tag_entry = `<li><button class="tag-item dropdown-item `;
        if (data.cardTags.includes(tag)) { tag_entry += `fw-semibold bg-greyed-out`; console.log("cringe") };
        tag_entry += `">` + tag + `</button></li>`;
        newCard_elem.find(".dynamic-tags").prepend(tag_entry)
    })
    console.log(newCard_elem);
    container.append(newCard_elem);
}

function createExamples() {
    createCardFromData(createCardData("Assignment 1", "COMP-1800", "2024-09-23", "2024-09-30", ['Assignment']));
    createCardFromData(createCardData("Lab 2", "COMP-1537", "2024-10-09", "2024-10-16", ['Lab']));
    createCardFromData(createCardData("Quiz 3", "COMP-1510", "2024-11-30", "2024-11-30", ['Quiz']));
    createCardFromData(createCardData("Term Project", "COMP-1712", "2024-10-20", "2024-12-02", ['Project']));
    createCardFromData(createCardData("Demo 1", "COMP-1800", "2024-09-20", "2024-10-01", ['Demo']));
}

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

function update_tags() {
    $(".dynamic-tags").each(function () {
        const tag_list = $(this);
        tag_list.empty();
        tags.forEach(function (tag) {
            let tag_entry = `<li><button class="tag-item dropdown-item `;
            if (tag_list.closest(".card").data("cardData").cardTags.includes(tag)) tag_entry += `fw-semibold bg-greyed-out`;
            tag_entry += `">` + tag + `</button></li>`;
            tag_list.prepend(tag_entry);
        })
    });
    console.log("updated");
}

function prompt_new_tag() {
    //console.log("called");
    let user_tag = window.prompt("Enter new tag:", "");
    let valid = validate_tag(user_tag);
    if (valid == 0) {
        tags.push(user_tag);
        update_tags();
    }
    else if (valid == 1) { window.alert("No tag entered!"); }
    else if (valid == 3) { window.alert("Tag already exists!") }
}

function setup() {
    createExamples();

    $("body").on("click", ".new-tag", function (e) {
        prompt_new_tag();
    })
    $("body").on("click", ".tag-item", function () {
        let info = { tag: $(this).text(), object: $(this).closest(".card") };
        if (info.object.data("cardData").cardTags.includes(info.tag)) {
            let i = info.object.data("cardData").cardTags.indexOf(info.tag);
            info.object.data("cardData").cardTags.splice(i);
        }
        else {
            info.object.data("cardData").cardTags.push(info.tag);
        }
        update_tags();
        console.log(info.object.data("cardData").cardTags)
    })
    console.log('setup');
}
$(document).ready(setup);
