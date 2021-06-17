import { Auto_Bind } from "../decorators/autobind";
import { Draggable } from "../Interfaces/dragAndDrop";
import { Project } from "../Interfaces/project-class-enum";
import { ComponentBase } from "./baseComponent";

export class ProjectItem
	extends ComponentBase<HTMLUListElement, HTMLLIElement>
	implements Draggable
{
	private project: Project;

	get assignedPersonsCount() {
		let personCount = this.project.people;
		if (personCount === 1) {
			return `${personCount} person assigned`;
		}
		return `${personCount} persons assigned`;
	}

	constructor(rootId: string, project: Project) {
		super("single-project", rootId, false, project.id);
		this.project = project;
		this.configure();
		this._render();
	}

	@Auto_Bind
	dragStartHandler(event: DragEvent) {
		event.dataTransfer!.setData("text/plain", this.project.id);
		event.dataTransfer!.effectAllowed = "move";
	}

	dragEndHandler(_: DragEvent) {}

	configure() {
		this.element.addEventListener("dragstart", this.dragStartHandler);
		this.element.addEventListener("dragend", this.dragEndHandler);
	}
	_render() {
		this.element.draggable = true;
		this.element.querySelector("h2")!.innerText = this.project.title;
		this.element.querySelector("h3")!.innerText = this.assignedPersonsCount;
		this.element.querySelector("p")!.innerText = this.project.description;
	}
}
