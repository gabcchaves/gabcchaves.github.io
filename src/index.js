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

// Read stack checkboxes
function readCheckBoxes(checkBoxes) {
	let activeStacks = [];
	for (let cbIndex = 0; cbIndex < checkBoxes.length; cbIndex++) {
		if (checkBoxes[cbIndex].checked)
			activeStacks.push(checkBoxes[cbIndex].value);
	}
	return activeStacks;
}

// Refresh project list
function refreshProjectList(activeStacks, targetContainer) {

	// Fetch project list
	fetch("./projects.json")
		.then((response) => response.json())
		.then((data) => {

			// Clear project containers.
			targetContainer.innerHTML = "";

			// Check if there is any checked stack checkbox.
			if (activeStacks.length == 0) {
				
				// Display projects from all stacks.
				const availableStacks = Object.getOwnPropertyNames(data);
				for (const prop in data) {
					for (let projectIndex = data[prop].length - 1; projectIndex >= 0; projectIndex--) {
						const projectCard = createProjectCard(
							data[prop][projectIndex].img,
							data[prop][projectIndex].title,
							data[prop][projectIndex].description,
							data[prop][projectIndex].url
						);
						targetContainer.appendChild(projectCard);
					}
				}
			} else {
				for (let stackIndex = 0; stackIndex < activeStacks.length; stackIndex++) {
					// Checks if the active stack is found in the projects file.
					// If so, display their projects.
					if (data.hasOwnProperty(activeStacks[stackIndex])) {
						const currStack = data[activeStacks[stackIndex]];
						for (let projectIndex = currStack.length - 1; projectIndex >= 0; projectIndex--) {
							const projectCard = createProjectCard(
								currStack[projectIndex].img,
								currStack[projectIndex].title,
								currStack[projectIndex].description,
								currStack[projectIndex].url
							);
							targetContainer.appendChild(projectCard);
						}
					}
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

	projectSearchField.addEventListener("input", () => {
	});

	for (let i = 0; i < stackCheckBoxes.length; i++) {
		stackCheckBoxes[i].addEventListener("change", () => {
			if (stackCheckBoxes[i].checked) {
				refreshProjectList(readCheckBoxes(stackCheckBoxes), projectsContainer);
			} else {
				refreshProjectList(readCheckBoxes(stackCheckBoxes), projectsContainer);
			}
		});
	}

	refreshProjectList(readCheckBoxes(stackCheckBoxes), projectsContainer);
}

loadEvents();
