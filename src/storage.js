import { Project } from "./projects.js";

const projectManager = () => {
    const projects = []; // stores all projects

    // Methods for adding, getting, or removing projects

    const addProject = (name) => {
        const project = new Project(name);
        projects.push(project);
    };

    const getProject = (projectId) => {
        return projects.find(project => project.projectId === projectId);
    };

    const deleteProject = (projectId) => {
        projects.filter(project => project.projectId !== projectId);
    };

    return { addProject, getProject, deleteProject };
};

export { projectManager };