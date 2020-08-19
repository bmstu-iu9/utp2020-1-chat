let shown = false;
const emoji = document.getElementById("emoji-block");
const button = document.getElementById("emoji-but");


button.addEventListener("click", function () {
    if(!shown){
        emoji.style.display = "block";
        shown = true;
    }
    else{
        emoji.style.display = "none";
        shown = false;
    }
});
