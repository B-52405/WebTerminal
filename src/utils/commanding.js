import cloneDeep from "clone-deep"
import { logger, logger_line, logger_sync } from "./logger.js"
import { is_generator, is_non_empty_array, is_non_empty_object } from "./checker.js"
import { guarantor } from "./guarantor.js"

class Commanding {
    commands = {}

    Command(command_name) {
        const command = new Command(command_name)
        this.commands[command_name.toLowerCase()] = command
        return command
    }

    Remove(command_name) {
        delete this.commands[command_name]
    }

    complete(command) {
        if (this.#split(command).length !== 1) {
            return []
        }
        else {
            const commands = []
            const command_lower_case = command.toLowerCase()
            for (let command_name in this.commands) {
                if (command_name.startsWith(command_lower_case)) {
                    commands.push(this.commands[command_name].name)
                }
            }
            return commands.sort()
        }
    }

    execute(command) {
        const command_split = this.#split(command)
        if (command_split.length === 0) {
            return
        }
        const command_object = this.commands[command_split[0]]
        if (command_object === undefined) {
            logger_sync(["", "  No such command.", "  Try 'help' for assistance.", ""])
            return
        }
        command_object.call(command_split.slice(1))
    }

    help(command_name) {
        if (command_name === undefined) {
            const result = ["", "Commands:"]
            for (const name in this.commands) {
                const command = this.commands[name]
                let line = `  ${command.name}`
                line += " ".repeat(description_padding - line.length) + command.description
                result.push(line)
            }
            result.push("")
            return result
        }
        if (!(command_name in this.commands)) {
            return ["", "  No such command.", ""]
        }
        const result = [""]
        const command = this.commands[command_name]
        if (command.description !== undefined) {
            result.push("Description:")
            result.push(`  ${command.description}`)
            result.push("")
        }
        if (is_non_empty_object(command.params)) {
            result.push("Params:")
            for (const name in command.params) {
                const param = command.params[name]
                let line = `  ${param.name}`
                line += " ".repeat(type_padding - line.length) + param.type
                line += " ".repeat(description_padding - line.length) + param.description
                if (param.default !== undefined) {
                    line += `(default: ${JSON.stringify(param.default)})`
                }
                result.push(line)
            }
            result.push("")
        }
        if (is_non_empty_object(command.options)) {
            result.push("Options:")
            for (const name in command.options) {
                const option = command.options[name]
                let line = "  "
                if ("short" in option) {
                    line += `-${option.short}, `
                }
                line += `--${option.name}`
                line += " ".repeat(type_padding - line.length) + option.type
                line += " ".repeat(description_padding - line.length) + option.description
                if (option.default !== undefined) {
                    line += `(default: ${JSON.stringify(option.default)})`
                }
                result.push(line)
            }
            result.push("")
        }
        if (result.length === 0) {
            result.push("No description, no parama, no options, nothing.")
            result.push("")
        }
        return result
    }

    #split(command) {
        return command.split(/\s+/).filter(Boolean)
    }
}

class Command {
    name
    action
    description
    params = {}
    options = {}
    #param_index = []
    #option_index = {}
    #boolean_option = []
    #converters = []
    #default_args = []
    #param_option_count = 0

    constructor() {
        if (arguments.length > 0) {
            this.name = arguments[0]
        }
    }

    Name(name) {
        this.name = name
        return this
    }

    Action(action) {
        this.action = action
        return this
    }

    Description(description) {
        this.description = description
        return this
    }

    Param(param_data) {
        guarant_description(param_data)
        const name = param_data.name.replace(/\s+/g, '')
        this.params[name] = param_data
        this.#param_index.push(this.#param_option_count)
        this.#boolean_option.push(undefined)
        this.#converters.push(converters[param_data.type])
        this.#default_args.push(param_data.default)
        this.#param_option_count += 1
        return this
    }

    Option(option_data) {
        const name = option_data.name.replace(/\s+/g, '')
        guarant_description(option_data)
        this.options[name] = option_data
        this.#option_index["--" + option_data.name] = this.#param_option_count
        if ("short" in option_data) {
            this.#option_index["-" + option_data.short] = this.#param_option_count
        }
        if (option_data.type === "Boolean") {
            this.#default_args.push(false)
            this.#boolean_option.push(true)
        }
        else {
            this.#default_args.push(option_data.default)
            this.#boolean_option.push(false)
        }
        this.#converters.push(converters[option_data.type])
        this.#param_option_count += 1
        return this
    }

    call(params_and_options) {
        const args = cloneDeep(this.#default_args)

        let param_count = 0
        params_and_options.push(undefined)
        for (let i = 0; i < params_and_options.length - 1; i++) {
            const text = params_and_options[i]
            if (text in this.#option_index) {
                const index = this.#option_index[text]
                const converter = this.#converters[index]
                if (this.#boolean_option[index]) {
                    args[index] = true
                }
                else {
                    args[index] = converter(params_and_options[++i])
                }
            }
            else {
                if (param_count === this.#param_index.length) {
                    logger_line("error: too many parameters")
                    return
                }
                else {
                    const index = this.#param_index[param_count++]
                    const converter = this.#converters[index]
                    args[index] = converter(text)
                }
            }
        }

        //允许用户程序的输出是以下任意一种：
        //1. 返回string的生成器返回值
        //2. 非空string数组
        //3. string
        const result = this.action(...args)
        if (is_generator(result)) {
            logger(result)
        }
        else if (is_non_empty_array(result)) {
            logger_sync(result)
        }
        else if (typeof result === "string") {
            logger_line(result)
        }
    }
}

const type_padding = 18
const description_padding = 28

const converters = {
    "Number": parseInt,
    "Float": parseFloat,
    "String": (value) => value
}

const guarant_description = guarantor({ description: "" })

const commanding = new Commanding()

export {
    commanding
}
