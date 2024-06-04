import { createApp } from 'vue'
import { Terminal, Commander, terminal } from './index'

Commander
    .Command("hello")
    .Description("Say hello to the world.")
    .Param({ name: "ending", type: "String", default: "!", description: "Punctuation." })
    .Option({ name: "hide", type: "Boolean", short: "h", description: "Whether to display punctuation marks." })
    .Action(async (ending, hide) => {
        terminal.log("")
        const name = await terminal.input("  name: ")
        terminal.log(`  hello ${name}${hide ? "" : ending}`,"")
    })

createApp(Terminal).mount("#web_terminal_app")
