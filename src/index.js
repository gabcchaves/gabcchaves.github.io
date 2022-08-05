"use strict";

// Switch of projects
function switchStack(id) {
	document.getElementById("frontend").style.display = "none";
	document.getElementById("backend").style.display = "none";
	document.getElementById("fullstack").style.display = "none";
	document.getElementById(id).style.display = "block";

	loadProjects(id);
}

// Load projects from JSON
function loadProjects(id) {
	const xmlhttp = new XMLHttpRequest();
	xmlhttp.onload = function() {
		const myObj = JSON.parse(this.responseText);
		//document.getElementById("demo").innerHTML = myObj;
		console.log(myObj);
	};
	xmlhttp.open("GET", "projects.json");
	xmlhttp.send();
}
