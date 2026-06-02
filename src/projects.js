import { Todo } from "./todos.js";

class Project {

    constructor(name) {
        this.name = name;
        this.todos = []; // Stores all todo items
        this.projectId = crypto.randomUUID();
    }

    rename(newName) {
        this.name = newName;
    }

    // Methods for adding, getting, or removing projects

    addTodo(title, description, dueDate, priority, notes, isComplete) {
        const todo = new Todo(title, description, dueDate, priority, notes, isComplete);
        this.todos.push(Todo);
    }

    getTodo(todoId) {
        return this.todos.find(todo => todo.id === todoId);
    }

    removeTodo(todoId) {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
    }

}

export { Project };