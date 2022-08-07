"use strict";

// Load projects
function loadProjects() {
	// Remove currently shown projects
	document.getElementById('projects').innerHTML = '';

	// Get active stacks
	let stacks = document.querySelectorAll('input[name=stacks]:checked');
	
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
	let node = document.createElement("div");
	node.innerHTML = `
		<div class="project-img"><img src="${projectInfo.img}"></div>
		<div class="project-description">
			<h3>${projectInfo.title}</h3>
			<a href="${projectInfo.url}"</a>
		</div>
	`;
	return node;
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
