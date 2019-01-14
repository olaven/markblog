const path = require('path'); 

export const config = {
    url: {
        root: __dirname, 
        index: path.join(__dirname, "index.html"), 
        posts: {
            md: path.join(__dirname, "/posts/"),
            html: path.join(__dirname, "/generated")
        }
    }
}