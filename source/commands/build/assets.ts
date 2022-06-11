import { copy_dir } from "../../deps.ts";
import { Options } from "../../blog/options.ts";

export const copy_assets = (options: Options) => {
  return copy_dir({
    source: `${options.post_source}/../assets`,
    destination: `${options.post_destination}/assets`,
  });
};
