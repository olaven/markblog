import { commands } from "./source/commands/commands.ts";
import { get_options } from "./source/blog/options.ts"

const { args } = Deno 

const options = await get_options(args)

switch(Deno.args[0]?.toLowerCase()) {

    case "build": 
        await commands.build(options);
        break;
    case "init": 
        await commands.init(options);
        break;
    default: 
        commands.show_help();
        break;
}