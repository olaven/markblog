/**
 * Run the static-html generator 
 */
import { config } from '../../config'; 
import { getHtmlFromFilesIn } from '../generation/getHtmlFromFilesIn'; 
import { generateIndexFrom } from '../generation/generateIndexFrom'; 


export const update = () => {
    let postsDirectory = config.url.posts;
    // generatepsots
    const htmlFromFiles = getHtmlFromFilesIn(postsDirectory); 
    console.log("THIS SHOULD NOT BE EMPTY: ", htmlFromFiles); 
    generateIndexFrom(htmlFromFiles); 

}