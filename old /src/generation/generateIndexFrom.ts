import { Post } from "../models/post";

const path = require('path'); 

export const generatePostFrom = (html: string, filename: string) => {
    const post = new Post(filename, html, new Date(Date.now())); 
    
}

