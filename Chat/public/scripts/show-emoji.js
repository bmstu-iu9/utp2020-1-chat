let shown = false;
const emoji = document.getElementById("emoji-block");
emoji.style.display = "none";
const button = document.getElementById("emoji-but");


button.addEventListener("click", function () {
    if(!shown){
        emoji.style.display = "";
        shown = true;
    }
    else{
        emoji.style.display = "none";
        shown = false;
    }
});