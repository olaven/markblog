import { decode, red, yellow } from "../deps.ts";
import { Commit, parse_commit } from "./parser.ts";

export const git_is_installed = async () => {
  const result = await execute("which", "git");
  return result.length >= 1;
};

export const get_latest_commit = async (path: string): Promise<Commit> => {
  if (!git_is_installed()) {
    throw "Error: Git history enabled, but git not installed";
  }

  const rawCommit = await execute("git", "log", "-1", "--", path);

  if (
    rawCommit.startsWith(
      "fatal: not a git repository" || "fatal: your current branch" //.. does not have any commits yet
    )
  ) {
    throw `Error getting commit: ${rawCommit}`;
  }

  return parse_commit(rawCommit);
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
