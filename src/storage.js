import { Project } from "./projects.js";
import { Todo } from "./todos.js";

const STORAGE_KEY = "todo-app";

const projectManager = (() => {
    let projects = []; // stores all projects

    const save = () => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(projects)
        );
    };

    const load = () => {
        const saved =
            JSON.parse(localStorage.getItem(STORAGE_KEY));

        if (!saved) return;

        projects.length = 0;

        saved.forEach((projectData) => {
            const project =
                new Project(projectData.name);

            project.projectId =
                projectData.projectId;

            projectData.todos.forEach((todoData) => {
                const todo = new Todo(
                    todoData.title,
                    todoData.description,
                    todoData.dueDate,
                    todoData.priority,
                    todoData.notes,
                    todoData.isComplete
                );

                todo.id = todoData.id;

                project.todos.push(todo);
            });

            projects.push(project);
        });
    };

    // Methods for adding, getting, or removing projects

    const addProject = (name) => {
        const project = new Project(name);
        projects.push(project);
        save();
        return project;
    };

    const getProject = (projectId) => {
        return projects.find(project => project.projectId === projectId);
    };

    const getProjects = () => projects;

    const deleteProject = (projectId) => {
        const index = projects.findIndex(
            project => project.projectId === projectId
        );

        if (index !== -1) {
            projects.splice(index, 1);
        }

        save();
    };

    return { 
        addProject, 
        getProject, 
        getProjects, 
        deleteProject,
        save,
        load,
    };
})();

export { projectManager };