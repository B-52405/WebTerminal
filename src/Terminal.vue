<script>
import TerminalWindow from "./components/TerminalWindow.vue"
import { terminal_setting } from "./utils/terminal_setting.js"

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

        //加载所有在commands文件夹中声明的命令
        const modules = import.meta.glob("./commands/*.js")
        for (const path in modules) {
            modules[path]()
        }

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
