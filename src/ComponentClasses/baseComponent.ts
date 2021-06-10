export abstract class ComponentBase<
	T extends HTMLElement,
	U extends HTMLElement
> {
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
