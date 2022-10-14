import { get_html } from "../file_io.ts";
import { get_latest_commit } from "../git/git.ts";
import { Commit } from "../git/parser.ts";
import { HistoryOptions } from "./options.ts";

export interface Post {
  title: string;
  html: string;
  location: string;
  created: Date;
  modification: Date;
  latest_commit: Commit | null;
}

const get_title = (filename: string) =>
  filename.replace(".md", "").split("_").join(" ");

const read_folder = async (folder: string) => {
  const entries = await Deno.readDir(folder);
  const resolved_entries: Deno.DirEntry[] = [];

  for await (const entry of entries) {
    resolved_entries.push(entry);
  }

  return resolved_entries;
};

const to_posts = (
  source: string,
  destination: string,
  history_options: HistoryOptions
) => {
  return async (file: Deno.DirEntry): Promise<Post> => {
    const filename = file.name as string;

    const file_info = await Deno.stat(`${source}/${filename}`);

    const title = get_title(filename);
    const html = await get_html(`${source}/${filename}`);
    const location = `${destination}/${filename.replace(".md", ".html")}`;
    const created = file_info.birthtime as Date;
    const modification = file_info.mtime as Date;
    const latest_commit = history_options.enabled
      ? await get_latest_commit(`${source}/${filename}`)
      : null;

    return { title, html, location, created, modification, latest_commit };
  };
};

const is_post = (file: Deno.DirEntry) => {
  const is_file = file.isFile;
  const is_markdown = (file.name as string).endsWith(".md");

  return is_file && is_markdown;
};

const is_collection = (file: Deno.DirEntry) => file.isDirectory;

export interface Collection {
  name: string;
  level: number;
  path: string;
  subcollections: Collection[];
  posts: Post[];
}

const get_collection_name = (path: string) => {
  const parts = path.split("/");
  const last = parts[parts.length - 1];
  const name = get_title(last);
  return name;
};

type SubcollectionInfo = {
  source: string;
  destination: string;
  level: number;
  history_options: HistoryOptions;
};
const get_subcollections = (files: Deno.DirEntry[], info: SubcollectionInfo) =>
  Promise.all(
    files.filter(is_collection).map((file) =>
      get_collection(
        {
          source: `${info.source}/${file.name}`,
          destination: `${info.destination}/${file.name}`,
          history_options: info.history_options,
        },
        info.level + 1
      )
    )
  );

const get_posts_from_files = async (
  files: Deno.DirEntry[],
  source: string,
  destination: string,
  historyOptions: HistoryOptions
) => {
  const by_newest_first = (first: Post, second: Post) =>
    first.created < second.created ? 1 : -1;

  const posts = await Promise.all(
    files.filter(is_post).map(to_posts(source, destination, historyOptions))
  );

  return posts.sort(by_newest_first);
};

export const get_collection = async (
  args: {
    source: string;
    destination: string;
    history_options: HistoryOptions;
  },
  level = 0
): Promise<Collection> => {
  const files = await read_folder(args.source);

  const collection: Collection = {
    name: get_collection_name(args.source),
    path: args.destination,
    level: level,
    subcollections: await get_subcollections(files, {
      source: args.source,
      destination: args.destination,
      history_options: args.history_options,
      level,
    }),
    posts: await get_posts_from_files(
      files,
      args.source,
      args.destination,
      args.history_options
    ),
  };

  return collection;
};

export const collection_test_functions = {
  get_posts_from_files,
  get_title,
};
