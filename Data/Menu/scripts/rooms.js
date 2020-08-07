'use strict'

function findRoom() {
    let roomsList = document.getElementById("rooms-list");
    let input = document.getElementById("ChatFinder");
    let filter = input.value.toUpperCase();
    let rooms = roomsList.getElementsByClassName("room");
    for (let i = 0; i < rooms.length; i++) {
        let p = rooms[i].getElementsByClassName("room-name")[0];
        if (p.innerHTML.toUpperCase().indexOf(filter) > -1) {
            rooms[i].style.display = "";
        } else {
            rooms[i].style.display = "none";
        }
    }
}