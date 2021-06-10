var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Auto_Bind } from "../decorators/autobind.js";
import { Status } from "../Interfaces/project-class-enum.js";
import { projectInstance } from "../state/project-state.js";
import { ComponentBase } from "./baseComponent.js";
import { ProjectItem } from "./projectItem.js";
export class ProjectList extends ComponentBase {
    constructor(type) {
        super("project-list", "app", false, `${type}-projects`);
        this.type = type;
        this.assigneProjects = [];
        this.element.querySelector("ul").id = `${this.type}-projects-list`;
        this.configure();
        this._render();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            let ulEL = this.element.querySelector("ul");
            ulEL.classList.add("droppable");
        }
    }
    dragLeaveHandler(_) {
        let ulEL = this.element.querySelector("ul");
        ulEL.classList.remove("droppable");
    }
    dropHandler(event) {
        let droppedProjectId = event.dataTransfer.getData("text/plain");
        projectInstance.moveProject(droppedProjectId, this.type === "active" ? Status.Active : Status.Finished);
        this.element.querySelector("ul").classList.remove("droppable");
    }
    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dropHandler);
        projectInstance.addListener(this._renderProjectList);
    }
    _render() {
        this.element.querySelector("h2").innerText = `${this.type.toUpperCase()} PROJECTS`;
    }
    _renderProjectList(projects) {
        this.assigneProjects = projects.filter((project) => {
            if (this.type === "active") {
                return project.status === Status.Active;
            }
            return project.status === Status.Finished;
        });
        let ulElement = this.element.querySelector(`#${this.type}-projects-list`);
        ulElement.innerHTML = "";
        for (let project of this.assigneProjects) {
            new ProjectItem(this.element.querySelector("ul").id, project);
        }
    }
}
__decorate([
    Auto_Bind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    Auto_Bind
], ProjectList.prototype, "dragLeaveHandler", null);
__decorate([
    Auto_Bind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    Auto_Bind
], ProjectList.prototype, "_renderProjectList", null);
//# sourceMappingURL=projectList.js.map