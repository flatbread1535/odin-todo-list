import { isToday, parseISO } from "date-fns";
import { sidebarLoad } from "./sidebar.js";
import { loadProjectDisplay } from "./project-display.js";
import { loadTodoDisplay } from "./todo-display.js";
import { projectManager } from "./storage.js";
import "./style.css";

const sidebarInit = () => {
    const sidebar = sidebarLoad();
    const projectDisplay = loadProjectDisplay();

    const homeAllBtn = document.querySelector(".home-all");
    homeAllBtn.addEventListener("click", () => {
        sidebar.loadAll();

        const todoList = document.querySelector(".todo-list");
        const projects = projectManager.getProjects();
        projects.forEach((project) => {
            project.todos.forEach((todo) => {
                todoList.appendChild(projectDisplay.createTodoTab(todo));
            });
        });
    });

    const homeTodayBtn = document.querySelector(".home-today");
    homeTodayBtn.addEventListener("click", () => {
        sidebar.loadToday();

        const todoList = document.querySelector(".todo-list");
        projectManager.getProjects().forEach((project) => {
            project.todos.forEach((todo) => {
                if (isToday(parseISO(todo.dueDate))) {
                    todoList.appendChild(
                        projectDisplay.createTodoTab(todo)
                    );
                }
            });
        });
    });

    const homeIncompleteBtn = document.querySelector(".home-incomplete");
    homeIncompleteBtn.addEventListener("click", () => {
        sidebar.loadIncomplete();

        const todoList = document.querySelector(".todo-list");
        const projects = projectManager.getProjects();
        projects.forEach((project) => {
            project.todos.forEach((todo) => {
                if (todo.isComplete === false) {
                    todoList.appendChild(projectDisplay.createTodoTab(todo));
                }
            });
        });
    });

    const homeCompleteBtn = document.querySelector(".home-complete");
    homeCompleteBtn.addEventListener("click", () => {
        sidebar.loadComplete();

        const todoList = document.querySelector(".todo-list");
        const projects = projectManager.getProjects();
        projects.forEach((project) => {
            project.todos.forEach((todo) => {
                if (todo.isComplete === true) {
                    todoList.appendChild(projectDisplay.createTodoTab(todo));
                }
            });
        });
    });

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
    const todoDisplay = loadTodoDisplay();
    let currentProjectId = null;

    const projects = document.querySelector(".projects");
    projects.addEventListener("click", (e) => {
        const projectTab = e.target.closest(".project-tab");

        if (projectTab) {
            const projectContainer = projectTab.closest(".project-container");
            const projectId = projectContainer.dataset.projectId;
            currentProjectId = projectId;
            projectDisplay.displayProject(projectId);
        }
    });

    const main = document.querySelector(".main");
    main.addEventListener("click", (e) => {
        const addTodoBtn = e.target.closest(".add-todo");

        if (addTodoBtn) {
            const todoDialog = document.querySelector(".todo-dialog");
            const dialogForm = document.querySelector(".dialog-form");
            dialogForm.reset();
            todoDialog.showModal();
        }

        const deleteBtn = e.target.closest(".delete-todo");

        if (deleteBtn) {
            const todoTab = e.target.closest(".todo-tab");
            const todoId = todoTab.dataset.todoId;
            projectManager.getProjects().forEach((project) => {
                project.removeTodo(todoId);
            });
            todoTab.remove();
        }

        const viewBtn = e.target.closest(".view-todo");

        if (viewBtn) {
            let selectedTodo = null;
            let selectedProjectId = null;

            const todoTab = e.target.closest(".todo-tab");
            const todoId = todoTab.dataset.todoId;

            projectManager.getProjects().forEach((project) => {
                project.todos.forEach((todo) => {
                    if (todo.id === todoId) {
                        selectedTodo = todo;
                        selectedProjectId = project.projectId;
                    }
                });
            });

            if (selectedTodo) {
                todoDisplay.loadTodoInfo(selectedTodo, selectedProjectId);
            }
        }

        const goBackBtn = e.target.closest(".go-back-btn");

        if (goBackBtn) {
            const projectId = goBackBtn.dataset.projectId;
            projectDisplay.displayProject(projectId);
        }
    });

    const todoDialog = document.querySelector(".todo-dialog");
    const dialogCancelBtn = document.querySelector(".dialog-cancel");

    dialogCancelBtn.addEventListener("click", () => {
        todoDialog.close();
    });

    const dialogForm = document.querySelector(".dialog-form");
    dialogForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.querySelector("#todo-title").value;
        const description = document.querySelector("#todo-description").value;
        const dueDate = document.querySelector("#todo-due-date").value;
        const priorityOption = document.querySelector("input[name=\"priority\"]:checked").value;
        const notes = document.querySelector("#todo-notes").value;
        const isComplete = document.querySelector("#todo-complete").checked;

        const project = projectManager.getProject(currentProjectId);

        project.addTodo(title, description, dueDate, priorityOption, notes, isComplete);

        projectDisplay.displayProject(currentProjectId);
        todoDialog.close();
    });

    // Initializes the website with a default project
    const defaultInit = () => {
        const sidebar = sidebarLoad();

        const defaultProject = projectManager.addProject("Default");
        sidebar.loadNewProject("Default");
        currentProjectId = defaultProject.projectId;
    };

    defaultInit();
};

const webPageInit = () => {
    sidebarInit();
    projectDisplayInit();
};

webPageInit();