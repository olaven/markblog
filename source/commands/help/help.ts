import { bold } from "../../deps.ts"

export const show_help = () => {

    const message = `
        commands: 
            - init: initialize a new blog 
                --options [path]: path to a custom options file (optional) 
            - build: assemble the html pages 
                --options [path]: path to a custom options file (optional) 
            - help: show this page
    `;
    const formatted = bold(message);
    
    console.log(formatted);
}