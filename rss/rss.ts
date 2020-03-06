import { parse_xml } from "../deps.ts";
import { read_file } from "../common.ts"
/**
 * Testing RSS/XML-code 
 * for RSS functionality down 
 * the line
 */


const xml = await read_file("./feed.rss");
const parsed = parse_xml(xml);

console.log("parsed", parsed);