import { Collection } from "./collection.ts";
import {get_html} from "../file_io.ts";

interface Index {
    main_content: string,
    root_collection: Collection
}

/**
 * Returns a representation of the index page 
 * @param root_collection root-collection on the index page 
 */
export const get_index = async (root_collection: Collection): Promise<Index> => {

    const main_content = await get_html("index.md");
    return { main_content, root_collection }
};