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

class ProjectInput {
	templateElement: HTMLTemplateElement;
	rootDiv: HTMLDivElement;
	childForm: HTMLFormElement;
	titleInputELement: HTMLInputElement;
	descriptionInputELement: HTMLInputElement;
	peopleInputELement: HTMLInputElement;
	submitButton: HTMLButtonElement;

	constructor() {
		this.templateElement = document.getElementById(
			"project-input"
		)! as HTMLTemplateElement;
		this.rootDiv = document.getElementById("app")! as HTMLDivElement;

		const importedNode = this.templateElement.content;
		this.childForm = importedNode.firstElementChild as HTMLFormElement;
		this.childForm.id = "user-input";

		this.titleInputELement = this.childForm.querySelector(
			"#title"
		) as HTMLInputElement;
		this.descriptionInputELement = this.childForm.querySelector(
			"#description"
		) as HTMLInputElement;
		this.peopleInputELement = this.childForm.querySelector(
			"#people"
		) as HTMLInputElement;
		this.submitButton = this.childForm.querySelector(
			"button"
		) as HTMLButtonElement;
		this.configure();
		this.attachForm();
	}

	@Auto_Bind
	private _submitHandler(e: Event) {
		e.preventDefault();
		console.log(this.titleInputELement.value);
	}

	private configure() {
		this.childForm.addEventListener("click", this._submitHandler);
	}

	private attachForm() {
		this.rootDiv.insertAdjacentElement("afterbegin", this.childForm);
	}
}

const inpt = new ProjectInput();
