// util

export function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

export function isArray(v) {
    if (Array.isArray) return Array.isArray(v);
    return Object.prototype.toString.call(v) === '[object Array]';
}

export function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * @description 返回一个 object 副本
 */
export function pick(obj, ...keys) {
    let copy = {};
    keys.forEach(key => {
        if (key in obj) {
            copy[key] = obj[key];
        }
    })
    return copy;
}
