import { Project } from "../Interfaces/project-class-enum.js";
import { Status } from "../Interfaces/project-class-enum.js";

type Listener<T> = (items: T[]) => void;
abstract class State<T> {
	protected listeners: Listener<T>[] = [];
	addListener(listenerFn: Listener<T>) {
		this.listeners.push(listenerFn);
	}
}
class SingleState extends State<Project> {
	private projectList: Project[] = [];
	private static instance: any;

	private constructor() {
		super();
	}

	static getProjectList() {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new SingleState();
		return this.instance;
	}

	addProject(title: string, description: string, people: number) {
		const newProject = new Project(
			Math.random().toString(),
			title,
			description,
			people,
			Status.Active
		);
		this.projectList.push(newProject);
		this.triggerListeners();
	}

	moveProject(id: string, status: Status) {
		let projectMoved = this.projectList.find(project => project.id === id);
		if (projectMoved && projectMoved.status !== status) {
			projectMoved.status = status;
			this.triggerListeners();
		}
	}

	triggerListeners() {
		for (let listener of this.listeners) {
			listener(this.projectList.slice());
		}
	}
}

export const projectInstance = SingleState.getProjectList();
