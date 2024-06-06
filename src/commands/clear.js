import { Commander, terminal } from "../index"

Commander
    .Command("clear")
    .Description("Clear all logs.")
    .Action(() => { terminal.clear() })
