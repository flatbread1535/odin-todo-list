import { Todo } from "./todos.js";
import { projectManager } from "./storage.js";

class Project {

    constructor(name) {
        this.name = name;
        this.todos = []; // Stores all todo items
        this.projectId = crypto.randomUUID();
    }

    addTodo(
        title,
        description,
        dueDate,
        priority,
        notes,
        isComplete
    ) {
        const todo = new Todo(
            title,
            description,
            dueDate,
            priority,
            notes,
            isComplete
        );
        this.todos.push(todo);
        projectManager.save();
    }

    rename(newName) {
        this.name = newName;
        projectManager.save();
    }

    removeTodo(todoId) {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
        projectManager.save();
    }

}

export { Project };