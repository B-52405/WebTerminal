import cloneDeep from "clone-deep"

function guarantor(setting) {
    return function (obj) {
        for (const entry in setting) {
            if (obj[entry] === undefined) {
                obj[entry] = cloneDeep(setting[entry])
            }
        }
    }
}

function guarantor_shallow(setting) {
    return function (obj) {
        for (const entry in setting) {
            if (obj[entry] === undefined) {
                obj[entry] = setting[entry]
            }
        }
    }
}

export {
    guarantor,
    guarantor_shallow
}
