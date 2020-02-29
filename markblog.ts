import { build } from "./commands/build.ts";
import { show_help } from "./commands/help.ts";

const options = {
    post_source: "./posts", 
    post_destination: "./out", 
    post_style: "../style.css",
    index_style: "./style.css", 
}


switch(Deno.args[0]?.toLowerCase()) {

    case "build": 
        await build(options);
        break;
    case "init": 
        throw "init is not implemented";
        break;
    default: 
        show_help();
        break;
}



const init = () => {

}



