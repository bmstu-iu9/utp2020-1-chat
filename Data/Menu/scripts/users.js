'use strict'

let names = [
    "Nick",
    "Max",
    "Kane",
    "Eugene",
    "Michael",
]

function findUser() {

}

function addUser() {
    let usersList = document.getElementById("users-list");

    let user = document.createElement("div");
    user.className = "user";

    let name = document.createElement("p");
    name.className = "name";
    name.innerText = generateName();

    let avatar = document.createElement("div");
    avatar.className = "avatar";

    let img = document.createElement("img");
    img.className = "image";
    img.src = generateAvatar();

    avatar.appendChild(img);
    user.appendChild(avatar);
    user.appendChild(name);
    usersList.appendChild(user);
}

function generateAvatar() {
    return "./media/avatars/male/" + Math.floor(Math.random()*30) + ".png";
}

function generateName() {
    return names[Math.floor(Math.random()*names.length)];
}