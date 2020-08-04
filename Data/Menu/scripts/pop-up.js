'use strict'

function popUp() {
    let button = document.getElementById("pop-up");
    if (button != null) {
        button.id = "active-pop-up";
        document.getElementById("about").id = "active-about";
        document.getElementById("settings").id = "active-settings";
        document.getElementById("logout").id = "active-logout";
    } else {
        button = document.getElementById("active-pop-up");
        button.id = "pop-up";
        document.getElementById("active-about").id = "about";
        document.getElementById("active-settings").id = "settings";
        document.getElementById("active-logout").id = "logout";
    }
}