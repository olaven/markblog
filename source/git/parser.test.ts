import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.68.0/testing/asserts.ts";
import { parse_commit } from "./parser.ts";

const rawCommit = `
commit 7f76a99ca93f1106ecc7f3af02378369e0020cf5 (HEAD -> feature/support_git_history)
Author: olaven <olav@sundfoer.com>
Date:   Thu Oct 13 21:48:56 2022 +0200

    Functions for executing git commands + basic parsing of commit message (not done)

`;

Deno.test("Parser does run", () => {
  const commit = parse_commit(rawCommit);
  assertNotEquals(commit, null);
});

Deno.test("Parser does get the correct hash", () => {
  const commit = parse_commit(rawCommit);
  assertEquals(commit.hash, "7f76a99ca93f1106ecc7f3af02378369e0020cf5");
});

Deno.test("Parser does get the correct author", () => {
  const commit = parse_commit(rawCommit);
  assertEquals(commit.author, "olaven <olav@sundfoer.com>");
});

Deno.test("Parser does get the correct message", () => {
  const commit = parse_commit(rawCommit);
  assertEquals(
    commit.message,
    "Functions for executing git commands + basic parsing of commit message (not done)"
  );
});

Deno.test("Parser does get the correct date", () => {
  const commit = parse_commit(rawCommit);
  assertEquals(commit.date, new Date("Thu Oct 13 21:48:56 2022 +0200"));
});
