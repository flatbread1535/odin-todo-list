import { sidebarLoad } from "./sidebar.js";
import "./style.css";

const sidebar = sidebarLoad();

// Event listener to handle opening a new project prompt
const addProjBtn = document.querySelector(".add-project");
addProjBtn.addEventListener("click", () => {
    sidebar.loadNewProjectPrompt();
});

// Event listener to create a new project tab when create button is pressed in prompt
const sidebarContainer = document.querySelector(".sidebar");
sidebarContainer.addEventListener("submit", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("new-project")) {
        const projectNameIpt = e.target.querySelector("#project-name");
        const projectName = projectNameIpt.value;
        sidebar.loadNewProject(projectName);
        e.target.remove();
        return;
    }

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

const projects = document.querySelector(".projects");
projects.addEventListener("click", (e) => {
    
    const editBtn = e.target.closest(".edit-proj");

    if (editBtn) {
        const projectContainer = editBtn.closest(".project-container");
        sidebar.loadEditPrompt(projectContainer);
        console.log("Fizz");
        return;
    }

    const deleteBtn = e.target.closest(".delete-proj");

    if (deleteBtn) {
        const projectContainer = deleteBtn.closest(".project-container");
        sidebar.loadDeletePrompt(projectContainer);
        console.log("Buzz");
        return;
    }
});

