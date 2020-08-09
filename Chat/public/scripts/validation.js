document.getElementById('password').addEventListener('keyup', function(e) {
    let value = this.value;
	let result = false;
	let pas = document.getElementById("error-password");
	
	if( value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!$%&*.-_])[0-9a-zA-Z!$%&*.-_]{8,16}$/) ) {
		result = true;
		document.getElementById('error-password').style.display="none";
		pas.className = "error-pas-closed";
    } else {
        e.preventDefault();
		document.getElementById('error-password').style.display="block";
		pas.className = "error-pas-opened";
	}
});

document.getElementById('login').addEventListener('keyup', function(e) {
    let value = this.value;
	let result = false;
	let log = document.getElementById("error-login");
	
	if(value.match(/^[a-zA-Z0-9_-]{3,16}$/)) {
		result = true;
		document.getElementById('error-login').style.display="none";
		log.className = "error-log-closed";
    } else {
        e.preventDefault();
		document.getElementById('error-login').style.display="block";
		log.className = "error-log-opened";
	}
});

document.getElementById('name').addEventListener('keyup', function(e) {
    let value = this.value;
	let result = false;
	let nam = document.getElementById("error-name");
	
	if(value.match(/^[a-zA-Z]{3,16}$/)) {
		result = true;
		document.getElementById('error-name').style.display="none";
		nam.className = "error-na-closed";
    } else {
        e.preventDefault();
		document.getElementById('error-name').style.display="block";
		nam.className = "error-na-opened";
	}
});
