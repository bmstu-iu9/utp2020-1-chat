'use strict'

function popUp() {
    let button = document.getElementById("pop-up");
    if (button != null) {
        button.id = "active-pop-up";
        document.getElementById("about").id = "active-about";
        document.getElementById("settings").id = "active-settings";
		document.getElementById("leave").id = "active-leave";
        document.getElementById("logout").id = "active-logout";
    } else {
        document.getElementById("active-pop-up").id = "pop-up";
        document.getElementById("active-about").id = "about";
        document.getElementById("active-settings").id = "settings";
		document.getElementById("active-leave").id = "leave";
        document.getElementById("active-logout").id = "logout";
    }
}