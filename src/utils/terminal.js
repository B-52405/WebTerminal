import { is_iterable } from "./checker"

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
    finish: () => { },
    clear: () => { },
    mounted: () => { },
    banner: []
}

const terminal_proxy = new Proxy(terminal, {
    set(target, property, value, receiver) {

        if(property === "setting"){
            const setting = target["setting"]
            for(const name in setting){
                if(setting[name] !== undefined){
                    value[name] = setting[name]
                }
            }
        }
        else if(["input", "log", "finish", "clear", "mounted"].includes(property)){
            if(typeof value !== "function"){
                return false
            }
        }
        else if(property === "banner"){
            if(!is_iterable(value)){
                return false
            }
        }
        else{
            return false
        }

        return Reflect.set(target, property, value, receiver)
    }
})

export {
    terminal_proxy as terminal
}
