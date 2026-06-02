import { sidebarLoad } from "./sidebar.js";
import { projectManager } from "./storage.js";
import "./style.css";

const sidebarInit = () => {
    const sidebar = sidebarLoad();

    // Initializes the website with a default project
    projectManager.addProject("Default");
    sidebar.loadNewProject("Default");

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
            e.target.remove();
            return;
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
            sidebar.deleteProject(projectContainer);
            return;
        }
    });
};

const webPageInit = () => {
    sidebarInit();
};

webPageInit();