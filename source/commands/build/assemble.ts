import { Collection } from "../../blog/collection.ts";
import { GitHost, HistoryOptions } from "../../blog/options.ts";
import { Commit } from "../../git/parser.ts";

export const assemble_html_page = (args: {
  content: string;
  stylesheet: string;
  title: string;
  favicon: string;
  latest_commit: Commit | null;
  history_options: HistoryOptions;
}) => {
  if (!args.stylesheet.endsWith(".css")) {
    throw new Error("stylesheet name has to end with .css");
  }

  const template = `
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>MB_TITLE</title>
                
                <!-- Favicon -->
                <link rel="shortcut icon" type="image/png" href="MB_FAVICON"/>

                <!--Code highlighting-->
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/default.min.css">
                <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js"></script>
                <script>hljs.initHighlightingOnLoad();</script>
                
                <!--Default stylesheet:-->
                <link rel="stylesheet" type="text/css" href="MB_STYLESHEET">
            </head>
            <body>
                MB_CONTENT
                ${buildHistoryComponent(
                  args.latest_commit,
                  args.history_options
                )}
            </body>
        </html>
    `;
  return template
    .replace("MB_TITLE", args.title)
    .replace("MB_FAVICON", args.favicon)
    .replace("MB_CONTENT", args.content)
    .replace("MB_STYLESHEET", args.stylesheet);
};

const get_header_level = (level: number) => {
  if (level >= 5) return 6;
  else return level + 1;
};

export const assemble_links = (collection: Collection, level = 0): string => {
  const posts = collection.posts
    .sort((a, b) => (a.created < b.created ? 1 : -1))
    .map((post) => `<li><a href="${post.location}">${post.title}<a/></li>`)
    .join("");

  const collections = collection.subcollections
    .map((subcollection) => assemble_links(subcollection, level + 1))
    .join("");

  return `
        <h${get_header_level(level)}>${collection.name}</h${get_header_level(
    level
  )}>
        <ul>
            ${posts}
            ${collections}
        </ul>
    `;
};

const buildHistoryComponent = (
  latest_commit: Commit | null,
  history_options: HistoryOptions
) => {
  if (!history_options.enabled) {
    return "";
  }

  if (history_options.enabled && latest_commit === null) {
    throw "Fatal error: Git history was enabled without having commits. Should never happen.";
  }

  function escape(possible_html_code: string) {
    return possible_html_code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  return `
  <div class='git-history'>
    This page was last updated on ${latest_commit?.date.toDateString()}</br>
    Change message: ${escape(latest_commit?.message as string)}</br>
    ${build_host_link(latest_commit as Commit, history_options)}
  </div>
  `;
};

function build_host_link(commit: Commit, options: HistoryOptions): string {
  if (options.host === "none") {
    return "";
  }

  const formats: { [key in GitHost]: string } = {
    github: `https://github.com/${options.username}/${options.repo_name}/commit/${commit.hash}`,
    sourcehut: `https://git.sr.ht/~${options.username}/${options.repo_name}/commit/${commit.hash}`,
  };

  const link = formats[options.host];
  return `<a href="${link}">View change</a>`;
}
