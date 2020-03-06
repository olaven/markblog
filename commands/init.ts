import { Options } from "../common.ts";
import { red, yellow, green, bold } from "../deps.ts"

export const init = async (options: Options) => {

    try {

        await Deno.mkdir(options.post_source);
        await Deno.create("index.md");

        console.log(green(bold("Blog structure set up done!")));
    } catch(error) {

        console.log(`
            ${error}
            ${red("An error ocurred..")}  
            ${yellow("see above for details.")}
        `)
    }
}