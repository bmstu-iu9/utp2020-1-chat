'use strict'

document.getElementById('password').addEventListener('input', function(e) {
	let value = this.value;
	let div = document.getElementById("error-password");

	if(!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!$%&*.-_])[0-9a-zA-Z!$%&*.-_]{8,16}$/)) {
		div.style.display = "block";
	} else {
		e.preventDefault();
		div.style.display = "none";
	}
});

document.getElementById('login').addEventListener('input', function(e) {
	let value = this.value;
	let div = document.getElementById("error-login");

	if(!value.match(/^[a-zA-Z0-9_-]{3,16}$/)) {
		div.style.display = "block";
	} else {
		e.preventDefault();
		div.style.display = "none";
	}
});

document.getElementById('name').addEventListener('input', function(e) {
	let value = this.value;
	let div = document.getElementById("error-name");

	if(!value.match(/^[a-zA-Z]{3,16}$/)) {
		div.style.display = "block";
	} else {
		e.preventDefault();
		div.style.display = "none";
	}
});

function hide(obj) {
	obj.parentElement.style.display = 'none';
	setTimeout(() => { this.parentElement.style.display = 'none'; }, 1000);
}