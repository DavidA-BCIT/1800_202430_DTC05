function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // If the "user" variable is not null, then someone is logged in
            // User is signed in.
            // Do something for the user here.
            console.log($('#navbarPlaceholder').load('./text/topmenu.html'));
            console.log($('#footerPlaceholder').load('./text/navbar.html'));
        } else {
            // No user is signed in.
            console.log($('#navbarPlaceholder').load('./text/topmenu.html'));
            console.log($('#footerPlaceholder').load('./text/navbar.html'));
        }
    });
}
loadSkeleton(); //invoke the function