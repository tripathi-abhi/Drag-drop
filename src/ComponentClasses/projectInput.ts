import { ComponentBase } from "../ComponentClasses/baseComponent";
import { validatable, validator } from "../validation/input-validation";
import { Auto_Bind } from "../decorators/autobind";
import { projectInstance } from "../state/project-state";

export class ProjectInput extends ComponentBase<
	HTMLDivElement,
	HTMLFormElement
> {
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
