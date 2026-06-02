import { projectManager } from "./storage.js";
import folderSvg from "./svgs/folder.svg";
import menuSvg from "./svgs/menu.svg";

const sidebarLoad = () => {

    const loadNewProjectPrompt = () => {
        const promptContainer = document.querySelector(".project-controls");

        // Prevents multiple prompts from being opened
        if (document.querySelector(".new-project")) return;

        // New project prompt container
        const projForm = document.createElement("form");
        projForm.classList.add("new-project");

        // Label for instruction to input project name
        const nameInstruction = document.createElement("label");
        nameInstruction.htmlFor = "project-name";
        nameInstruction.textContent = "Project Name:";
        projForm.appendChild(nameInstruction);

        // Input box for project name
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.id = "project-name";
        nameInput.required = true;
        projForm.appendChild(nameInput);

        // Container and buttons to create or cancel project
        const projOptions = document.createElement("div");
        projOptions.classList.add("create-proj-opt");

        // Button to create a new project
        const createProjBtn = document.createElement("button");
        createProjBtn.type = "submit";
        createProjBtn.classList.add("create-proj");
        createProjBtn.textContent = "Create";
        projOptions.appendChild(createProjBtn);

        // Button to cancel the creation of a new project
        const cancelProjBtn = document.createElement("button");
        cancelProjBtn.type = "button";
        cancelProjBtn.classList.add("cancel-proj");
        cancelProjBtn.textContent = "Cancel";
        projOptions.appendChild(cancelProjBtn);
        projForm.appendChild(projOptions);

        promptContainer.appendChild(projForm);

        cancelProjBtn.onclick = () => projForm.remove();
    };

    const loadNewProject = (projectName) => {
        
        projectManager.addProject(projectName);

        const projects = document.querySelector(".projects");

        const projectItem = document.createElement("div");
        projectItem.classList.add("project-item");

        const projectTab = document.createElement("button");
        projectTab.classList.add("project-tab");

        const folderIcon = document.createElement("img");
        folderIcon.src = folderSvg;
        projectTab.appendChild(folderIcon);

        const name = document.createElement("p");
        name.textContent = projectName;
        projectTab.appendChild(name);
        projectItem.appendChild(projectTab);

        const projOptBtn = document.createElement("button");
        projOptBtn.classList.add("project-opt-btn");

        const menuIcon = document.createElement("img");
        menuIcon.src = menuSvg;
        projOptBtn.appendChild(menuIcon);

        projectItem.appendChild(projOptBtn);

        projects.appendChild(projectItem);
    }

    // Add toggleSidebar function later

    return { loadNewProjectPrompt, loadNewProject };
};
 
export { sidebarLoad };