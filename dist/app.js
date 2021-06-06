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
var Status;
(function (Status) {
    Status[Status["Active"] = 0] = "Active";
    Status[Status["Finished"] = 1] = "Finished";
})(Status || (Status = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class SingleState extends State {
    constructor() {
        super();
        this.projectList = [];
    }
    static getProjectList() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new SingleState();
        return this.instance;
    }
    addProject(title, description, people) {
        const newProject = new Project(Math.random.toString(), title, description, people, Status.Active);
        this.projectList.push(newProject);
        for (let listener of this.listeners) {
            listener(this.projectList.slice());
        }
    }
}
const projectInstance = SingleState.getProjectList();
class ComponentBase {
    constructor(templateId, rootId, insertAtStart, elementId) {
        this.templateElement = document.getElementById(templateId);
        this.rootElement = document.getElementById(rootId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (elementId) {
            this.element.id = elementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtStart) {
        this.rootElement.insertAdjacentElement(insertAtStart ? "afterbegin" : "beforeend", this.element);
    }
}
class ProjectList extends ComponentBase {
    constructor(type) {
        super("project-list", "app", false, `${type}-projects`);
        this.type = type;
        this.assigneProjects = [];
        this.element.querySelector("ul").id = `${this.type}-projects-list`;
        projectInstance.addListener(this._renderProjectList);
        this._render();
    }
    configure() { }
    _render() {
        this.element.querySelector("h2").innerText = `${this.type.toUpperCase()} PROJECTS`;
    }
    _renderProjectList(projects) {
        this.assigneProjects = projects.filter((project) => {
            if (this.type === "active") {
                return project.status === Status.Active;
            }
            return project.status === Status.Finished;
        });
        let ulElement = this.element.querySelector(`#${this.type}-projects-list`);
        ulElement.innerHTML = "";
        for (let project of this.assigneProjects) {
            let listEL = document.createElement("li");
            listEL.innerText = project.title;
            ulElement.appendChild(listEL);
        }
    }
}
__decorate([
    Auto_Bind
], ProjectList.prototype, "_renderProjectList", null);
class ProjectInput extends ComponentBase {
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
const inpt = new ProjectInput();
const activeList = new ProjectList("active");
const finishedList = new ProjectList("finished");
//# sourceMappingURL=app.js.map