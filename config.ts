const path = require('path'); 

export const config = {
    url: {
        root: __dirname, 
        posts: {
            md: path.join(__dirname, "/posts/"),
            html: path.join(__dirname, "/generated")
        }
    }
}