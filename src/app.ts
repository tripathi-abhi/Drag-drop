interface validatable {
	value: string | number;
	required?: boolean;
	minLen?: number;
	maxLen?: number;
	min?: number;
	max?: number;
}

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
			console.log(title, desc, people);
		}
		this.clearInput();
	}

	private configure() {
		this.childForm.addEventListener("submit", this._submitHandler);
	}

	private attachForm() {
		this.rootDiv.insertAdjacentElement("afterbegin", this.childForm);
	}
}

const inpt = new ProjectInput();
