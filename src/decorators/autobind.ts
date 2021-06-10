namespace Interfaces {
	export function Auto_Bind(
		_: any,
		__: string,
		methodDescriptor: PropertyDescriptor
	): PropertyDescriptor {
		let originalMethod = methodDescriptor.value;
		return {
			configurable: methodDescriptor.configurable,
			enumerable: methodDescriptor.enumerable,
			get() {
				return originalMethod.bind(this);
			},
		};
	}
}
