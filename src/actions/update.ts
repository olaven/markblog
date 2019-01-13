/**
 * Run the static-html generator 
 */
import { config } from '../../config'; 
import { convert } from '../convert'; 


export const update = () => {
    let urls = config.url.posts;
    convert(urls.md, urls.html,
        error => {
            console.log(error);
        }, () => {
            console.log("converted");
        })
}