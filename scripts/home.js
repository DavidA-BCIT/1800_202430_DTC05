

function insertNameFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the user name
                let userName = userDoc.data().name;
                console.log(userName);
                //$("#name-goes-here").text(userName); // jQuery
                document.getElementById("name-goes-here").innerText = userName;
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
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
        var title = doc.data().name;
        var details = doc.data().details;
        var crn = doc.data().crn;
        var location = doc.data().location

        let newcard = cardTemplate.contentEditable.cloneNode(true);

        newcard.querySelector('.card-title').innerHTML = title;
        newcard.querySelector('.card-text').innerHTML = details;
        newcard.querySelector('cart-text')
    })
}