let log_handler = console.log

function init_logger(handler) {
    if (typeof handler === "function") {
        log_handler = handler
    }
}

function logger_sync(lines, resolve) {
    for (let line of lines) {
        log_handler(line)
    }
    if (typeof resolve === "function") {
        resolve()
    }
}

function logger_line(line, resolve) {
    logger_sync([line], resolve)
}

async function logger(lines, resolve) {
    while (true) {
        const { value: line, done: done } = await lines.next()
        if (done) {
            break
        }
        log_handler(line)
    }
    if (typeof resolve === "function") {
        resolve()
    }
}

export {
    logger,
    logger_sync,
    logger_line,
    init_logger
}
