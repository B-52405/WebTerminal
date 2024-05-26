<script>
import TerminalWindow from "./TerminalWindow.vue"
import { } from "../commands/color.js"
import { } from "../commands/hello.js"
import { } from "../commands/help.js"

export default {
    components: {
        TerminalWindow
    }
}
</script>

<template>
    <div id="terminal_container">
        <TerminalWindow ref="terminal_window"></TerminalWindow>
    </div>
</template>

<style scoped>
#terminal_container {
    display: flex;
    overflow: auto;
    background-color: #282828;
    color: white;
    margin: 0;
    padding: 10px;
    height: 100%;
    width: 100%;
}
</style>
