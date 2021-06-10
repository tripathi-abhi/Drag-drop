export function Auto_Bind(_, __, methodDescriptor) {
    let originalMethod = methodDescriptor.value;
    return {
        configurable: methodDescriptor.configurable,
        enumerable: methodDescriptor.enumerable,
        get() {
            return originalMethod.bind(this);
        },
    };
}
//# sourceMappingURL=autobind.js.map