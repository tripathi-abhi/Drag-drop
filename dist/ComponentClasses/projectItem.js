var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Auto_Bind } from "../decorators/autobind.js";
import { ComponentBase } from "./baseComponent.js";
export class ProjectItem extends ComponentBase {
    constructor(rootId, project) {
        super("single-project", rootId, false, project.id);
        this.project = project;
        this.configure();
        this._render();
    }
    get assignedPersonsCount() {
        let personCount = this.project.people;
        if (personCount === 1) {
            return `${personCount} person assigned`;
        }
        return `${personCount} persons assigned`;
    }
    dragStartHandler(event) {
        event.dataTransfer.setData("text/plain", this.project.id);
        event.dataTransfer.effectAllowed = "move";
    }
    dragEndHandler(_) { }
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }
    _render() {
        this.element.draggable = true;
        this.element.querySelector("h2").innerText = this.project.title;
        this.element.querySelector("h3").innerText = this.assignedPersonsCount;
        this.element.querySelector("p").innerText = this.project.description;
    }
}
__decorate([
    Auto_Bind
], ProjectItem.prototype, "dragStartHandler", null);
//# sourceMappingURL=projectItem.js.map