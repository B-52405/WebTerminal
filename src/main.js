import { createApp } from 'vue'
import Terminal from "./components/Terminal.vue"
import { commanding } from './utils/commanding.js'

commanding
    .Command("hello")
    .Description("Say hello to the world.")
    .Param({ name: "name", type: "String", default: "world", description: "Say hello to who." })
    .Option({ name: "ending", type: "String", default: "!", short: "e", description: "Punctuation." })
    .Option({ name: "hide", type: "Boolean", short: "s", description: "Whether to display punctuation marks." })
    .Action((name, ending, hide) => {
        return `hello ${name}${(!hide) ? ending : ""}`
    })

createApp(Terminal).mount("#web_terminal_app")
