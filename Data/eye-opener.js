function togglePassword() {
  let input = document.getElementById('password');
  let icon = document.getElementById('icon');
  if (input.type === "password") {
    input.type = "text";
    icon.classList.add('selected');
  } else {
    input.type = "password";
    icon.classList.remove('selected');
  }
}
