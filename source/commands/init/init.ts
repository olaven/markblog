import { red, yellow, green, bold } from "../../deps.ts"
import { Options } from "../../blog/options.ts";

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