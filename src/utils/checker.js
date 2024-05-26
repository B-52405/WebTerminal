function is_empty_array(value) {
    return Array.isArray(value) && value.length === 0
}

function is_non_empty_array(value) {
    return Array.isArray(value) && value.length > 0
}

function is_empty_object(value) {
    return typeof value === 'object' && Object.keys(value).length === 0
}

function is_non_empty_object(value) {
    return typeof value === 'object' && Object.keys(value).length > 0
}

function is_empty(value) {
    return value === undefined || is_empty_array(value) || is_empty_object(value)
}

function is_iterable(value) {
    if (value == undefined) return false
    return typeof value.forEach === "function"
}

function is_generator(value) {
    if (value == null) return false
    if (typeof value !== 'object' && typeof value !== 'function') return false
    if (typeof value.next !== 'function') return false
    if (typeof value[Symbol.iterator] !== 'function') return false
    return value[Symbol.iterator]() === value
}

export {
    is_empty_array,
    is_non_empty_array,
    is_empty_object,
    is_non_empty_object,
    is_empty,
    is_iterable,
    is_generator
}
