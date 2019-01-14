import { readdir, readFile } from 'fs';

/**
 * Function that takes an Error as argument
 */
export type ErrorHandler = (error: Error) => void 

/**
 * Does given action on all filenames in 
 * the given directory. 
 * @param directory directory to read from 
 * @param action callback that gets each filename 
 * @param onError error handling 
 */
export const forEachFileIn = (
    directory: string, 
    action: (filename) => void, 
    onError: ErrorHandler ) => {
    readdir(directory, (error, filenames) => {
        if (error) onError(error); 
        filenames.forEach(filename => {
            action(filename); 
        }); 
    }); 
}

/**
 * Returns contents of a file 
 * @param file path to file 
 * @param onError error handler 
 */
export const getContentsOf = (file: string,  onSucess: (content: string) => void, onError: ErrorHandler) => {
    readFile(file, 'utf-8', (error, content) => {
        if (error) onError(error); 
        else onSucess(content); 
    }); 
}