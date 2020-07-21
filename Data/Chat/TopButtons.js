//Кнопка выхода
const out = document.getElementById("button_exit");
out.addEventListener("click", function () {
    location.href = "../Entrance/indexEntrance.html";
})

//Кнопка изменить
const edit = document.getElementById("button_edit");
const form_edit = document.getElementById("formEdit");
let num_click = 0;
form_edit.style.display = 'none';

edit.addEventListener("click", function () {
    num_click++;
    if( num_click == 1) form_edit.style.display = '';
    if( num_click == 2){
        form_edit.style.display = 'none';
        num_click = 0;
    }
})