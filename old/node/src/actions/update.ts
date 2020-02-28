/**
 * Run the static-html generator 
 */
import { config } from '../config' 
import { getHtmlFromFilesIn } from '../generation/getHtmlFromFilesIn'; 
import { generatePostFrom } from '../generation/generateIndexFrom'; 


export const update = () => {
    let postsDirectory = config.url.posts;
    
    let htmlFromFiles: string[] = []; 

    getHtmlFromFilesIn(postsDirectory, (html, filename) => {
        generatePostFrom(html, filename); 
    }); 
}