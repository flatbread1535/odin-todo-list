class Todo {

    constructor(title, description, dueDate, priority, notes, isComplete) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.isComplete = isComplete;
        this.id = crypto.randomUUID();
    }

    // Editing functions

    editTitle(newTitle) {
        this.title = newTitle;
    }

    editDescription(newDescription) {
        this.description = newDescription;
    }

    editDueDate(newDueDate) {
        this.dueDate = newDueDate;
    }

    changePriority(newPriority) {
        this.priority = newPriority;
    }

    editNotes(newNotes) {
        this.notes = newNotes;
    }

    toggleComplete() {
        this.isComplete = !this.isComplete;
    }
}

export { Todo };