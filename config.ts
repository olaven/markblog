const path = require('path'); 

export const config = {
    url: {
        root: __dirname, 
        index: path.join(__dirname, "index.html"), 
        posts: path.join(__dirname, "/posts/")
    }
}