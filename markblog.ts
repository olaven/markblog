import { commands } from "./commands/commands.ts";

const options = {
    post_source: "./posts", 
    post_destination: "./out", 
    post_style: "../style.css",
    index_style: "./style.css", 
}


switch(Deno.args[0]?.toLowerCase()) {

    case "build": 
        await commands.build(options);
        break;
    case "init": 
        commands.init(options);
        break;
    default: 
        commands.show_help();
        break;
}