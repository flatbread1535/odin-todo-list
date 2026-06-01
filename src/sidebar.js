const sidebarLoad = () => {

    const loadNewProjectPrompt = () => {
        const promptContainer = document.querySelector(".project-controls");

        // Prevents multiple prompts from being opened
        if (document.querySelector(".new-project")) return;

        // New project prompt container
        const projPrompt = document.createElement("div");
        projPrompt.classList.add("new-project");

        // Label for instruction to input project name
        const nameInstruction = document.createElement("label");
        nameInstruction.htmlFor = "project-name";
        nameInstruction.textContent = "Project Name:";
        projPrompt.appendChild(nameInstruction);

        // Input box for project name
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.id = "project-name";
        projPrompt.appendChild(nameInput);

        // Container and buttons to create or cancel project
        const projOptions = document.createElement("div");
        projOptions.classList.add("create-proj-opt");
        const createProjBtn = document.createElement("button");
        createProjBtn.classList.add("create-proj");
        createProjBtn.textContent = "Create";
        projOptions.appendChild(createProjBtn);
        const cancelProjBtn = document.createElement("button");
        cancelProjBtn.classList.add("cancel-proj");
        cancelProjBtn.textContent = "Cancel";
        projOptions.appendChild(cancelProjBtn);
        projPrompt.appendChild(projOptions);

        promptContainer.appendChild(projPrompt);

        cancelProjBtn.onclick = () => projPrompt.remove();
    };

    return {loadNewProjectPrompt };
};
 
export { sidebarLoad };