namespace Interfaces {
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
