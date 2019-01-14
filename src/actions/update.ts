/**
 * Run the static-html generator 
 */
import { config } from '../../config'; 
import { generatePosts } from '../generation/generatePosts'; 
import { generateIndex } from '../generation/generateIndex'; 


export const update = () => {
    let urls = config.url.posts;
    // generatepsots
    generatePosts(urls.md, urls.html,
        error => {
            console.log(error);
        }, () => {
            // generate index             
            generateIndex(); 
        })
}