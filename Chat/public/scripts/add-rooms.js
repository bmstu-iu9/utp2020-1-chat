{
    let rooms = document.getElementById("rooms-list");
    let as = rooms.getElementsByTagName("a");
    for (let i = 0; i < as.length; i++) {
        let room = as[i].getElementsByClassName("room")[0];
        let name = room.getElementsByClassName("room-name")[0].innerText;
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
        room.appendChild(roomImg);
        room.appendChild(time);
    }
}