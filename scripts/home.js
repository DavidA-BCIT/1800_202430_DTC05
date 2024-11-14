var currentUser;

function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid); //global
            console.log(currentUser);

            // figure out what day of the week it is today
            const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
            const d = new Date();
            let day = weekday[d.getDay()];

            // the following functions are always called when someone is logged in
            readQuote(day);
            insertNameFromFirestore();
            displayCardsDynamically("hikes");
        } else {
            // No user is signed in.
            console.log("No user is signed in");
            window.location.href = "login.html";
        }
    });
}
doAll();

function insertNameFromFirestore() {
    currentUser.get().then(userDoc => {
        //get the user name
        var user_Name = userDoc.data().name;
        console.log(user_Name);
        $("#name-goes-here").text(user_Name); //jquery
        // document.getElementByID("name-goes-here").innetText=user_Name;
    })
}

function readQuote(day) {
    db.collection("quotes").doc(day)                                                         //name of the collection and documents should matach excatly with what you have in Firestore
        .onSnapshot(dayDoc => {                                                              //arrow notation
            console.log("inside");
            console.log(dayDoc.date());
            // console.log("current document data: " + dayDoc.data());                          //.data() returns data object
            document.getElementById("quote-goes-here").innerHTML = dayDoc.data().quote;      //using javascript to display the data on the right place

            //Here are other ways to access key-value data fields
            //$('#quote-goes-here').text(dayDoc.data().quote);         //using jquery object dot notation
            //$("#quote-goes-here").text(dayDoc.data()["quote"]);      //using json object indexing
            //document.querySelector("#quote-goes-here").innerHTML = dayDoc.data().quote;

        }, (error) => {
            console.log("Error calling onSnapshot", error);
        });
}

function writeCourses() {
    var coursesRef = db.collection("courses");

    coursesRef.add({
        name: "Comp 1510",
        details: "Programming Methods.",
        crn: "CRN 44913",
        location:"Campuses: DTC & BBY",
        last_updates: firebase.firebase.FieldValue.serverTimestamp()
    })
    coursesRef.add({
        name: "Comp 1537",
        details: "Web Development.",
        crn: "CRN 46870",
        location: "Campuses: DTC & BBY",
        last_updates: firebase.firebase.FieldValue.serverTimestamp()
    })
    coursesRef.add({
        name: "Comp 1800",
        details: "Project 1.",
        crn: "CRN 46874",
        location: "Campuses: DTC & BBY",
        last_updates: firebase.firebase.FieldValue.serverTimestamp()
    })
    coursesRef.add({
        name: "Comp 1712",
        details: "Business Analysis and System Design.",
        crn: "CRN 45300",
        location: "Campuses: DTC & BBY",
        last_updates: firebase.firebase.FieldValue.serverTimestamp()
    })
    coursesRef.add({
        name: "Comp 1100",
        details: "CST Program Fundamentals.",
        crn: "CRN 44910",
        location: "Campuses: DTC & BBY",
        last_updates: firebase.firebase.FieldValue.serverTimestamp()
    })
    
}

function displayCardsDynamically(collection){
    let cardTemplate = document.getElementById("coursesCardTemplate");

    db.collection(collection).get()
    .then(allCourses =>{
        allCourses.forEach(doc =>{
            var title = doc.data().name;
            var details = doc.data().details;
            var crn = doc.data().crn;
            var location = doc.data().location

            let newcard = cardTemplate.contentEditable.cloneNode(true);

            var docID = doc.id

            newcard.querySelector('.card-title').innerHTML = title;
            newcard.querySelector('.card-text').innerHTML = details;
            newcard.querySelector('cart-text').innerHTML = crn;
            newcard.querySelector('cart-text').innerHTML = location;

            document.getElementById(collection + "-go-here").appendChild(newcard);
        })
    })
}
displayCardsDynamically("courses")