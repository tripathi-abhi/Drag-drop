// Interfaces Section
interface validatable {
	value: string | number;
	required?: boolean;
	minLen?: number;
	maxLen?: number;
	min?: number;
	max?: number;
}

// functions an decorators section

function validator(validatableInp: validatable): boolean {
	if (validatableInp.required) {
		if (validatableInp.value.toString().trim().length === 0) return false;
		if (validatableInp.value.toString().trim().length === 0) return false;
	}
	if (validatableInp.minLen) {
		if (validatableInp.value.toString().trim().length < validatableInp.minLen)
			return false;
	}
	if (validatableInp.maxLen) {
		if (validatableInp.value.toString().trim().length > validatableInp.maxLen)
			return false;
	}
	if (validatableInp.min) {
		if (validatableInp.value < validatableInp.min) return false;
	}
	if (validatableInp.max) {
		if (validatableInp.value > validatableInp.max) return false;
	}
	return true;
}

function Auto_Bind(
	_: any,
	__: string,
	methodDescriptor: PropertyDescriptor
): PropertyDescriptor {
	let originalMethod = methodDescriptor.value;
	return {
		configurable: methodDescriptor.configurable,
		enumerable: methodDescriptor.enumerable,
		get() {
			return originalMethod.bind(this);
		},
	};
}

enum Status {
	Active,
	Finished,
}

// class section

class Project {
	constructor(
		public id: string,
		public title: string,
		public description: string,
		public people: number,
		public status: Status
	) {}
}

type Listener<T> = (items: T[]) => void;

class State<T> {
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
			Math.random.toString(),
			title,
			description,
			people,
			Status.Active
		);
		this.projectList.push(newProject);
		for (let listener of this.listeners) {
			listener(this.projectList.slice());
		}
	}
}

const projectInstance = SingleState.getProjectList();

abstract class ComponentBase<T extends HTMLElement, U extends HTMLElement> {
	templateElement: HTMLTemplateElement;
	rootElement: T;
	element: U;
	constructor(
		templateId: string,
		rootId: string,
		insertAtStart: boolean,
		elementId?: string
	) {
		this.templateElement = document.getElementById(
			templateId
		)! as HTMLTemplateElement;
		this.rootElement = document.getElementById(rootId) as T;
		const importedNode = document.importNode(
			this.templateElement.content,
			true
		);
		this.element = importedNode.firstElementChild as U;
		if (elementId) {
			this.element.id = elementId;
		}
		this.attach(insertAtStart);
	}

	protected attach(insertAtStart: boolean) {
		this.rootElement.insertAdjacentElement(
			insertAtStart ? "afterbegin" : "beforeend",
			this.element
		);
	}

	abstract configure(): void;
	abstract _render(): void;
}

// Project List Class
class ProjectList extends ComponentBase<HTMLDivElement, HTMLElement> {
	assigneProjects: Project[] = [];
	constructor(private type: "active" | "finished") {
		super("project-list", "app", false, `${type}-projects`);
		this.element.querySelector("ul")!.id = `${this.type}-projects-list`;
		projectInstance.addListener(this._renderProjectList);
		this._render();
	}

	// public

	configure() {}

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
			let listEL = document.createElement("li");
			listEL.innerText = project.title;
			ulElement.appendChild(listEL);
		}
	}
}

// Project Input Class
class ProjectInput extends ComponentBase<HTMLDivElement, HTMLFormElement> {
	titleInputELement: HTMLInputElement;
	descriptionInputELement: HTMLInputElement;
	peopleInputELement: HTMLInputElement;
	submitButton: HTMLButtonElement;

	constructor() {
		super("project-input", "app", true, "user-input");
		this.titleInputELement = this.element.querySelector(
			"#title"
		) as HTMLInputElement;
		this.descriptionInputELement = this.element.querySelector(
			"#description"
		) as HTMLInputElement;
		this.peopleInputELement = this.element.querySelector(
			"#people"
		) as HTMLInputElement;
		this.submitButton = this.element.querySelector(
			"button"
		) as HTMLButtonElement;
		this.configure();
	}

	// public

	configure() {
		this.element.addEventListener("submit", this._submitHandler);
	}

	_render() {}

	// private

	private gatherUserInput(): [string, string, number] | void {
		let enteredTitle = this.titleInputELement.value;
		let enteredDescription = this.descriptionInputELement.value;
		let enteredPeople = this.peopleInputELement.value;

		const titleValidatble: validatable = {
			value: enteredTitle,
			required: true,
		};

		const descValidatable: validatable = {
			value: enteredDescription,
			required: true,
			minLen: 5,
		};

		const peopleValidatable: validatable = {
			value: enteredPeople,
			required: true,
			min: 1,
			max: 7,
		};

		if (
			!validator(titleValidatble) ||
			!validator(descValidatable) ||
			!validator(peopleValidatable)
		) {
			alert("Invalid input, please try again");
			return;
		}
		return [enteredTitle, enteredDescription, +enteredPeople];
	}

	private clearInput() {
		this.titleInputELement.value = "";
		this.descriptionInputELement.value = "";
		this.peopleInputELement.value = "";
	}

	@Auto_Bind
	private _submitHandler(e: Event) {
		e.preventDefault();
		const userInput = this.gatherUserInput();
		if (Array.isArray(userInput)) {
			const [title, desc, people] = userInput;
			projectInstance.addProject(title, desc, people);
		}
		this.clearInput();
	}
}

const inpt = new ProjectInput();
const activeList = new ProjectList("active");
const finishedList = new ProjectList("finished");
