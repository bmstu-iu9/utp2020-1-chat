'use strict'

function about() {
    document.getElementById("about-modal").style.display = "block";
}

function settings() {
    document.getElementById("settings-modal").style.display = "block";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

function logout() {
    window.location.href = "/menu/logout";
}