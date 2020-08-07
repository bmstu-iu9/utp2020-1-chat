'use strict'

let names = [
    "Nick",
    "Max",
    "Kane",
    "Eugene",
    "Michael",
]

function findUser() {
    let usersList = document.getElementById("users-list");
    let input = document.getElementById("user-finder");
    let filter = input.value.toUpperCase();
    let users = usersList.getElementsByClassName("user");
    for (let i = 0; i < users.length; i++) {
        let p = users[i].getElementsByClassName("name")[0];
        if (p.innerHTML.toUpperCase().indexOf(filter) > -1) {
            users[i].style.display = "";
        } else {
            users[i].style.display = "none";
        }
    }
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

    avatar.appendChild(img);
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