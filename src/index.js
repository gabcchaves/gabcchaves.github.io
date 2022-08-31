'use strict';

// Project list
class ProjectList {
	static #projectList = fetch("./projects.json", { "cache": "no-store" } ).then((response) => response.json());

	static getProjectList() {
		return this.#projectList;
	}
}

// Display project on projects container
function displayProjects(projectsContainer = undefined, stack = undefined, searchPattern = undefined) {
	// Check if projects container has been defined
	if (projectsContainer === undefined) return false;

	ProjectList.getProjectList().then((data) => {
		// Only attempt to display projects if provided stack is valid
		if (stack == "frontend" || stack == "backend" || stack == "fullstack") {
			projectsContainer.innerHTML = ""; // Clear projects container
			for (let i = data[stack].length - 1; i >= 0; i--) {
				// Displays all possible projects if no search pattern provided
				if (searchPattern === undefined) {
					projectsContainer.appendChild(
						createProjectCard(
							data[stack][i]['title'],
							data[stack][i]['url'],
							data[stack][i]['img'],
							data[stack][i]['description']
						)
					);
				} else {
					// Displays project if it corresponds to provided search pattern
					if (data[stack][i]['title'].match(new RegExp(searchPattern, 'gi')) != null) {
						projectsContainer.appendChild(
							createProjectCard(
								data[stack][i]['title'],
								data[stack][i]['url'],
								data[stack][i]['img'],
								data[stack][i]['description']
							)
						);
					}
				}
			}
		} else {
			// Display projects of all stacks
			for (let currStack in data) {
				for (let i = data[currStack].length - 1; i >= 0; i--) {
					// Displays all possible projects if no search pattern provided
					if (searchPattern === undefined) {
						projectsContainer.appendChild(
							createProjectCard(
								data[currStack][i]['title'],
								data[currStack][i]['url'],
								data[currStack][i]['img'],
								data[currStack][i]['description']
							)
						);
					} else {
						// Displays project if it corresponds to provided search pattern
						if (data[currStack][i]['title'].match(new RegExp(searchPattern, 'gi'))) {
							projectsContainer.appendChild(
								createProjectCard(
									data[currStack][i]['title'],
									data[currStack][i]['url'],
									data[currStack][i]['img'],
									data[currStack][i]['description']
								)
							);
						}
					}
				}
			}
		}
	});
}

// Create a project card element
function createProjectCard(title, url, img, description) {
	const projectCard = document.createElement("article");
	const cardImg = document.createElement("img");
	const cardTitle = document.createElement("h4");
	const cardDescription = document.createElement("p");
	const cardAnchor = document.createElement("a");

	projectCard.classList.add('project-card');
	cardImg.classList.add('project-card-image');
	cardTitle.classList.add('project-card-title');
	cardDescription.classList.add('project-card-description');
	cardAnchor.classList.add('project-card-anchor');

	cardAnchor.href = url;
	cardDescription.innerHTML = description;
	cardTitle.innerHTML = title;
	cardImg.src = img;

	projectCard.appendChild(cardImg);
	projectCard.appendChild(cardTitle);
	projectCard.appendChild(cardDescription);
	projectCard.appendChild(cardAnchor);

	reloadCss();

	return projectCard;
}

// Reload CSS
function reloadCss() {
	const styleSheets = document.querySelectorAll("link[rel=stylesheet]");
	for (let i = 0; i < styleSheets; i++) {
		styleSheets[i].href = "";
	}
}

// Refresh project list
function refreshProjectList(searchPattern = undefined) {
	const projectsContainer = document.getElementById("projects-container");
	const frontEndCheckBox = document.querySelector("#frontend-checkbox");
	const backEndCheckBox = document.querySelector("#backend-checkbox");
	const fullStackCheckBox = document.querySelector("#fullstack-checkbox");
	projectsContainer.innerHTML = "";

	if (frontEndCheckBox.checked) {
		displayProjects(projectsContainer, "frontend", searchPattern);
	} else if (backEndCheckBox.checked) {
		displayProjects(projectsContainer, "backend", searchPattern);
	} else if (fullStackCheckBox.checked) {
		displayProjects(projectsContainer, "fullstack", searchPattern);
	} else {
		displayProjects(projectsContainer, undefined, searchPattern);
	}
}

// Assign elements their respective events
function loadEvents() {
	refreshProjectList();
	const frontEndCheckBox = document.querySelector("#frontend-checkbox");
	const backEndCheckBox = document.querySelector("#backend-checkbox");
	const fullStackCheckBox = document.querySelector("#fullstack-checkbox");
	const projectSearchField = document.querySelector("#project-search-field");

	frontEndCheckBox.addEventListener("change", () => {
		refreshProjectList();
	});

	backEndCheckBox.addEventListener("change", () => {
		refreshProjectList();
	});

	fullStackCheckBox.addEventListener("change", () => {
		refreshProjectList();
	});

	projectSearchField.addEventListener("input", () => {
		refreshProjectList(projectSearchField.value);
	});
}

/* Things to take effect on every page refresh */
// Check if any stack checkbox is checked
loadEvents();
