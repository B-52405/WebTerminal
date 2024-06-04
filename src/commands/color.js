import { Commander } from "../utils/commander"
import { terminal } from "../utils/terminal"
import { COLORS } from "../utils/statics"

Commander
    .Command("color")
    .Description("Set the console background and font color.")
    .Option({ name: "background", type: "String", default: "default", short: "b", description: "Set background color." })
    .Option({ name: "font", type: "String", default: "white", short: "f", description: "Set font color." })
    .Action((background, font) => {
        if (background.toUpperCase() in COLORS) {
            terminal.setting.background_color = COLORS[background.toUpperCase()]
        }
        else {
            terminal.setting.background_color = background
        }

        if (font.toUpperCase() in COLORS) {
            terminal.setting.font_color = COLORS[font.toUpperCase()]
        }
        else {
            terminal.setting.font_color = font
        }
    })
