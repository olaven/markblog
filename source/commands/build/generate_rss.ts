import { yellow } from "../../deps.ts";
import { Options } from "../../blog/options.ts";
import { Collection } from "../../blog/collection.ts";
import { write_rss } from "../../rss/writer.ts";

export const generate_rss = async (options: Options, root_collection: Collection) => {

    if (!options.rss_options) return 

    //TODO: make sure link is valid (should maybe be done in rss-module)
    const { title, link, description } = options.rss_options

    await write_rss({
        channel: {
            title, link, description
        }, 
        collections: [ root_collection ]
    }, "./feed.xml");
    console.log(yellow("Generated RSS."));
}