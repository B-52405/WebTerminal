const terminal = {
    setting: {
        prompt: undefined,
        prompt_visibility: undefined,
        background_color: undefined,
        font_color: undefined,
        logging_interval: undefined
    },
    input: (prompt) => undefined,
    log: console.log,
    finish: () => { }
}

function init_terminal(setting, input, log, finish) {
    terminal.setting = setting
    if (typeof input === "function") {
        terminal.input = input
    }
    if (typeof log === "function") {
        terminal.log = log
    }
    if (typeof finish === "function") {
        terminal.finish = finish
    }
}

export {
    terminal,
    init_terminal
}
