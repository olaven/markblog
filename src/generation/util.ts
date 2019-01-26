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
 * @throws if an error occurs when reading dir
 */
export const forEachFileIn = (directory: string, action: (filename: string) => void) => {
    readdir(directory, (error, filenames) => {
        if (error) throw error; 
        filenames.forEach(filename => {
            action(filename); 
        })
    })
}

/**
 * Returns contents of a file 
 * @param file path to file 
 * @throws if error when reading file 
 */
export const getContentsOf = (file: string, onSuccess: (content: string) => void) => {
    readFile(file, 'utf-8', (error, content) => {
        if (error) throw error 
        onSuccess(content); 
    })
}

/**
 * Returns filename from path
 */
export const getFilenameFromPath = (path: string, withExtension: boolean): string => {
    const parts = path.split("/"); 
    let name = parts[parts.length - 1]; 

    if (withExtension) return name 

    // removed the extension
    name = name.split(".").slice(0, -1).join(); 
    return name; 
}