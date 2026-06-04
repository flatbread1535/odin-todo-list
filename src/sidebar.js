import { projectManager } from "./storage.js";
import folderSvg from "./svgs/folder.svg";
import menuSvg from "./svgs/menu.svg";
import deleteSvg from "./svgs/delete.svg";
import { loadProjectDisplay } from "./project-display.js";

const sidebarLoad = () => {

    const main = document.querySelector(".main");
    const loadAll = () => {
        main.replaceChildren();
        const allHeader = document.createElement("h1");
        allHeader.classList.add("project-header");
        allHeader.textContent = "All Todos";
        main.appendChild(allHeader);

        const todoList = document.createElement("div");
        todoList.classList.add("todo-list");
        main.appendChild(todoList);
    };

    const loadToday = () => {
        main.replaceChildren();
        const todayHeader = document.createElement("h1");
        todayHeader.classList.add("project-header");
        todayHeader.textContent = "Todos Due Today";
        main.appendChild(todayHeader);

        const todoList = document.createElement("div");
        todoList.classList.add("todo-list");
        main.appendChild(todoList);
    };

    const loadIncomplete = () => {
        main.replaceChildren();
        const incompleteHeader = document.createElement("h1");
        incompleteHeader.classList.add("project-header");
        incompleteHeader.textContent = "Incomplete Todos";
        main.appendChild(incompleteHeader);

        const todoList = document.createElement("div");
        todoList.classList.add("todo-list");
        main.appendChild(todoList);
    };

    const loadComplete = () => {
        main.replaceChildren();
        const completeHeader = document.createElement("h1");
        completeHeader.classList.add("project-header");
        completeHeader.textContent = "Complete Todos";
        main.appendChild(completeHeader);

        const todoList = document.createElement("div");
        todoList.classList.add("todo-list");
        main.appendChild(todoList);
    };

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

        // Creating a new container for the project and adding the project id to the container
        const projectContainer = document.createElement("div");
        projectContainer.classList.add("project-container");
        projectContainer.dataset.projectId = newProjectId;

        // Container to store the actual project tab information
        const projectItem = document.createElement("div");
        projectItem.classList.add("project-item");

        // Button for selecting the project
        const projectTab = document.createElement("button");
        projectTab.classList.add("project-tab");

        // Folder SVG to left of button
        const folderIcon = document.createElement("img");
        folderIcon.src = folderSvg;
        projectTab.appendChild(folderIcon);

        // Name of the project displayed on the tab
        const name = document.createElement("p");
        name.classList.add("proj-name");
        name.textContent = projectName;
        projectTab.appendChild(name);
        projectItem.appendChild(projectTab);

        // Container that holds the menu and deletion buttons on the project tab
        const projOpt = document.createElement("div");
        projOpt.classList.add("project-opt");

        // Deletion button
        const deleteProjBtn = document.createElement("button");
        deleteProjBtn.classList.add("project-opt-btn", "delete-proj");

        // SVG inside the deletion button
        const deleteIcon = document.createElement("img");
        deleteIcon.src = deleteSvg;
        deleteProjBtn.appendChild(deleteIcon);
        projOpt.appendChild(deleteProjBtn);

        // Edit button
        const editProjBtn = document.createElement("button");
        editProjBtn.classList.add("project-opt-btn", "edit-proj");

        // SVG inside the edit button
        const menuIcon = document.createElement("img");
        menuIcon.src = menuSvg;
        editProjBtn.appendChild(menuIcon);
        projOpt.appendChild(editProjBtn);

        projectItem.appendChild(projOpt);
        projectContainer.appendChild(projectItem);
        projects.appendChild(projectContainer);
    };

    // 
    const loadEditPrompt = (projectContainer) => {
        // Form and container for the edit project prompt
        const editProject = document.createElement("form");
        editProject.classList.add("edit-project")

        // Checks if an edit proejct prompt is already open
        if (document.querySelector(".edit-project")) return;

        // Label for rename input textbox
        const renameInstruction = document.createElement("label");
        renameInstruction.htmlFor = "new-name";
        renameInstruction.textContent = "Rename Project:";
        editProject.appendChild(renameInstruction);

        // Input text box for renaming
        const renameInput = document.createElement("input");
        renameInput.type = "text";
        renameInput.id = "new-name";
        renameInput.required = true;
        editProject.appendChild(renameInput);

        // Container for edit option buttons
        const editProjOpt = document.createElement("div");
        editProjOpt.classList.add("edit-proj-opt");

        // Button for submitting project with new name
        const renameProj = document.createElement("button");
        renameProj.type = "submit";
        renameProj.classList.add("rename-proj");
        renameProj.textContent = "Rename";
        editProjOpt.appendChild(renameProj);

        // Button for cancelling any editing information and closing prompt tab
        const cancelProj = document.createElement("button");
        cancelProj.type = "button";
        cancelProj.classList.add("cancel-proj");
        cancelProj.textContent = "Cancel";
        editProjOpt.appendChild(cancelProj);

        editProject.appendChild(editProjOpt);
        projectContainer.appendChild(editProject);

        // Closes edit prompt tab when cancel button is clicked
        cancelProj.onclick = () => editProject.remove();
    };

    // Changes the name of a project tab
    const renameProject = (projectContainer, projectId, newProjectName) => {
        const project = projectManager.getProject(projectId);
        project.rename(newProjectName);
        const name = projectContainer.querySelector(".proj-name");
        name.textContent = newProjectName;
    };

    // Deletes a project tab from the sidebar
    const deleteProject = (projectContainer) => {
        const projectId = projectContainer.dataset.projectId;
        projectManager.deleteProject(projectId);
        projectContainer.remove();
    };

    // Add toggleSidebar function later, maybe deletion confirmation prompt

    return {
        loadNewProjectPrompt,
        loadNewProject,
        loadEditPrompt,
        renameProject,
        deleteProject,
        loadAll,
        loadToday,
        loadIncomplete,
        loadComplete
    };
};

export { sidebarLoad };