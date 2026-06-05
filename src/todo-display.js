import{ format, parseISO } from "date-fns";

const loadTodoDisplay = () => {

    const loadTodoInfo = (todo, projectId) => {
        const main = document.querySelector(".main");
        main.replaceChildren();

        const todoContainer = document.createElement("div");
        todoContainer.classList.add("todo-view-container");

        const todoTitle = document.createElement("h1");
        todoTitle.classList.add("todo-view-title");
        todoTitle.textContent = todo.title;
        main.appendChild(todoTitle);

        const todoDescription = document.createElement("p");
        todoDescription.classList.add("todo-view-description");
        todoDescription.textContent = "Description: " + (todo.description || "none");
        todoContainer.appendChild(todoDescription);

        const todoPriority = document.createElement("p");
        todoPriority.classList.add("todo-view-priority");
        todoPriority.textContent = "Priority: " + todo.priority;
        todoContainer.appendChild(todoPriority);

        const todoNotes = document.createElement("p");
        todoNotes.classList.add("todo-view-notes");
        todoNotes.textContent = "Notes: " + (todo.notes || "none");
        todoContainer.appendChild(todoNotes);

        const isComplete = document.createElement("p");
        isComplete.classList.add("todo-view-status");
        if (todo.isComplete === true) {
            isComplete.textContent = "Status: complete";
        } else {
            isComplete.textContent = "Status: incomplete";
        }
        todoContainer.appendChild(isComplete);

        const goBackBtn = document.createElement("button");
        goBackBtn.classList.add("go-back-btn");
        goBackBtn.dataset.projectId = projectId;
        goBackBtn.textContent = "Go Back";
        todoContainer.appendChild(goBackBtn);

        main.appendChild(todoContainer);
    };

    return { loadTodoInfo };
};

export { loadTodoDisplay };