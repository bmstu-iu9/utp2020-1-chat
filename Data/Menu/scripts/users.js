'use strict'

let names = [
    "Nick",
    "Max",
    "Kane",
    "Eugene",
    "Michael",
]

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

function findUser() {

}

function addUser() {
    let usersList = document.getElementById("users-list");

    let user = document.createElement("div");
    user.className = "user";

    let avatar = document.createElement("div");
    avatar.className = "avatar";

    let img = document.createElement("img");
    img.className = "image";
    img.src = generateAvatar();

    let name = document.createElement("p");
    name.className = "name";
    name.innerText = generateName();

    let letter = generateLetter(name.innerText);

    if (Math.random() > 0.5) {
        avatar.appendChild(img);
    } else {
        avatar.style.background = colors[Math.floor(Math.random()*colors.length)];
        avatar.appendChild(letter);
    }
    user.appendChild(avatar);
    user.appendChild(name);
    usersList.appendChild(user);
}

function generateAvatar() {
    return "./media/avatars/male/" + Math.floor(Math.random()*29 + 1) + ".png";
}

function generateName() {
    return names[Math.floor(Math.random()*names.length)];
}

function generateLetter(name) {
    let letter = document.createElement("p");
    letter.className = "letter";
    letter.innerText = name[0];
    return letter;
}