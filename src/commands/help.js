import { commanding } from "../utils/commanding"

commanding
    .Command("help")
    .Description("Provide help information for commands.")
    .Param({name: "command", type: "String", description: "Name of the command"})
    .Action((command)=>{
        return commanding.help(command)
    })
