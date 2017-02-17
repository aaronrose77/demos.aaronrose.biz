/*eslint-env node, mocha, browser */

var x = "Hello 'my' World!";

function sayHello() {
	return x;
}

document.addEventListener("DOMContentLoaded", function(event) { 
	console.log(sayHello());
	//svg4everybody();
});