namespace Interfaces {
	export interface validatable {
		value: string | number;
		required?: boolean;
		minLen?: number;
		maxLen?: number;
		min?: number;
		max?: number;
	}

	export interface Draggable {
		dragStartHandler(event: DragEvent): void;
		dragEndHandler(event: DragEvent): void;
	}

	export interface DargTarget {
		dragOverHandler(event: DragEvent): void;
		dropHandler(event: DragEvent): void;
		dragLeaveHandler(event: DragEvent): void;
	}
}
