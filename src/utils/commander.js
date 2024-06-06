import cloneDeep from "clone-deep"
import { guarantor } from "./guarantor"
import { terminal } from "./terminal"

class Commander {
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

    async execute(command) {
        const command_split = this.#split(command)
        if (command_split.length === 0) {
            return
        }
        const command_object = this.commands[command_split[0]]
        if (command_object === undefined) {
            terminal.log(" ", "  No such command.", "  Try 'help' for assistance.", " ")
        }
        else {
            await command_object.call(command_split.slice(1))
        }
        terminal.finish()
    }

    #split(command) {
        return command.split(/\s+/).filter(Boolean)
    }
}

class Command {
    name
    description
    params = {}
    options = {}

    #action
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
        this.#action = action
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

    async call(params_and_options) {
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
                    terminal.log(" ", "  error: too many parameters", " ")
                    return
                }
                else {
                    const index = this.#param_index[param_count++]
                    const converter = this.#converters[index]
                    args[index] = converter(text)
                }
            }
        }

        try {
            await this.#action(...args)
        }
        catch (error) {
            console.log(error)
            terminal.log("  Uncaught error while execute command.")
            terminal.log("  More details in the console.")
            terminal.log(" ")
        }
    }
}

const converters = {
    "Number": parseInt,
    "Float": parseFloat,
    "String": (value) => value
}

const guarant_description = guarantor({ description: "" })

const commander = new Commander()

export {
    commander as Commander
}
