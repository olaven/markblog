import { Options } from "../common.ts";

export const init = async (options: Options) => {

    try {

        await Deno.mkdir(options.post_source);
        await Deno.create("index.md");

        console.log("Blog structure set up done!");
    } catch(error) {

        console.error(error);
        console.log("An error occured..");
        console.log("Perhaps this directory already contains a blog?");
    }
}