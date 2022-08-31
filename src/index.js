'use strict';

// Project list
class ProjectList {
	static #projectList = fetch("./projects.json", { "cache": "no-store" } ).then((response) => response.json());

	static getProjectList() {
		return this.#projectList;
	}
}

// Display project on projects container
function displayProjects(stack = undefined) {
	ProjectList.getProjectList().then((data) => {
		const projectsContainer = document.querySelector("#projects-container");

		// Only attempt to display projects if provided stack is valid
		if (stack == "frontend" || stack == "backend" || stack == "fullstack") {
			projectsContainer.innerHTML = ""; // Clear projects container
			for (let i = 0; i < data[stack].length; i++) {
				projectsContainer.appendChild(
					createProjectCard(
						data[stack][i].title,
						data[stack][i].url,
						data[stack][i].img,
						data[stack][i].description
					)
				);
			}
		} else {
			// Display projects of all stacks
			projectsContainer.innerHTML = ""; // Clear projects container
			for (let currStack in data) {
				for (let i = 0; i < data[currStack].length; i++) {
					projectsContainer.appendChild(
						createProjectCard(
							data[currStack][i].title,
							data[currStack][i].url,
							data[currStack][i].img,
							data[currStack][i].description
						)
					);
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

displayProjects();
