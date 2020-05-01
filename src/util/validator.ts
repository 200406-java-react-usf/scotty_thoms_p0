export const isValidId = (id: number): boolean => {
    return (id && typeof id === 'number' && Number.isInteger(id) && id > 0);
}

export function isEmptyObject<T>(obj: T) {
    return obj && Object.keys(obj).length === 0;
}

export const isValidStrings = (...strs: string[]): boolean => {
   
    for (let str of strs) {
        if (!str || typeof str !== 'string') {
            return false;
        }
    }

    return true;

}

export const isValidObject = (obj: Object, ...nullableProps: string[]) => {
    
    return obj && Object.keys(obj).every(key => {
        if (nullableProps.includes(key)) return true;
        return obj[key];
    });

}

export default {
    isValidId,
    isValidStrings,
    isValidObject
}