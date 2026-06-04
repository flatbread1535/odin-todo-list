import { projectManager } from "./storage.js";

const loadProjectDisplay = () => {

    const displayProject = (projectId) => {
        // Getting project and main container to replace previous content
        const project = projectManager.getProject(projectId);
        const main = document.querySelector(".main");
        main.replaceChildren();

        // Creating header for selected project
        const projectHeader = document.createElement("h1");
        projectHeader.classList.add("project-header");
        projectHeader.dataset.projectId = projectId;
        projectHeader.textContent = project.name;
        main.appendChild(projectHeader);

        // Creating container for future project tabs to be appended
        const todoList = document.createElement("div");
        todoList.classList.add("todo-list");
        main.appendChild(todoList);

        const addTodo = document.createElement("button");
        addTodo.classList.add("add-todo");
        addTodo.dataset.projectId = projectId;
        addTodo.textContent = "+";
        main.appendChild(addTodo);
    };

    // Updates the display header for the project when project name is edited
    const updateProjectHeader = (projectId) => {
        const header = document.querySelector(".project-header");

        if (!header) return;

        const project = projectManager.getProject(projectId);
        header.textContent = project.name;
    };

    // Removes a project from the project display when the remove button is clicked
    const removeProjectDisplay = (projectId) => {
        const header = document.querySelector(".project-header");

        if (!header) return;

        // Clears contents
        const main = document.querySelector(".main");
        if (header.dataset.projectId === projectId) {
            main.replaceChildren();
        }
    };
    
    return { displayProject, updateProjectHeader, removeProjectDisplay };
};

export { loadProjectDisplay };