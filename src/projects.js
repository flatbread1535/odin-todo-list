import { Todo } from "./todos.js";

class Project {

    constructor(name) {
        this.name = name;
        this.todos = [];

    }

    rename(newName) {
        this.name = newName;
    }

    addTodo(title, description, dueDate, priority, notes, isComplete) {
        const todo = new Todo(title, description, dueDate, priority, notes, isComplete);
        this.todos.push(Todo);
    }

    getTodo(id) {
        return this.todos.find(todo => todo.id === id);
    }

    removeTodo(id) {
        this.todos.filter(todo => todo.id !== id);
    }

}

export { Project };