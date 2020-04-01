import { read_file, file_exists } from "../file_io.ts";

export interface Options {
  blog_title: string;
  post_source: string;
  post_destination: string;
  post_style: string;
  index_style: string;
  favicon: string;
  rss_options?: {
    title: string;
    description: string;
    link: string;
  };
}

const get_custom_options_path = (flag: string, args: string[]) => {
  const path = args[args.indexOf("--options") + 1];
  if (!path) {
    throw "no path to options is specified..";
  }

  if (!path.endsWith(".json")) {
    throw `${path} does not look like a .json-file..`;
  }

  return path;
};

export const get_options_path = async (args: string[]) => {
  const custom_flag = "--options";
  if (args.includes(custom_flag)) {
    return get_custom_options_path(custom_flag, args);
  }

  const standard_options = "./options.json";
  const exists = await file_exists(standard_options);
  if (exists) {
    return standard_options;
  } else return null;
};

export const read_user_options = async (path: string) => {
  const content = await read_file(path);
  const options = JSON.parse(content);
  return options;
};

//NOTE: has to be exported, as it is used in tests
export const default_options: Options = {
  blog_title: "Blog",
  post_source: "./posts",
  post_destination: "./out",
  post_style: "../style.css",
  index_style: "./style.css",
  favicon: "",
};

export const get_options = async (args: string[]): Promise<Options> => {
  const options_path = await get_options_path(args);
  const user_options = options_path
    ? await read_user_options(options_path)
    : {};

  const options = { ...default_options, ...user_options };
  return options;
};
