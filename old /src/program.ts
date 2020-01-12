const commander = require('commander');

import { init } from './actions/init'; 
import { update } from './actions/update'; 
import { publish } from './actions/publish'; 


commander
    .version(process.env.npm_package_version)

commander
    .command("init")
    .description("Initialize a new existing_blog in current directory")
    .action(() => {
        init(); 
    }); 


commander
    .command("publish")
    .description("Publish via github pages.")
    .action(() => {
        publish();
    }); 

commander 
    .command("update")
    .description("Update index html with new posts.")
    .action(() => {
        update(); 
    }); 


export const program = commander; 
