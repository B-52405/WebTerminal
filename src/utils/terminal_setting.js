let terminal_setting = {
    prompt: undefined,
    prompt_visibility: undefined,
    background_color: undefined,
    font_color: undefined,
    logging_interval: undefined
}

function init_setting(setting) {
    terminal_setting = setting
}

export {
    init_setting,
    terminal_setting
}
