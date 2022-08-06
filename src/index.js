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
		for (let i = 0; i < projects.length; i++) {
			document.getElementById(id).innerHTML += `
				<div class="project">
					<a href="${projects[id][i].url}"></a>
					<img src="${projects[id][i].img}">
					<h4>${projects[id][i].title}</h4>
				</div>
			`;
		}
	};
	xmlhttp.open("GET", "projects.json");
	xmlhttp.send();
}
