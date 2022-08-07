"use strict";

// Load the projects when page is loaded
document.addEventListener('DOMContentLoaded', () => {
	loadProjects();
});

// Load projects
function loadProjects() {
	// Remove currently shown projects
	document.getElementById('projects').innerHTML = '';

	// Get active stacks
	let stacks = document.querySelectorAll('input[name=stacks]:checked');

	// If no checkboxes are checked, then display all projects
	if  (stacks.length == 0) {
		stacks = document.querySelectorAll('input[name=stacks]');
	}
	
	// Read projects from JSON and display them on page
	fetchJSONFile('projects.json', function(data){
		for (let i = 0; i < stacks.length; i++) {
			let currStack = data[stacks[i].id];
			for (let j = 0; j < currStack.length; j++) {
				document.getElementById('projects').appendChild(createProjectCard(currStack[j]));
			}
		}
	});
}

// Create a project card
function createProjectCard(projectInfo) {
	// Card image
	let cardImage = document.createElement("div");
	cardImage.appendChild(document.createElement("img"));
	cardImage.firstChild.className = "project-img";
	cardImage.firstChild.src = projectInfo.img;

	// Card description
	let cardInfo = document.createElement("div");
	cardInfo.appendChild(document.createElement("h4"));
	cardInfo.appendChild(document.createElement("p"));
	cardInfo.appendChild(document.createElement("a"));

	cardInfo.childNodes[0].appendChild(document.createTextNode(projectInfo.title));
	cardInfo.childNodes[1].appendChild(document.createTextNode(projectInfo.description));
	cardInfo.childNodes[2].href = projectInfo.url;
	cardInfo.childNodes[0].className = "project-title";
	cardInfo.childNodes[1].className = "project-description";
	cardInfo.childNodes[2].className = "project-link";
	cardInfo.childNodes[2].classList.add("div-link");

	// Assemble the card
	let card = document.createElement("div");
	card.appendChild(cardImage);
	card.appendChild(cardInfo);
	card.className = "project-card";

	return card;
}

// Fetch project informations from JSON
function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(); 
}
