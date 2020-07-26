import { markdown_to_html, read_file } from "./deps.ts";

/**
 * Returns content of `.md`-file as HTML. 
 * @param path 
 */
export const get_html = async (path: string): Promise<string> => {
  const content_as_markdown = (await read_file(path)) as string;
  const content_as_html = markdown_to_html(content_as_markdown);

  return content_as_html;
};
