var local_tags = []
const selected_tags = []

function initialize_tags() {
    db.collection("cards").doc("all_tags").get()
        .then(doc => {
            local_tags = doc.data().tags;
            console.log("1");
            update_tags();
        });
}

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
    local_tags.forEach(function (tag) {
        let tag_entry = `<li><button class="tag-item dropdown-item `;
        if (data.cardTags.includes(tag)) { tag_entry += `fw-semibold bg-greyed-out`; };
        tag_entry += `">` + tag + `</button></li>`;
        newCard_elem.find(".dynamic-tags").prepend(tag_entry)
    })
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
    local_tags.forEach(function (item) {
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
    for (let i = 0; i < local_tags.length; ++i) {
        if (tag.toLowerCase() == local_tags[i].toLowerCase()) return 3;
    }
    return 0;
}

function add_tag(user_tag) {
    local_tags.push(user_tag);
    db.collection("cards").doc("all_tags").set({ tags: local_tags })
    update_tags();
}

function delete_tag() {
    let user_tag = window.prompt("Enter the tag you want to delete:", "");
    let valid = validate_tag(user_tag);
    if (valid == 0) { window.alert("No such tag exists!"); }
    else if (valid == 1) { window.alert("No tag entered!"); }
    else if (valid == 3) {
        let i = local_tags.indexOf(user_tag);
        local_tags.splice(i);
        db.collection("cards").doc("all_tags").set({ tags: local_tags });
        $(".dynamic-tags").each(function () {
            const tag_list = $(this);
            if (tag_list.closest(".card").data("cardData").cardTags.includes(user_tag)) {
                let j = tag_list.closest(".card").data("cardData").cardTags.indexOf(user_tag);
                tag_list.closest(".card").data("cardData").cardTags.splice(j);
            }
        });
        update_tags();
    }
}

function unhide_tags() {
    const container = $("#card-container");
    container.children().each(function () {
        let card = $(this);
        card.show();
    })
}

function hide_tags() {
    const container = $("#card-container");
    container.children().each(function () {
        let card = $(this);
        card_tags = card.data("cardData").cardTags;
        for (let i = 0; i < card_tags.length; i++) {
            if (selected_tags.includes(card_tags[i])) {
                card.hide();
                break;
            }
        }
    })
}

function show_only_tags() {
    if (selected_tags.length == 0) return;
    const container = $("#card-container");
    container.children().each(function () {
        let card = $(this);
        card_tags = card.data("cardData").cardTags;
        show = false;
        for (let i = 0; i < card_tags.length; i++) {
            if (selected_tags.includes(card_tags[i])) {
                show = true;
                break;
            }
        }
        if (!show) { card.hide() }
    })
}

function unselect_tag(tag) {
    if (selected_tags.includes(tag)) {
        let i = selected_tags.indexOf(tag);
        selected_tags.splice(i);
    }
}

function select_tag(tag) {
    if (validate_tag(tag) == 3) {
        selected_tags.push(tag);
    }
}

function clear_selected_tags() {
    selected_tags.length = 0;
}

function populate_tag_selector() {
    const tags_controls = $("#tag-select-container");
    tags_controls.empty();

    console.log(tags_controls)
    for (let i = 0; i < local_tags.length; i++) {
        console.log(local_tags[i]);
        let tag_html = $("#tag-select-template").html();
        const tag_elem = $(tag_html);
        tag_elem.find(".tag-text").text(local_tags[i]);
        tag_elem.data("tag", local_tags[i]);
        tags_controls.append(tag_elem);
    }
}

function update_tags() {
    $(".dynamic-tags").each(function () {
        const tag_list = $(this);
        tag_list.empty();
        local_tags.forEach(function (tag) {
            let tag_entry = `<li><button class="tag-item dropdown-item `;
            if (tag_list.closest(".card").data("cardData").cardTags.includes(tag)) tag_entry += `fw-semibold bg-greyed-out`;
            tag_entry += `">` + tag + `</button></li>`;
            tag_list.prepend(tag_entry);
        })
    });
    populate_tag_selector()
}

function prompt_new_tag() {
    let user_tag = window.prompt("Enter new tag:", "");
    let valid = validate_tag(user_tag);
    if (valid == 0) {
        add_tag(user_tag);
    }
    else if (valid == 1) { window.alert("No tag entered!"); }
    else if (valid == 3) { window.alert("Tag already exists!") }
}

function setup() {
    createExamples();
    initialize_tags();

    $("body").on("click", ".new-tag", function (e) {
        prompt_new_tag();
    })
    $("body").on("click", ".delete-tag", function () {
        delete_tag();
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
    })
    $("body").on("click", ".tag-clear", function () {
        unhide_tags();
    })
    $("body").on("click", ".tag-hide", function () {
        unhide_tags();
        hide_tags();
    })
    $("body").on("click", ".tag-show-only", function () {
        unhide_tags();
        show_only_tags();
    })
    $("body").on("change", ".tag-checkbox", function () {
        console.log("test!")
        const checkbox = $(this);
        if (this.checked) {
            select_tag(checkbox.closest(".tag-select").data("tag"));
        }
        else {
            unselect_tag(checkbox.closest(".tag-select").data("tag"));
        }
    })
    console.log('setup');
}
$(document).ready(setup);
