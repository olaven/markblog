import { assert } from "https://deno.land/std@0.143.0/_util/assert.ts";
import { assertEquals } from "../deps.ts";
import { CommitMessage, get_latest_commit, git_is_installed } from "./git.ts";

Deno.test("Which git is running", async () => {
  const isInstalled = await git_is_installed();
  assertEquals(isInstalled, true);
});

Deno.test("Getting latest commit does return something", async () => {
  const latest = await get_latest_commit("./README.md");
  assert(latest !== null);
  assert(latest !== undefined);
});

Deno.test(
  "Getting latest commit message does return something for readme",
  async () => {
    const latest = (await get_latest_commit("./README.md")) as CommitMessage;

    console.log(latest);
    assert(latest.hash.length > 0);
    assert(latest.author.length > 0);
    assert(latest.message.length > 0);
    assert(latest.date.toISOString().length > 0);
  }
);
