<script>
import LogLine from "./LogLine.vue"
import { Clause } from "../utils/clause"
import { Commander } from "../utils/commander"
import { is_non_empty_array } from "../utils/checker"
import { COLORS, CHAR_WIDTH } from "../utils/statics"
import { terminal } from "../utils/terminal"

export default {
    expose: [
        "enter"
    ],
    components: {
        LogLine
    },
    data() {
        return {
            logging: false,
            log_lines: [],
            log_buffer: [],
            log_resolvers: [],
            inputting: false,
            input_prompt: "",
            input_visibility: true,
            input_resolver: () => undefined,
            input_resolvers: [],
            cursor_index: 0,
            command: "",
            command_history: [],
            command_history_index: -1,
            complete_command: [],
            complete_index: -1,
            logout_interval: undefined,
            setting: {
                prompt: "WebTerminal> ",
                prompt_visibility: true,
                background_color: COLORS.GRAY,
                font_color: COLORS.WHITE,
                logging_interval: 24,
                timeout: 300000
            },

            terminal_width: undefined,
            terminal_height: undefined,
            terminal_line_length: undefined
        }
    },
    methods: {
        to_log_line(line) {
            if (is_non_empty_array(line)) {
                const result = []
                line.forEach(clause => {
                    if (clause instanceof Clause) {
                        result.push(clause)
                    }
                    else if (typeof clause === "string") {
                        result.push(new Clause(clause))
                    }
                    else {
                        result.push(new Clause(JSON.stringify(clause)))
                    }
                })
                return result
            }
            else if (typeof line === "string") {
                return [new Clause(line)]
            }
            else {
                return [new Clause(JSON.stringify(line))]
            }
        },
        log_to_buffer() {
            if (this.logging) {
                for (const line of arguments) {
                    this.log_buffer.push(this.to_log_line(line))
                }
            }
        },
        buffer_to_log() {
            if (this.log_buffer.length > 0) {
                this.log_lines.push(this.log_buffer.shift())
                this.scroll_to_bottom
                setTimeout(this.buffer_to_log, this.setting.logging_interval)
            }
            else {
                while (this.log_resolvers.length > 0) {
                    this.log_resolvers.shift()()
                }
                setTimeout(this.buffer_to_log)
            }
        },
        async await_logging() {
            await new Promise(resolver => {
                this.log_resolvers.push(resolver)
            })
        },
        async await_inputting() {
            if (this.inputting){
                await new Promise(resolver => {
                    this.input_resolvers.push(resolver)
                })
            }
        },
        async logging_finish() {
            await this.await_logging()
            await this.await_inputting()

            this.logging = false
            this.scroll_to_bottom()
        },
        enter() {
            if (this.logging) {
                if (!this.inputting) {
                    return
                }

                //inputting
                terminal.log(this.input_line)
                this.input_resolver(this.command)
                this.inputting = false
                this.input_prompt = ""
                this.input_resolver = () => undefined
                while (this.input_resolvers.length > 0) {
                    this.input_resolvers.shift()()
                }
                this.$nextTick(this.reset_inputting_state)
            }
            else {
                this.logging = true
                terminal.log(this.command_line)
                this.command_history.unshift(this.command)
                Commander.execute(this.command)
                this.$nextTick(this.reset_inputting_state)
            }
        },
        async input(prompt, hidden) {
            await this.await_logging()
            this.inputting = true
            this.input_prompt = prompt
            this.input_visibility = !hidden

            this.reset_inputting_state()
            this.$nextTick(this.scroll_to_bottom)

            return await new Promise(resolver => {
                this.input_resolver = resolver
            })
        },
        clear() {
            this.log_lines = []
            this.log_buffer = []
            this.reset_inputting_state()
        },
        history(event) {
            if (event.key === "ArrowUp") {
                if (this.command_history_index < this.command_history.length - 1) {
                    this.command_history_index++
                    this.command = this.command_history[this.command_history_index]
                }
                this.cursor_to_end()
            }
            else if (event.key === "ArrowDown") {
                if (this.command_history_index > 0) {
                    this.command_history_index--
                    this.command = this.command_history[this.command_history_index]
                }
                else if (this.command_history_index === 0) {
                    this.command_history_index--
                    this.command = ""
                }
                this.cursor_to_end()
            }
        },
        tab() {
            if (this.logging || this.inputting) {
                return
            }

            if (this.complete_index === -1) {
                this.complete_command = Commander.complete(this.command)
            }
            if (this.complete_command.length === 0) {
                return
            }
            this.complete_index = (this.complete_index + 1) % this.complete_command.length
            this.command = this.complete_command[this.complete_index]

            this.cursor_to_end()
        },
        cursor_to_end() {
            setTimeout(() => {
                this.$refs.terminal_input.setSelectionRange(this.command.length, this.command.length)
                this.cursor_index = 0
            })
        },
        reset_inputting_state() {
            this.command = ""
            this.cursor_index = 0
            this.command_history_index = -1
            this.complete_index = -1
        },
        keydown(event) {
            this.reset_timeout()
            if (event.key !== "Tab") {
                this.complete_command = []
                this.complete_index = -1
            }
        },
        update_cursor_index(event) {
            const terminal_input = event.target
            //根据我不了解的原理,此处不能使用this.$nextTick
            setTimeout(() => {
                this.cursor_index = terminal_input.value.length - terminal_input.selectionEnd
            })
        },
        scroll_to_bottom() {
            setTimeout(() => {
                this.$refs.terminal_window.scrollTop = this.$refs.terminal_window.scrollHeight
            })
        },
        focus(event) {
            //允许Ctrl+C
            if (event) {
                if (event.key === "Control") {
                    return
                }
                if (event.ctrlKey && event.key === "c") {
                    return
                }
            }

            this.reset_timeout()
            this.$nextTick(() => {
                this.$refs.terminal_input.focus()
            })
        },
        reset_timeout() {
            clearInterval(this.logout_interval)
            this.logout_interval = setInterval(() => {
                location.reload()
            }, terminal.setting.timeout)
        }
    },
    watch: {
        "setting.background_color": function (new_value) {
            const container = this.$el.parentElement
            Object.assign(container.style, {
                "background-color": new_value
            })
        },
        "setting.font_color": function (new_value) {
            const container = this.$el.parentElement
            Object.assign(container.style, {
                "color": new_value
            })
        }
    },
    computed: {
        command_line() {
            if (this.setting.prompt_visibility) {
                const prompt = this.to_log_line(this.setting.prompt)
                return [...prompt, new Clause(this.command)]
            }
            else {
                return [new Clause(this.command)]
            }
        },
        input_line() {
            const prompt = this.to_log_line(this.to_log_line(this.input_prompt))
            let command = this.command
            if (!this.input_visibility) {
                command = "*".repeat(command.length)
            }
            return [...prompt, new Clause(command)]
        }
    },
    mounted() {
        this.resize_observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.target === this.$refs.terminal_window) {
                    this.terminal_width = entry.contentRect.width
                    this.terminal_height = entry.contentRect.height

                    this.terminal_line_length = Math.floor(this.terminal_width / CHAR_WIDTH)
                }
            }
        })
        this.resize_observer.observe(this.$refs.terminal_window)

        terminal.setting = this.setting
        terminal.input = this.input
        terminal.log = this.log_to_buffer
        terminal.finish = this.logging_finish
        terminal.clear = this.clear
        if (is_non_empty_array(terminal.banner)) {
            this.logging = true
            this.log_to_buffer(...terminal.banner)
            this.logging_finish()
        }
        terminal.mounted()

        this.focus()
        this.buffer_to_log()

        window.terminal_window = this
    }
}
</script>

<template>
    <div class="terminal_window" ref="terminal_window" @keydown="focus" tabindex="0">
        <LogLine v-for="log_line in log_lines" :log_line :terminal_line_length></LogLine>
        <div v-show="inputting">
            <LogLine ref="input_line" :log_line="input_line" :terminal_line_length :cursor_index></LogLine>
        </div>
        <div v-show="!logging">
            <LogLine ref="command_line" :log_line="command_line" :terminal_line_length :cursor_index></LogLine>
        </div>
    </div>
    <input class="terminal_input" ref="terminal_input" v-model="command" @keydown.left.right="update_cursor_index"
        @keydown.up.down="history" @keydown.enter="enter" @keydown.tab.prevent="tab" @keydown="keydown">
</template>

<style scoped>
.terminal_window {
    flex: 1;
    content: size;
    overflow-x: hidden;
    overflow-y: auto;
    padding-right: 10px;
    height: 100%;
}

.terminal_input {
    position: absolute;
    left: -9999px;
}
</style>
