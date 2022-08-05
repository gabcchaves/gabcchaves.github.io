"use strict";

// Switch of projects
function switchStack(id) {
	document.getElementById("frontend").style.display = "none";
	document.getElementById("backend").style.display = "none";
	document.getElementById("fullstack").style.display = "none";
	document.getElementById(id).style.display = "block";
}
