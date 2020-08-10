'use strict'

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

function showAllUsers() {
    let usersList = document.getElementById("users-list");
    let users = usersList.getElementsByClassName("user");
    for (let i = 0; i < users.length; i++) {
        users[i].style.display = "";
    }
}

function generateAvatar() {
    return "/static/media/avatars/male/" + Math.floor(Math.random()*29 + 1) + ".png";
}

function deleteUsersList() {
    document.getElementById("user-finder").value = "";
    showAllUsers()
}