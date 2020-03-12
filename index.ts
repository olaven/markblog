import { Collection } from "./collection.ts";
import {get_html} from "./common.ts";

interface Index {
    main_content: string,
    root_collection: Collection
}

export const get_index = async (collection: Collection): Promise<Index> => {

    const main_content = await get_html("index.md");

    return {
        main_content,
        root_collection: collection
    }
};