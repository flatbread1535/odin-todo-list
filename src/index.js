import { sidebarLoad } from "./sidebar.js";
import "./style.css";

const sidebar = sidebarLoad();
const addProjBtn = document.querySelector(".add-project");
addProjBtn.addEventListener("click", () => {
    sidebar.loadNewProjectPrompt();
});