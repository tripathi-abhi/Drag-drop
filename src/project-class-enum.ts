namespace Interfaces {
	export enum Status {
		Active,
		Finished,
	}

	// class section

	export class Project {
		constructor(
			public id: string,
			public title: string,
			public description: string,
			public people: number,
			public status: Status
		) {}
	}
}
