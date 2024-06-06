<script>
import TerminalWindow from "./TerminalWindow.vue"
import { } from "../commands/clear"
import { } from "../commands/color"
import { } from "../commands/help"

export default {
    components: {
        TerminalWindow
    }
}
</script>

<template>
    <div class="terminal_container">
        <TerminalWindow ref="terminal_window"></TerminalWindow>
    </div>
</template>

<style scoped>
.terminal_container {
    display: flex;
    overflow: auto;
    background-color: #282828;
    color: white;
    margin: 0;
    padding: 10px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
}
</style>
