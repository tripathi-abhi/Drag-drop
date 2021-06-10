export class ComponentBase {
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
//# sourceMappingURL=baseComponent.js.map