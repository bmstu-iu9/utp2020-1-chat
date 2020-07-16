document.getElementById('password').addEventListener('keyup', function(e) {
    var value = this.value;
	var result = false;
	
	if( value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!$%&*.-_])[0-9a-zA-Z!$%&*.-_]{8,16}$/) ) {
		result = true;
		document.getElementById('error-password').style.display="none";
    }
	else
	{
        e.preventDefault();
		document.getElementById('error-password').style.display="block";
	}
});

document.getElementById('login').addEventListener('keyup', function(e) {
    var value = this.value;
	var result = false;
	
	if( value.match(/^[a-zA-Z0-9_-]{3,16}$/) ) {
		result = true;
		document.getElementById('error-login').style.display="none";
    }
	else
	{
        e.preventDefault();
		document.getElementById('error-login').style.display="block";
	}

});

document.getElementById('name').addEventListener('keyup', function(e) {
    var value = this.value;
	var result = false;
	
	if( value.match(/^[a-zA-Z]{3,24}$/) ) {
		result = true;
		document.getElementById('error-name').style.display="none";
    }
	else
	{
        e.preventDefault();
		document.getElementById('error-name').style.display="block";
	}
 
});
