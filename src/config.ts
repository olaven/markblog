const path = require('path'); 

export const config = {
    url: {
        root: __dirname, 
        posts: path.join(__dirname, "../posts/")
    }
}