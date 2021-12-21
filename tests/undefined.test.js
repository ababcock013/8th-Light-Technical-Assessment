import { retrieve } from "../src/config/apiAccess.js";

test("retrieve should no be undefined ", () => {
  expect(retrieve("cats")).not.toBeUndefined()
});
