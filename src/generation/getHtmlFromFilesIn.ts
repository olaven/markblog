
const path = require('path');
const marky = require('marky-markdown');

import { forEachFileIn, getContentsOf } from './util'; 
import { config } from '../../config'; 

/**
 * Returns content of provided .md-dir as html-files 
 * @param onError 
 * @param onSuccess 
 */
export const getHtmlFromFilesIn = (directory: string): string[] => {
    
    let htmlInFiles = []; 
    
    forEachFileIn(directory, (filename) => {  
        
        const filePath = path.join(config.url.posts, filename); 

        getContentsOf(filePath, (content) => {
            const html = marky(content);             
            htmlInFiles.push(html); 
        }); 
    }); 

    return htmlInFiles;  
}
