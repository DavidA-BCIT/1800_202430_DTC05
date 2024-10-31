const cardData = [];

const cardDataTemplate = {
    title: "template",
    course: "debug",
    assignDate: "1970-01-01",
    dueDate: "1970-01-01",
    customOrder: -1
}

function createCardData(_title, _course, _assignDate, _dueDate) {
    let newCard = { ...cardDataTemplate };
    newCard.title = _title;
    newCard.course = _course;
    newCard.assignDate = _assignDate;
    newCard.dueDate = _dueDate;
    return newCard;
}

function addCard(cardDataObject) {
    cardData.push(cardDataObject);
}

function createExamples() {
    addCard(createCardData("Assignment 1", "COMP-1800", "2024-09-23", "2024-09-30"));
    addCard(createCardData("Lab 2", "COMP-1537", "2024-10-09", "2024-10-16"));
    addCard(createCardData("Quiz 3", "COMP-1510", "2024-11-30", "2024-11-30"));
    addCard(createCardData("Term Project", "COMP-1712", "2024-10-20", "2024-12-02"));
    addCard(createCardData("Demo 1", "COMP-1800", "2024-09-20", "2024-10-01"));
}

function populateCards() {
    $("#card-container").empty();
    for (let i = 0; i < cardData.length; i++) {
        const cardTemplate = document.getElementById("card-template");
        var newCard = `<div class="card m-2"><div class="card-body">`;
        newCard += `<h3 class="card-title fw-bold">` + cardData[i].title + `</h3>`;
        newCard += `<h6 class="course fw-normal">` + cardData[i].course + `</h6>`;
        newCard += `<hr>`
        newCard += `<p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. At magni et repellat
                                commodi
                                perspiciatis, consequuntur deserunt quo eveniet harum iste, vitae consectetur obcaecati nam rem
                                enim
                                vero. Quia, dolorem quaerat.
                        </p>`
        newCard += `<hr>`;
        newCard += `<p class="assign-date"><span class="fw-bold"> Assigned:</span> ` + cardData[i].assignDate + `</p>`;
        newCard += `<p class="assign-date"><span class="fw-bold"> Due:</span> ` + cardData[i].dueDate + `</p>`;
        newCard += `<a href="#" class="btn btn-primary btn-sm">Button</a>`;
        newCard += `</div > </div >`;
        $("#card-container").append(newCard);
    }
}

function sortBy(filter) {
    //var compareCards;
    console.log("test")
    switch (filter) {
        case "assignDate":
            cardData.sort((a, b) => a.assignDate > b.assignDate);
            break;
        case "dueDate":
            cardData.sort((a, b) => a.dueDate > b.dueDate);
            break;
        case "course":
            cardData.sort((a, b) => a.course > b.course);
            break;
        default:
            console.log("Sort by invalid filter: " + filter)
            return;
    }
    populateCards();
    console.log("sorted by " + filter);
    console.log(cardData);
}

function debug() {
    const cardTemplate = document.getElementById("card-template");
    let newCard = cardTemplate.content.cloneNode(true);
    $("#card-container").append(newCard);
    //console.log(newCard)
}


function setup() {
    // Bind events
    $("#sort-assignDate").on("click", function () { sortBy("assignDate") });
    $("#sort-dueDate").on("click", function () { sortBy("dueDate") });
    $("#sort-course").on("click", function () { sortBy("course") });

    // Populate page
    createExamples();
    populateCards();

}
$(document).ready(setup());