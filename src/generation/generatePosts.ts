
import { readFile, writeFile, readdir, mkdir, write } from 'fs';
const path = require('path');
const marky = require('marky-markdown');

import { forEachFileIn, getContentsOf ,ErrorHandler } from './util'; 

/**
 * Converts all .md files in first directory 
 * to .html and writes them to second directory 
 * @param onError 
 * @param onSuccess 
 */
export const generatePosts = (
    mdDir: string,
    htmlDir: string,
    onError: ErrorHandler,
    onSuccess: () => void
) => {
    
    forEachFileIn(mdDir, (filename) => {
        const paths = {
            md: path.join(mdDir, filename), 
            html: path.join(htmlDir, filename + ".html")
        }
        getContentsOf(paths.md, (content) => {
            
            const html = marky(content); 
            
            writeFile(paths.html, html, null, (error) => {
                if (error) onError(error);
            }); 

        }, error => {if (error) onError(error)}); 
    }, error => { if (error) onError(error) }); 

    onSuccess(); 
}
