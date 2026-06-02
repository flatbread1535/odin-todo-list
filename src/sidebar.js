import { projectManager } from "./storage.js";
import folderSvg from "./svgs/folder.svg";
import menuSvg from "./svgs/menu.svg";
import deleteSvg from "./svgs/delete.svg";

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
        
        const newProject = projectManager.addProject(projectName);
        const newProjectId = newProject.projectId;

        const projects = document.querySelector(".projects");

        const projectContainer = document.createElement("div");
        projectContainer.classList.add("project-container");
        projectContainer.dataset.projectId = newProjectId;

        const projectItem = document.createElement("div");
        projectItem.classList.add("project-item");

        const projectTab = document.createElement("button");
        projectTab.classList.add("project-tab");

        const folderIcon = document.createElement("img");
        folderIcon.src = folderSvg;
        projectTab.appendChild(folderIcon);

        const name = document.createElement("p");
        name.classList.add("proj-name");
        name.textContent = projectName;
        projectTab.appendChild(name);
        projectItem.appendChild(projectTab);

        const projOpt = document.createElement("div");
        projOpt.classList.add("project-opt");

        const deleteProjBtn = document.createElement("button");
        deleteProjBtn.classList.add("project-opt-btn", "delete-proj");
        
        const deleteIcon = document.createElement("img");
        deleteIcon.src = deleteSvg;
        deleteProjBtn.appendChild(deleteIcon);
        projOpt.appendChild(deleteProjBtn);

        const editProjBtn = document.createElement("button");
        editProjBtn.classList.add("project-opt-btn", "edit-proj");

        const menuIcon = document.createElement("img");
        menuIcon.src = menuSvg;
        editProjBtn.appendChild(menuIcon);
        projOpt.appendChild(editProjBtn);
        
        projectItem.appendChild(projOpt);
        projectContainer.appendChild(projectItem);
        projects.appendChild(projectContainer);
    };

    const loadEditPrompt = (projectContainer) => {
        const editProject = document.createElement("form");
        editProject.classList.add("edit-project")

        if (document.querySelector(".edit-project")) return;
        
        const renameInstruction = document.createElement("label");
        renameInstruction.htmlFor = "new-name";
        renameInstruction.textContent = "Rename Project:";
        editProject.appendChild(renameInstruction);
        
        const renameInput = document.createElement("input");
        renameInput.type = "text";
        renameInput.id = "new-name";
        renameInput.required = true;
        editProject.appendChild(renameInput);

        const editProjOpt = document.createElement("div");
        editProjOpt.classList.add("edit-proj-opt");
        
        const renameProj = document.createElement("button");
        renameProj.type = "submit";
        renameProj.classList.add("rename-proj");
        renameProj.textContent = "Rename";
        editProjOpt.appendChild(renameProj);

        const cancelProj = document.createElement("button");
        cancelProj.type = "button";
        cancelProj.classList.add("cancel-proj");
        cancelProj.textContent = "Cancel";
        editProjOpt.appendChild(cancelProj);

        editProject.appendChild(editProjOpt);
        projectContainer.appendChild(editProject);

        cancelProj.onclick = () => editProject.remove();
    };

    const renameProject = (newProjectName) => {

    };

    const loadDeletePrompt = (projectContainer) => {

    };

    const deleteProject = (projectId) => {

    };
    
    // Add toggleSidebar function later

    return { loadNewProjectPrompt, loadNewProject, loadEditPrompt, renameProject, loadDeletePrompt, deleteProject };
};
 
export { sidebarLoad };