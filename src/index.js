'use strict';

// Create project card
function createProjectCard(img, title, description, url) {
	// Create elements
	const projectCard = document.createElement("div");
	const projectCardImageContainer = document.createElement("div");
	const projectCardImage = document.createElement("img");
	const projectCardInfoContainer = document.createElement("div");
	const projectCardTitle = document.createElement("h4");
	const projectCardDescription = document.createElement("p");
	const projectCardAnchor = document.createElement("a");

	// Set up their attributes
	projectCardAnchor.href = url;
	projectCardAnchor.classList.add("project-card-anchor");
	projectCardDescription.innerHTML = description;
	projectCardDescription.classList.add("project-card-description");
	projectCardTitle.innerHTML = title;
	projectCardTitle.classList.add("project-card-title");
	projectCardImage.src = img;
	projectCardImage.classList.add("project-card-image");
	projectCardImageContainer.classList.add("project-card-image-container");
	projectCard.classList.add("project-card");

	// Assemble them
	projectCardInfoContainer.appendChild(projectCardTitle);
	projectCardInfoContainer.appendChild(projectCardDescription);
	projectCardImageContainer.appendChild(projectCardImage);

	projectCard.appendChild(projectCardImageContainer);
	projectCard.appendChild(projectCardInfoContainer);
	projectCard.appendChild(projectCardAnchor);

	// Refresh the stylesheets, so that they receiver correct styles
	refreshCss();

	return projectCard;
}

// Refresh CSS
function refreshCss() {
	const styleSheets = document.querySelectorAll("link[rel=stylesheet]");
	for (let i = 0; i < styleSheets.length; i++) {
		styleSheets[i].href += "";
	}
}

// Refresh project list
function refreshProjectList(activeStacks, targetContainer) {
	// Fetch project list
	fetch("./projects.json")
		.then((response) => response.json())
		.then((data) => {
			// Run through the active stacks
			for (let stackIndex = 0; stackIndex < activeStacks.length; stackIndex++) {
				// Run through the stack project list
				for (let projectIndex = data[activeStacks[stackIndex]].length - 1; projectIndex > 0; projectIndex--) {
					const project = data[activeStacks[stackIndex]][projectIndex];
					const projectCard = createProjectCard(
						project.img,
						project.title,
						project.description,
						project.url
					);
					targetContainer.appendChild(projectCard);
				}
			}
		});
}

// Assign elements their respective events
function loadEvents() {
	// Elements
	const projectSearchField = document.querySelector("#project-search-field");
	const stackCheckBoxes = document.querySelectorAll("#stack-checkboxes input[type=checkbox]");
	const projectsContainer = document.querySelector("#projects-container");

	// Values
	let activeStacks = [];
	let projectList;


	projectSearchField.addEventListener("input", () => {
	});

	for (let i = 0; i < stackCheckBoxes.length; i++) {
		stackCheckBoxes[i].addEventListener("change", () => {
			if (stackCheckBoxes[i].checked) {
				activeStacks.splice(i, 0, stackCheckBoxes[i].value); // Add value to array
			} else {
				activeStacks.splice(i, 1);
			}
			refreshProjectList(activeStacks, projectsContainer);
		});
	}

	refreshProjectList(activeStacks, projectsContainer);
}

loadEvents();
