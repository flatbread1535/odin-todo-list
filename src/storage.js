import { Project } from "./projects.js";

const createProjectManager = () => {
    let projects = []; // stores all projects

    // Methods for adding, getting, or removing projects

    const addProject = (name) => {
        const project = new Project(name);
        projects.push(project);
    };

    const getProject = (projectId) => {
        return projects.find(project => project.projectId === projectId);
    };

    const deleteProject = (projectId) => {
        projects = projects.filter(project => project.projectId !== projectId);
    };

    return { addProject, getProject, deleteProject };
};

const projectManager = createProjectManager();
export { projectManager };