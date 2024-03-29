import { file_exists, read_file } from "../deps.ts";

export type GitHost = "github" | "sourcehut";

export type HistoryOptions =
  | {
      enabled: true;
      host: GitHost | "none";
      username: string;
      repo_name: string;
    }
  | {
      enabled: false;
      host: "none";
    };

export interface Options {
  blog_title: string;
  post_source: string;
  post_destination: string;
  post_style: string;
  index_style: string;
  favicon: string;
  git_history: HistoryOptions;
  rss_options?: {
    title: string;
    description: string;
    link: string;
  };
}

const get_custom_options_path = (flag: string, args: string[]) => {
  const path = args[args.indexOf(flag) + 1];
  if (!path) {
    throw new Error("no path to options is specified..");
  }

  if (!path.endsWith(".json")) {
    throw new Error(`${path} does not look like a .json-file..`);
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
  git_history: {
    enabled: false,
    host: "none",
  },
};

export const get_options = async (args: string[]): Promise<Options> => {
  const options_path = await get_options_path(args);
  const user_options = options_path
    ? await read_user_options(options_path)
    : {};

  const options = { ...default_options, ...user_options };
  return options;
};
