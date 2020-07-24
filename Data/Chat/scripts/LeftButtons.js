//Кноки
//Часть на будущую реализацию, основная "chat"
const Chat = document.getElementById("chats");
const Photos = document.getElementById("photos");
const Videos = document.getElementById("videos");
const Music = document.getElementById("music");
const About = document.getElementById("about");
const Settings = document.getElementById("settings");
const selector = document.getElementById("user_select");
const Help = document.getElementById("help");

//Формы для кнопки "Chat"
const create = document.getElementById("create_room");
const send = document.getElementById("send_message");

create.style.display = "none";
send.style.display = "none";

//В каждой функции нужно добавить контент, который будет отображаться
Chat.addEventListener("click", function () {
    selector.textContent = "Chats";
    create.style.display = "";
    send.style.display = "";
})

Photos.addEventListener("click", function () {
    create.style.display = "none";
    send.style.display = "none";
    selector.textContent = "Photos";
})

Videos.addEventListener("click", function () {
    create.style.display = "none";
    send.style.display = "none";
    selector.textContent = "Videos";
})

Music.addEventListener("click", function () {
    create.style.display = "none";
    send.style.display = "none";
    selector.textContent = "Music";
})

About.addEventListener("click", function () {
    create.style.display = "none";
    send.style.display = "none";
    selector.textContent = "About";
})

Settings.addEventListener("click", function () {
    create.style.display = "none";
    send.style.display = "none";
    selector.textContent = "Settings";
})

Settings.addEventListener("click", function () {
    create.style.display = "none";
    send.style.display = "none";
    selector.textContent = "Settings";
})

Help.addEventListener("click", function () {
    create.style.display = "none";
    send.style.display = "none";
    selector.textContent = "Help";
})
