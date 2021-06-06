"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validator(validatableInp) {
    if (validatableInp.required) {
        if (validatableInp.value.toString().trim().length === 0)
            return false;
        if (validatableInp.value.toString().trim().length === 0)
            return false;
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
        if (validatableInp.value < validatableInp.min)
            return false;
    }
    if (validatableInp.max) {
        if (validatableInp.value > validatableInp.max)
            return false;
    }
    return true;
}
function Auto_Bind(_, __, methodDescriptor) {
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
    constructor() {
        this.templateElement = document.getElementById("project-input");
        this.rootDiv = document.getElementById("app");
        const importedNode = this.templateElement.content;
        this.childForm = importedNode.firstElementChild;
        this.childForm.id = "user-input";
        this.titleInputELement = this.childForm.querySelector("#title");
        this.descriptionInputELement = this.childForm.querySelector("#description");
        this.peopleInputELement = this.childForm.querySelector("#people");
        this.submitButton = this.childForm.querySelector("button");
        this.configure();
        this.attachForm();
    }
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
            console.log(title, desc, people);
        }
        this.clearInput();
    }
    configure() {
        this.childForm.addEventListener("submit", this._submitHandler);
    }
    attachForm() {
        this.rootDiv.insertAdjacentElement("afterbegin", this.childForm);
    }
}
__decorate([
    Auto_Bind
], ProjectInput.prototype, "_submitHandler", null);
const inpt = new ProjectInput();
//# sourceMappingURL=app.js.map