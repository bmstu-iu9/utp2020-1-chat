{
    let rooms = document.getElementById("rooms-list");
    let room = rooms.getElementsByClassName("room");
    for (let i = 0; i < room.length; i++) {
        let name = room[i].getElementsByClassName("room-name")[0];

        let roomImg = document.createElement("div");
        roomImg.className = "room-image";
        roomImg.style.background = generateColor();

        let letter = document.createElement("p");
        letter.className = "letter";
        letter.innerText = name[0].toUpperCase();

        let time = document.createElement("p");
        time.className = "time";
        time.innerText = Math.floor(Math.random()*13 + 10) + ":" + Math.floor(Math.random()*49 + 10);

        roomImg.appendChild(letter);
        room[i].appendChild(roomImg);
        room[i].appendChild(time);
    }
}