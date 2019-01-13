
import {readFile, writeFile, fstat, readdir} from 'fs'; 
const postsDir = __dirname + "/posts"

readdir(postsDir, (error, filenames) => {
    if (error) throw error 

    filenames.forEach(filename => {
        console.log(filename); 
    })
}); 
