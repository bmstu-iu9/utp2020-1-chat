{
    let users = document.getElementById("users-list");
    let user = users.getElementsByClassName("user");
    for (let i = 0; i < user.length; i++) {
        let route = user[i].getElementsByClassName("route")[0];
        let avatar = document.createElement("div");
        avatar.className = "avatar";
        let img = document.createElement("img");
        img.className = "image";
        img.src = route.innerText;
        avatar.appendChild(img);
        user[i].appendChild(avatar);
        user[i].removeChild(route);
    }
}