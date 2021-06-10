var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ComponentBase } from "../ComponentClasses/baseComponent.js";
import { validator } from "../validation/input-validation.js";
import { Auto_Bind } from "../decorators/autobind.js";
import { projectInstance } from "../state/project-state.js";
export class ProjectInput extends ComponentBase {
    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleInputELement = this.element.querySelector("#title");
        this.descriptionInputELement = this.element.querySelector("#description");
        this.peopleInputELement = this.element.querySelector("#people");
        this.submitButton = this.element.querySelector("button");
        this.configure();
    }
    configure() {
        this.element.addEventListener("submit", this._submitHandler);
    }
    _render() { }
    gatherUserInput() {
        let enteredTitle = this.titleInputELement.value;
        let enteredDescription = this.descriptionInputELement.value;
        let enteredPeople = this.peopleInputELement.value;
        const titleValidatble = {
            value: enteredTitle,
            required: true,
        };
        const descValidatable = {
            value: enteredDescription,
            required: true,
            minLen: 5,
        };
        const peopleValidatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 7,
        };
        if (!validator(titleValidatble) ||
            !validator(descValidatable) ||
            !validator(peopleValidatable)) {
            alert("Invalid input, please try again");
            return;
        }
        return [enteredTitle, enteredDescription, +enteredPeople];
    }
    clearInput() {
        this.titleInputELement.value = "";
        this.descriptionInputELement.value = "";
        this.peopleInputELement.value = "";
    }
    _submitHandler(e) {
        e.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectInstance.addProject(title, desc, people);
        }
        this.clearInput();
    }
}
__decorate([
    Auto_Bind
], ProjectInput.prototype, "_submitHandler", null);
//# sourceMappingURL=projectInput.js.map