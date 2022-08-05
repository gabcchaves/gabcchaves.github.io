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
		const projects = JSON.parse(this.responseText);
		document.getElementById(id).innerHTML = "";
		for (let i = 0; i < projects.length; i++) {
			document.getElementById(id).innerHTML += `
				<div class="project">
					<a href="${projects[i].url}"></a>
					<img src="img/${projects[i].img}">
					<h4>${projects[i].title}</h4>
				</div>
			`;
		}
	};
	xmlhttp.open("GET", "projects.json");
	xmlhttp.send();
}
