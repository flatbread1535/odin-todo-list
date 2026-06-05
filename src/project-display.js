import{ format, parseISO } from "date-fns";
import { projectManager } from "./storage.js";
import checkMarkSvg from "./svgs/check.svg";
import deleteSvg from "./svgs/delete.svg";
import viewSvg from "./svgs/view.svg";
import crossSvg from "./svgs/cross.svg";


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

        project.todos.forEach((todo) => {
            todoList.appendChild(createTodoTab(todo));
        });

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

    const createTodoTab = (todo) => {

        const todoTab = document.createElement("div");
        todoTab.classList.add("todo-tab");
        todoTab.dataset.todoId = todo.id;

        const todoBasicInfo = document.createElement("div");
        todoBasicInfo.classList.add("todo-basic-info");

        const completeImg = document.createElement("img");
        if (todo.isComplete === true) {
            completeImg.src = checkMarkSvg;
            completeImg.classList.add("complete-icon");
        } else {
            completeImg.src = crossSvg;
            completeImg.classList.add("incomplete-icon");
        }
        todoBasicInfo.appendChild(completeImg);

        const todoTextInfo = document.createElement("div");
        todoTextInfo.classList.add("todo-text-info");

        const todoName = document.createElement("p");
        todoName.classList.add("todo-name");
        todoName.textContent = todo.title;
        todoTextInfo.appendChild(todoName);

        const todoDate = document.createElement("p");
        todoDate.classList.add("todo-date");

        const dateObject = parseISO(todo.dueDate);
        todoDate.textContent = "Due: " + format(dateObject, "MM/dd/yyyy");

        todoTextInfo.appendChild(todoDate);
        todoBasicInfo.appendChild(todoTextInfo);
        todoTab.appendChild(todoBasicInfo);

        const todoState = document.createElement("div");
        todoState.classList.add("todo-state");

        // Once again, will need conditions for high/medium/low
        const todoPriority = document.createElement("p");
        if (todo.priority === "high") {
             todoPriority.classList.add("todo-priority-high");
        } else if (todo.priority === "medium") {
            todoPriority.classList.add("todo-priority-medium");
        } else {
            todoPriority.classList.add("todo-priority-low");
        }
        todoPriority.textContent = todo.priority;
        todoState.appendChild(todoPriority);

        const deleteTodoBtn = document.createElement("button");
        deleteTodoBtn.classList.add("delete-todo");
        deleteTodoBtn.type = "button";

        const deleteImg = document.createElement("img");
        deleteImg.src = deleteSvg;
        deleteTodoBtn.appendChild(deleteImg);
        todoState.appendChild(deleteTodoBtn);

        const viewTodoBtn = document.createElement("button");
        viewTodoBtn.classList.add("view-todo");
        viewTodoBtn.type = "button";

        const viewImg = document.createElement("img");
        viewImg.src = viewSvg;
        viewTodoBtn.appendChild(viewImg);
        todoState.appendChild(viewTodoBtn);

        todoTab.appendChild(todoState);

        return todoTab;
    };
    
    return { displayProject, updateProjectHeader, removeProjectDisplay, createTodoTab };
};

export { loadProjectDisplay };