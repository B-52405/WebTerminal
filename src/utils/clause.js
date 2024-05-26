import cloneDeep from "clone-deep"
import { COLORS } from "./statics.js"

class Clause {
    text = ""
    cls = []
    style = {}
    click = undefined

    constructor() {
        if (arguments.length > 0) {
            this.text = arguments[0]
        }
    }

    Text(text) {
        this.text = text
        return this
    }

    Clss(clss) {
        this.cls = clss
        return this
    }

    Cls(cls) {
        this.cls.push(cls)
        return this
    }

    Style(style) {
        this.style = style
        return this
    }

    Property(property, value) {
        this.style[property] = value
        return this
    }

    Click(click) {
        this.click = click
        return this
    }

    get length() {
        return this.text.length
    }

    copy() {
        return new Clause()
            .Text(this.text)
            .Clss(cloneDeep(this.cls))
            .Style(cloneDeep(this.style))
            .Click(this.click)
    }

    slice(begin, end) {
        if (begin === undefined) {
            begin = 0
        }
        if (end === undefined) {
            end = this.length
        }
        const result = this.copy()
        result.text = result.text.slice(begin, end)
        return result
    }

    warning(text) {
        this.text = text
        this.style = { color: COLORS.ORANGR }
        return this
    }

    error(text) {
        this.text = text
        this.style = { color: COLORS.RED }
        return this
    }

    red() {
        this.style["color"] = COLORS.RED
    }
}

function clause() {
    if (arguments.length === 0) {
        return new Clause()
    }
    return new Clause().Text(arguments[0])
}

export {
    clause as Clause
}
