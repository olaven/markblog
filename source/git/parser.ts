export type Commit = {
  hash: string;
  author: string;
  message: string;
  date: Date;
};

export const parse_commit = (rawCommit: string): Commit => {
  const lines = rawCommit.split("\n").filter((line) => line !== "");

  const [commit_line, author_line, dateLine, ...message] = lines;

  return {
    hash: parse_commit_hash(commit_line),
    author: parse_author_line(author_line),
    message: parse_message_line(message),
    date: new Date(dateLine),
  };
};

const parse_author_line = (author_line: string) => {
  const [_, author] = author_line.split("Author: ");
  return author.trim();
};

const parse_commit_hash = (commit_line: string) => {
  const [_, hash] = commit_line.split(" ");
  return hash;
};

const parse_message_line = (message: string[]) => {
  return message.join("\n").trim();
};
