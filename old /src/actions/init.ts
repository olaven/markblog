import { create } from 'create-directories'; 

/**
 * Initialize a new markblog project in current dir 
 */
export const init = () => {
    
    
    const fileStructure = {
        "posts": {}, 
        "generated": {}
    }
    
    create(fileStructure)
}