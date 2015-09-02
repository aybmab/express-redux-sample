
var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
var displayNameRegex = /^[a-zA-Z\-\_0-9]+$/; //alphanumerics, "-" and "_"
var passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,}$/; // At least 6 characters    

/**
	*	Given a trimmed string, returns true if the string matches 
	* a proper email format.
	*/
export function validateEmail(email) {
	return emailRegex.test(email);
}


/**
	*	Given a trimmed string, returns true if the string contains at  
	* least one valid character (alphanumerics)
	*/
export function validateDisplayName(displayName) {
	return displayNameRegex.test(displayName);
}


/**
	*	Given a trimmed string, returns true if the string contains at  
	* least 6 valid character (alphanumerics and !@#$%^&*)
	*/
export function validatePassword(password) {
	return passwordRegex.test(password);
}

