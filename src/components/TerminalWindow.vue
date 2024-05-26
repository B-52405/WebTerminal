<script>
import LogLine from "./LogLine.vue"
import { Clause } from "../utils/clause.js"
import { logger_line, init_logger } from '../utils/logger.js'
import { commanding } from "../utils/commanding.js"
import { is_non_empty_array } from "../utils/checker.js"
import { COLORS } from "../utils/statics.js"
import { init_setting } from "../utils/terminal_setting.js"

const char_width = 10.8

export default {
    expose: [
        "enter"
    ],
    components: {
        LogLine
    },
    data() {
        return {
            log_lines: [],
            log_buffer: [],
            logging: false,
            command: "",
            command_history: [],
            command_history_index: -1,
            cursor_index: 0,
            setting: {
                prompt: "WebTerminal> ",
                prompt_visibility: true,
                logging_interval: 24,
                background_color: COLORS.GRAY,
                font_color: COLORS.WHITE
            },
            complete_command: [],
            complete_index: -1,

            terminal_width: undefined,
            terminal_height: undefined,
            terminal_line_length: undefined
        }
    },
    methods: {
        scroll_to_bottom() {
            setTimeout(() => {
                this.$refs.terminal_window.scrollTop = this.$refs.terminal_window.scrollHeight
            })
        },
        log_to_buffer(line) {
            if (typeof line === "string") {
                this.log_buffer.push([Clause(line)])
            }
            else if (is_non_empty_array(line)) {
                for (let i = 0; i < line.length; i++) {
                    if (typeof line[i] === "string") {
                        line[i] = Clause(line[i])
                    }
                }
                this.log_buffer.push(line)
            }

            if (this.log_buffer.length > 0 && !this.logging) {
                this.logging = true
                this.buffer_to_log()
            }
        },
        //buffer_to_log不一直循环的理由是：
        //如果一直循环，每次输入的时候第一行就会有延迟
        async buffer_to_log() {
            this.scroll_to_bottom()
            if (this.log_buffer.length === 0) {
                this.logging = false
                return
            }

            if (this.log_buffer.length > 0) {
                this.log_lines.push(this.log_buffer.shift())
            }

            setTimeout(this.buffer_to_log, this.setting.logging_interval)
        },
        enter() {
            if (this.logging) {
                return
            }
            logger_line(this.command_line)
            commanding.execute(this.command)
            this.command_history.unshift(this.command)
            this.command_history_index = -1
            this.$nextTick(() => { this.command = "" })
        },
        history(event) {
            if (event.key === "ArrowUp") {
                if (this.command_history_index < this.command_history.length - 1) {
                    this.command_history_index++
                    this.command = this.command_history[this.command_history_index]
                }
            }
            else if (event.key === "ArrowDown") {
                if (this.command_history_index > 0) {
                    this.command_history_index--
                    this.command = this.command_history[this.command_history_index]
                }
            }
        },
        tab() {
            if (this.complete_index === -1) {
                this.complete_command = commanding.complete(this.command)
            }
            if (this.complete_command.length === 0) {
                return
            }
            this.complete_index = (this.complete_index + 1) % this.complete_command.length
            this.command = this.complete_command[this.complete_index]
        },
        keydown(event) {
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
        focus(event) {
            if (event) {
                if (event.key === "Control") {
                    return
                }
                if (event.ctrlKey && event.key === "c") {
                    return
                }
            }
            this.$nextTick(() => {
                this.$refs.terminal_input.focus()
            })
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
            console.log("font_color", new_value)
            const container = this.$el.parentElement
            Object.assign(container.style, {
                "color": new_value
            })
        }
    },
    computed: {
        command_line() {
            if (this.setting.prompt_visibility) {
                return [Clause(this.setting.prompt + this.command)]
            }
            else {
                return [Clause(this.command)]
            }
        }
    },
    mounted() {
        this.resize_observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.target === this.$refs.terminal_window) {
                    this.terminal_width = entry.contentRect.width
                    this.terminal_height = entry.contentRect.height

                    this.terminal_line_length = Math.floor(this.terminal_width / char_width)
                }
            }
        })
        this.resize_observer.observe(this.$refs.terminal_window)
        init_logger(this.log_to_buffer)
        init_setting(this.setting)
        this.focus()

        // window.terminal_window = this
    }
}
</script>

<template>
    <div ref="terminal_window" @keydown="focus" tabindex="0">
        <LogLine v-for="log_line in log_lines" :log_line :terminal_line_length></LogLine>
        <LogLine ref="command_line" v-show="!logging" :log_line="command_line" :terminal_line_length :cursor_index>
        </LogLine>
    </div>
    <input ref="terminal_input" v-model="command" @keydown.left.right="update_cursor_index" @keydown.up.down="history"
        @keydown.enter="enter" @keydown.tab.prevent="tab" @keydown="keydown">
</template>

<style scoped>
div {
    flex: 1;
    content: size;
    overflow-x: hidden;
    overflow-y: auto;
    padding-right: 5px;
}

input {
    position: absolute;
    left: -9999px;
}
</style>
