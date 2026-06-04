import { sidebarLoad } from "./sidebar.js";
import { loadProjectDisplay } from "./project-display.js";
import { projectManager } from "./storage.js";
import "./style.css";

const sidebarInit = () => {
    const sidebar = sidebarLoad();
    const projectDisplay = loadProjectDisplay();

    // Event listener to handle opening a new project prompt
    const addProjBtn = document.querySelector(".add-project");
    addProjBtn.addEventListener("click", () => {
        sidebar.loadNewProjectPrompt();
    });

    // Event listener to create a new project tab when create button is pressed in prompt
    const sidebarContainer = document.querySelector(".sidebar");
    sidebarContainer.addEventListener("submit", (e) => {
        e.preventDefault();

        // Listens for if the submit button clicked is the one to create a new project
        if (e.target.classList.contains("new-project")) {
            const projectNameIpt = e.target.querySelector("#project-name");
            const projectName = projectNameIpt.value;
            sidebar.loadNewProject(projectName);
            e.target.remove();
            return;
        }

        // Listens for if the submit button clicked is the one to edit the project name
        if (e.target.classList.contains("edit-project")) {
            const projectContainer = e.target.closest(".project-container");
            const projectId = projectContainer.dataset.projectId;

            const newNameIpt = e.target.querySelector("#new-name");
            const newName = newNameIpt.value;
            sidebar.renameProject(projectContainer, projectId, newName);
            projectDisplay.updateProjectHeader(projectId);
            e.target.remove();
        }
    });

    // Handles click event where project deletion or editing button is clicked
    const projects = document.querySelector(".projects");
    projects.addEventListener("click", (e) => {

        // Edits the project tab name if the edit button is clicked
        const editBtn = e.target.closest(".edit-proj");
        if (editBtn) {
            const projectContainer = editBtn.closest(".project-container");
            sidebar.loadEditPrompt(projectContainer);
            return;
        }

        // Deletes the project tab if the delete button is clicked
        const deleteBtn = e.target.closest(".delete-proj");
        if (deleteBtn) {
            const projectContainer = deleteBtn.closest(".project-container");
            const projectId = projectContainer.dataset.projectId;
            sidebar.deleteProject(projectContainer);
            projectDisplay.removeProjectDisplay(projectId);
        }
    });
};

const projectDisplayInit = () => {
    const projectDisplay = loadProjectDisplay();

    const projects = document.querySelector(".projects");
    projects.addEventListener("click", (e) => {
        const projectTab = e.target.closest(".project-tab");

        if (projectTab) {
            const projectContainer = projectTab.closest(".project-container");
            const projectId = projectContainer.dataset.projectId;
            projectDisplay.displayProject(projectId);
        }
    });

    const main = document.querySelector(".main");
    main.addEventListener("click", (e) => {
        const addTodoBtn = e.target.closest(".add-todo");

        if (addTodoBtn) {
            const todoDialog = document.querySelector(".todo-dialog");
            todoDialog.showModal();
        }
    });

    const todoDialog = document.querySelector(".todo-dialog");
    const dialogCancelBtn = document.querySelector(".dialog-cancel");

    dialogCancelBtn.addEventListener("click", () => {
        todoDialog.close();
    });
};

// Initializes the website with a default project
const defaultInit = () => {
    const sidebar = sidebarLoad();
    const projectDisplay = loadProjectDisplay();

    const defaultProject = projectManager.addProject("Default");
    sidebar.loadNewProject("Default");
    projectDisplay.displayProject(defaultProject.projectId);
};

const webPageInit = () => {
    defaultInit();
    sidebarInit();
    projectDisplayInit();
};

webPageInit();