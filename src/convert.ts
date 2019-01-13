
import { readFile, writeFile, readdir } from 'fs';
const path = require('path');
const marky = require('marky-markdown');

/**
 * Converts all .md files in first directory 
 * to .html and writes them to second directory 
 * @param onError 
 * @param onSuccess 
 */
export const convert = (
    mdDir: string,
    htmlDir: string,
    onError: (error: Error) => void,
    onSuccess: () => void
) => {
    readdir(mdDir, (error, filenames) => {
        if (error) onError(error);

        filenames.forEach(filename => {
            readFile(path.join(mdDir, filename), 'utf-8', (error, content) => {
                if (error) onError(error);

                const html = marky(content);
                writeFile(path.join(htmlDir, filename) + ".html", html, null, (error) => {
                    if (error) onError(error);
                });
            });
        });

        onSuccess(); 
    });
}
