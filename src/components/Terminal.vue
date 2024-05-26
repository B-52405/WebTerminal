<script>
import TerminalWindow from "./TerminalWindow.vue"
import { terminal_setting } from "../utils/terminal_setting.js"
import {} from "../commands/color.js"
import {} from "../commands/hello.js"
import {} from "../commands/help.js"

export default {
    components: {
        TerminalWindow
    },
    mounted() {
        const container = this.$el.parentElement
        Object.assign(container.style, {
            display: "flex",
            padding: "10px",
            margin: 0,
            "background-color": terminal_setting.background_color,
            color: terminal_setting.font_color
        })

        // window.app = this
    }
}
</script>

<template>
    <div>
        <TerminalWindow ref="terminal_window"></TerminalWindow>
    </div>
</template>

<style scoped>
div {
    display: flex;
    flex: 1;
    overflow: auto;
}
</style>
