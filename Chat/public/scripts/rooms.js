'use strict'

let colors = [
    "#FFC0CB",
    "#FFA07A",
    "#FFE4B5",
    "#FFDAB9",
    "#EEE8AA",
    "#F0E68C",
    "#E6E6FA",
    "#DEB887",
    "#FFDEAD",
    "#98FB98",
    "#20B2AA",
    "#AFEEEE",
    "#B0E0E6",
    "#A9A9A9",
]

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

function showAllRooms() {
    let roomsList = document.getElementById("rooms-list");
    let rooms = roomsList.getElementsByClassName("room");
    for (let i = 0; i < rooms.length; i++) {
        rooms[i].style.display = "";
    }
}

// function addRoom() {
//     let roomsList = document.getElementById("rooms-list");
//     let input = document.getElementById("AddRoom");
//     let chatroom = input.value;
//     input.value = "";
//
//     let room = document.createElement("div");
//     room.className = "room";
//
//     let roomImg = document.createElement("div");
//     roomImg.className = "room-image";
//     roomImg.style.background = generateColor();
//
//     let letter = document.createElement("p");
//     letter.className = "letter";
//     letter.innerText = chatroom[0].toUpperCase();
//
//     let roomName = document.createElement("p");
//     roomName.className = "room-name";
//     roomName.innerText = chatroom;
//
//     let lastMessage = document.createElement("p");
//     lastMessage.className = "last-message";
//     lastMessage.innerText = "Everybody: *love scheme*";
//
//     let time = document.createElement("p");
//     time.className = "time";
//     time.innerText = Math.floor(Math.random()*13 + 10) + ":" + Math.floor(Math.random()*49 + 10);
//
//     roomImg.appendChild(letter);
//     room.appendChild(roomImg);
//     room.appendChild(roomName);
//     room.appendChild(lastMessage);
//     room.appendChild(time);
//     roomsList.appendChild(room);
// }

function generateColor() {
    return colors[Math.floor(Math.random()*colors.length)];
}

function deleteRoomsList() {
    document.getElementById("ChatFinder").value = "";
    showAllRooms();
}

function deleteAddList() {
    document.getElementById("AddRoom").value = "";
}