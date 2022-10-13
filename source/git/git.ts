import { red, yellow } from "https://deno.land/std/fmt/colors.ts";
import { decode } from "../deps.ts";

export type CommitMessage = {
  hash: string;
  author: string;
  message: string;
  date: Date;
};

export const git_is_installed = async () => {
  const result = await execute("which", "git");
  return result.length >= 1;
};

export const get_latest_commit = async (
  path: string
): Promise<CommitMessage | null> => {
  const rawCommit = await execute("git", "log", "--", path);
  const lines = rawCommit.split("\n");

  if (lines.length <= 0) {
    return null;
  }

  const [commitLine, authorLine, dateLine] = lines.splice(0, 3);

  return {
    hash: commitLine.split("commit ")[1],
    author: authorLine.split("Author: ")[1],
    //FIXME: PARSE MESSAGE REGARDLESS OF LINE COUNT
    message: "stupid thing",
    date: new Date(dateLine.split("Date: ")[1].trim()),
  };
};

const execute = async (...command: string[]) => {
  const process = Deno.run({
    cmd: command,
    stdout: "piped",
    stderr: "piped",
  });

  const [status, output, error] = await Promise.all([
    process.status(),
    process.output(),
    process.stderrOutput(),
  ]);

  process.close();

  if (!status.success) {
    console.error(
      `${red("Error:")} failed to execute command ${command.join(
        " "
      )} / ${yellow("Output")} ${decode(error)}`
    );
  }

  const decoded = decode(output);
  console.log(decoded);
  return decoded;
};
