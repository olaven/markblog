
const path = require('path');
const marky = require('marky-markdown');

import { forEachFileIn, getContentsOf, getFilenameFromPath } from './util'; 
import { config } from '../config'; 
import { callbackify } from 'util';

/**
 * Callback for each converted file 
 * @param onError 
 * @param onSuccess 
 */
export const getHtmlFromFilesIn = (directory: string, callback: (html: string, filename:  string) => void) => {
    
    forEachFileIn(directory, (filename) => {  
        
        const filePath = path.join(config.url.posts, filename); 

        getContentsOf(filePath, (content) => {
            const html = marky(content);   
            const filename = getFilenameFromPath(filePath, false); 

            callback(html, filename); 
        }); 
    }); 
}
