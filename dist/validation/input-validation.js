export function validator(validatableInp) {
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
//# sourceMappingURL=input-validation.js.map