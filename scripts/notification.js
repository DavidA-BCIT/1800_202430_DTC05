function readQuote(day) {
    console.log("Attempting to read quote for day:", day);
    db.collection("quotes").doc(day)
        .onSnapshot(dayDoc => {
            if (dayDoc.exists) { 
                const data = dayDoc.data();
                console.log("Document data for", day, ":", data);
                if (data && data.quotes) {  
                    document.getElementById("quote-goes-here").innerHTML = data.quotes;
                } else {
                    console.log(`No Quotes field found in the document for ${day}.`);
                    document.getElementById("quote-goes-here").innerHTML = "No quote available for today.";
                }
            } else {
                console.log(`No document found for the day: ${day}.`);
                document.getElementById("quote-goes-here").innerHTML = "No quote available for today.";
            }
        }, (error) => {
            console.log("Error calling onSnapshot", error);
        });
}

// Get the current day of the week as a string (e.g., "Sunday", "Monday", etc.)
function getCurrentDay() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    return days[today.getDay()];
}

// Call readQuote with the current day
const todayDay = getCurrentDay();
console.log("Today is:", todayDay);
readQuote(todayDay)
    db.collection("quotes").doc(day)                                                         //name of the collection and documents should matach excatly with what you have in Firestore
        .onSnapshot(dayDoc => {                                                              //arrow notation
            console.log("current document data: "+ dayDoc.data());                          //.data() returns data object
            document.getElementById("quote-goes-here").innerHTML = dayDoc.data().quotes;      //using javascript to display the data on the right place

            //Here are other ways to access key-value data fields
            //$('#quote-goes-here').text(dayDoc.data().quote);         //using jquery object dot notation
            //$("#quote-goes-here").text(dayDoc.data()["quote"]);      //using json object indexing
            //document.querySelector("#quote-goes-here").innerHTML = dayDoc.data().quote;

        }, (error) => {
            console.log ("Error calling onSnapshot", error);
        });
    
    readQuote("tuesday");  
