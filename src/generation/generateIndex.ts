import { Parser } from 'htmlparser2'; 
const path = require('path'); 

import { config } from '../../config'; 
import { forEachFileIn, getContentsOf } from './util'; 



export const generateIndex = () => {
    parse((parser) => {
        forEachFileIn(config.url.posts.html, filename => {
            const pathToFile = path.join(config.url.posts.html, filename);
            getContentsOf(pathToFile, content => {

                parser.write(content);
    
            }, error => { if (error) throw error });
        }, (error) => {if (error) console.log(error)});
    })
}

const parse = (action: (parser: Parser) => void) => {
    const parser = new Parser({
        opentag: (name: string, attributes) => {
            
        },
        ontext: (text: string) => {
            console.log(text.toString()); 
        },
        onclosetag: (tagname: string) => {

        }
    }, { decodeEntities: true });

    action(parser); 

    parser.end(); 
}