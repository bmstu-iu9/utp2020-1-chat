{
    let users = document.getElementById("users-list");
    let user = users.getElementsByClassName("user");
    for (let i = 0; i < user.length; i++) {
        let avatar = document.createElement("div");
        avatar.className = "avatar";
        let img = document.createElement("img");
        img.className = "image";
        img.src = generateAvatar();
        avatar.appendChild(img);
        user[i].appendChild(avatar);
    }
}