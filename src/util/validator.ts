/*
    All validators are in one class for ease of access and reusability.
*/

/**
 * Checks to see if the id sent is valid: needs to be both truthy, an integer and a positive number.
 * @param id {number} The ID to be checked if it is valid.
 */
export const isValidId = (id: number): boolean => {
    if (id && typeof id === 'number' && Number.isInteger(id) && id > 0) return true;
    return false;
}
/**
 * Checks to see if object is empty
 * @param obj {Object} object being checked
 */
export function isEmptyObject<T>(obj: T) {
    return obj && Object.keys(obj).length === 0;
}

/**
 * Checks to see if the given param(s) are ALL of type string && truthy
 * @param strs {...strs} strings being checked
 */
export const isValidStrings = (...strs: string[]): boolean => {
   
    for (let str of strs) {
        if (!str || typeof str !== 'string') {
            return false;
        }
    }

    return true;

}

/**
 * Will check to see if the given object is valid -- every key is truthy
 * @param obj {Object} the object being checked
 * @param nullableProps {...string} values you want this function to ignore
 */
export const isValidObject = (obj: Object, ...nullableProps: string[]) => {
    
    return obj && Object.keys(obj).every(key => {
        if (nullableProps.includes(key)) return true;
        return obj[key];
    });

}

/**
 * Checks to see if property is a part of the keys in the object type you send.
 * @param prop {string} Property you want to check
 * @param type {any} Object type you want to check
 */
export const isPropertyOf = (prop: string, type: any) => {

    if (!prop || !type) {
        return false;
    }

    let typeCreator = <T>(Type: (new () => T)): T => {
        return new Type();
    } 

    let tempInstance;
    try {
        tempInstance = typeCreator(type);
    } catch {
        return false;
    }
    
    return Object.keys(tempInstance).includes(prop);

}

export default {
    isValidId,
    isValidStrings,
    isValidObject,
    isPropertyOf
}