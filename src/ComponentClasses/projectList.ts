import { Auto_Bind } from "../decorators/autobind.js";
import { DargTarget } from "../Interfaces/dragAndDrop.js";
import { Project, Status } from "../Interfaces/project-class-enum.js";
import { projectInstance } from "../state/project-state.js";
import { ComponentBase } from "./baseComponent.js";
import { ProjectItem } from "./projectItem.js";

export class ProjectList
	extends ComponentBase<HTMLDivElement, HTMLElement>
	implements DargTarget
{
	assigneProjects: Project[] = [];
	constructor(private type: "active" | "finished") {
		super("project-list", "app", false, `${type}-projects`);
		this.element.querySelector("ul")!.id = `${this.type}-projects-list`;
		this.configure();
		this._render();
	}

	@Auto_Bind
	dragOverHandler(event: DragEvent) {
		if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
			event.preventDefault();
			let ulEL = this.element.querySelector("ul")!;
			ulEL.classList.add("droppable");
		}
	}
	@Auto_Bind
	dragLeaveHandler(_: DragEvent) {
		let ulEL = this.element.querySelector("ul")!;
		ulEL.classList.remove("droppable");
	}
	@Auto_Bind
	dropHandler(event: DragEvent) {
		let droppedProjectId = event.dataTransfer!.getData("text/plain");
		projectInstance.moveProject(
			droppedProjectId,
			this.type === "active" ? Status.Active : Status.Finished
		);
		this.element.querySelector("ul")!.classList.remove("droppable");
	}

	// public

	configure() {
		this.element.addEventListener("dragover", this.dragOverHandler);
		this.element.addEventListener("dragleave", this.dragLeaveHandler);
		this.element.addEventListener("drop", this.dropHandler);
		projectInstance.addListener(this._renderProjectList);
	}

	_render() {
		this.element.querySelector(
			"h2"
		)!.innerText = `${this.type.toUpperCase()} PROJECTS`;
	}

	// private

	@Auto_Bind
	private _renderProjectList(projects: Project[]) {
		this.assigneProjects = projects.filter((project: Project) => {
			if (this.type === "active") {
				return project.status === Status.Active;
			}
			return project.status === Status.Finished;
		});
		let ulElement = this.element.querySelector(
			`#${this.type}-projects-list`
		)! as HTMLUListElement;
		ulElement.innerHTML = "";
		for (let project of this.assigneProjects) {
			new ProjectItem(this.element.querySelector("ul")!.id, project);
		}
	}
}
