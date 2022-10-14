import { default_options } from "../../blog/options.ts";
import { assert, assertThrows } from "../../deps.ts";
import { assemble_html_page } from "./assemble.ts";

const { test } = Deno;

test("replaces stylesheet", () => {
  const style = "location/style.css";
  const expected = `<link rel="stylesheet" type="text/css" href="${style}">`;
  const result = assemble_html_page({
    content: "content",
    stylesheet: style,
    title: "title",
    favicon: "favicon",
    latest_commit: null,
    history_options: default_options.git_history,
  });

  assert(result.includes(expected));
});

test("replaces main content", () => {
  const content = "Custom content";
  const result = assemble_html_page({
    content,
    stylesheet: "style.css",
    title: "title",
    favicon: "favicon",
    history_options: default_options.git_history,
    latest_commit: null,
  });

  assert(result.includes(content));
});

test("throws if style is not a css file", () => {
  assertThrows(() => {
    assemble_html_page({
      content: "content",
      stylesheet: "not_css_file",
      title: "title",
      favicon: "favicon",
      history_options: default_options.git_history,
      latest_commit: null,
    });
  });
});

test("adds title", () => {
  const title = "Hello, custom title";
  const result = assemble_html_page({
    content: "content",
    stylesheet: "style.css",
    title,
    favicon: "favicon",
    history_options: default_options.git_history,
    latest_commit: null,
  });
  assert(result.includes(title));
});

test("works with different titles", () => {
  Array(10).forEach(() => {
    const random_title = `title - ${Math.random()}`;
    const result = assemble_html_page({
      content: "content",
      stylesheet: "not_css_file",
      title: random_title,
      favicon: "favicon",
      history_options: default_options.git_history,
      latest_commit: null,
    });
    assert(result.includes(random_title));
  });
});

test("adds favicon", () => {
  const favicon = "./path/to/favicon.png";
  const result = assemble_html_page({
    content: "content",
    stylesheet: "style.css",
    title: "title",
    favicon,
    history_options: default_options.git_history,
    latest_commit: null,
  });
  assert(result.includes(favicon));
});
