import { suite, assertEquals } from "./deps.ts";

suite()
    .add("some test", () => {
        
        assertEquals(2, 2);
    })
    .add("other", () => {
        
        assertEquals(3, 3);
    })
    .run()


