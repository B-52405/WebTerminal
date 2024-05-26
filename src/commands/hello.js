import { commanding } from "../utils/commanding"

commanding
    .Command("hello")
    .Description("Say hello to the world.")
    .Param({ name: "name", type: "String", default: "world", description: "Say hello to who" })
    .Option({ name: "ending", type: "String", default: "!", short: "e", description: "Punctuation" })
    .Option({ name: "show", type: "Boolean", short: "s", description: "Whether to display punctuation marks" })
    .Action((name, ending, show) => {
        return `hello ${name}${show ? ending : ""}`
    })
