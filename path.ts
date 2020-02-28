const {execPath, realpath} = Deno; 

const exec_path = await execPath();
const real_path = await realpath("./");

console.log("execpath: ", exec_path);
console.log("realpath: ", real_path);
