import { retrieve } from "../src/config/apiAccess.js";

test("Should throw error", () => {
  expect(() => retrieve("hjkad hjkalh8*89")).toThrow();
});
