import { commanding } from "../utils/commanding"
import { terminal_setting } from "../utils/terminal_setting"
import { COLORS } from "../utils/statics"

commanding
    .Command("color")
    .Description("Set the console background and font color.")
    .Option({ name: "background", type: "String", default: "gray", short: "b", description: "set background color" })
    .Option({ name: "font", type: "String", default: "white", short: "f", description: "set font color" })
    .Action((background, font) => {
        if (background.toUpperCase() in COLORS) {
            terminal_setting.background_color = COLORS[background.toUpperCase()]
        }
        else {
            terminal_setting.background_color = background
        }

        if (font.toUpperCase() in COLORS) {
            terminal_setting.font_color = COLORS[font.toUpperCase()]
        }
        else {
            terminal_setting.font_color = font
        }
    })
