import { Parser } from 'htmlparser2'; 
const path = require('path'); 

import { config } from '../../config'; 
import { forEachFileIn, getContentsOf } from './util'; 



export const generateIndexFrom = (arrayOfHtml: string[]) => {
    parse((parser) => {
        
        arrayOfHtml.forEach(html => {
            parser.write(html); 
        })
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