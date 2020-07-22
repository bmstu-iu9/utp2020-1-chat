function togglePassword() {
  let password = document.getElementById("password");
  let eye = document.getElementById("password-hider");
  if (password.type === "password") {
    password.type = "text";
    eye.className = "eye-opened";
  } else {
      password.type = "password";
      eye.className = "eye-closed";
  }
}
