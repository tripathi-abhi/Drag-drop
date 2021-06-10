import { Project } from "../Interfaces/project-class-enum.js";
import { Status } from "../Interfaces/project-class-enum.js";
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
        const newProject = new Project(Math.random().toString(), title, description, people, Status.Active);
        this.projectList.push(newProject);
        this.triggerListeners();
    }
    moveProject(id, status) {
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
//# sourceMappingURL=project-state.js.map