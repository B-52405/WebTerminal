import { Commander, terminal } from "../index"
import { is_non_empty_object } from "../utils/checker"

const type_padding = 20
const description_padding = 30

Commander
    .Command("help")
    .Description("Provide help information for commands.")
    .Param({ name: "command", type: "String", description: "Name of the command." })
    .Action((command_name) => {
        const result = [""]

        if (command_name === undefined) {
            result.push("Commands:")
            for (const name in Commander.commands) {
                const command = Commander.commands[name]
                let line = `  ${command.name}`
                line += " ".repeat(description_padding - line.length) + command.description
                result.push(line)
            }
            result.push("")
            terminal.log(...result)
            return
        }

        if (!(command_name in Commander.commands)) {
            result.push("  No such command.", "")
            terminal.log(...result)
            return
        }

        const command = Commander.commands[command_name]
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
                line += " " + " ".repeat(type_padding - line.length - 1) + param.type
                line += " " + " ".repeat(description_padding - line.length - 1) + param.description
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
        terminal.log(...result)
    })
