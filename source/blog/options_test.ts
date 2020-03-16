import { get_options_path, get_options, default_options } from "./options.ts"
import { assertEquals, assertThrowsAsync } from "../deps.ts";
const { test } = Deno 

//Getting options 
test("returns default options if --options is not present", async () => {

    const options = await get_options(["no", "options", "flag", "here"]);
    assertEquals(options, default_options);
});

test("throws if --options is not followed with a path", async () => {

    assertThrowsAsync(async () => {

        await get_options(["--options"])    
    });
})


//Getting the path
test("returns null if --options is not present", async () => {

    const path = await get_options_path(["no", "options", "flag", "here"]);
    assertEquals(null, path);
});

test("returns correct path", async () => {

    const expected = "./path/to/my/options.json"
    const path = await get_options_path(["--options", expected]);
    assertEquals(expected, path);
});

test("throws if --options is present without path", () => {

    assertThrowsAsync(async () => {

        //NOTE: nothing specified after --options
        await get_options_path(["--options"]);
    });
});