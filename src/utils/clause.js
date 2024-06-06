import cloneDeep from "clone-deep"
import { COLORS } from "./statics"

class Clause {
    text = ""
    cls = []
    style = {}
    click = undefined

    constructor() {
        if (arguments.length > 0) {
            this.text = arguments[0]
        }
        if (arguments.length > 1) {
            this.cls = arguments[1]
        }
        if (arguments.length > 2) {
            this.style = arguments[2]
        }
        this.click = arguments[3]
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
        if (this.click === undefined) {
            if (this.style["cursor"] === "pointer") {
                delete this.style["cursor"]
            }
        }
        else {
            this.style["cursor"] = "pointer"
        }
        return this
    }

    get length() {
        return this.text.length
    }

    copy() {
        return new Clause(
            this.text,
            cloneDeep(this.cls),
            cloneDeep(this.style),
            this.click)
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

    Button(action) {
        this.style["color"] = COLORS.BUTTON
        this.style["cursor"] = "pointer"
        this.click = action
        return this
    }

    Warning() {
        this.style["color"] = COLORS.WARNING
        return this
    }

    Error() {
        this.style["color"] = COLORS.ERROR
        return this
    }
}

export {
    Clause
}
