function togglePassword() {
    let password = document.getElementById("password");
    if (password.type === "password") {
        password.type = "text";
        document.getElementById("password-closed").id = "password-opened";
    } else {
        password.type = "password";
        document.getElementById("password-opened").id = "password-closed";
    }
}