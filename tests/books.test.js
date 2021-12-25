import {
  isSearchValid,
  isInputValid,
  isValidNumber,
  createBookList,
} from "../src/bookUtils.js";

import testBooks from "./testBooks";
import { retrieve } from "../src/config/apiAccess.js";

const data = testBooks
const uppercaseY = "Y";
const uppercaseN = "N";
const searchForDogs = " Dogs ";
const shouldNotFindResults = "dhjasku7& njklad 0 )";
const inputOfSeven = 7;
const inputOfZero = 0;

//search term tests
test("Search input should be trim, not blank or space", () => {
  const test1 = isSearchValid(searchForDogs);
  const test2 = isSearchValid("");
  const test3 = isSearchValid(" ");

  expect(test1).toBe("Dogs");
  expect(test2).toBeFalsy();
  expect(test3).toBeFalsy();
});

//yes no validation tests
test("Yes/ No input should be lower case, y or n only", () => {
  const test1 = isInputValid(uppercaseY);
  const test2 = isInputValid(uppercaseN);
  const test3 = isInputValid("");
  const test4 = isInputValid(" ");
  expect(test1).toBe("y");
  expect(test2).toBe("n");
  expect(test3).toBeFalsy();
  expect(test4).toBeFalsy();
});

//number validation test
test("Number input should only be number 1-5, no other characters", () => {
  const test1 = isValidNumber(1);
  const test2 = isValidNumber(2);
  const test3 = isValidNumber(3);
  const test4 = isValidNumber(4);
  const test5 = isValidNumber(5);
  const test6 = isValidNumber("Nope");
  const test7 = isValidNumber("");
  const test8 = isValidNumber(" ");
  const test9 = isValidNumber(inputOfSeven);
  const test10 = isValidNumber(inputOfZero);

  expect(test1).toBe(1);
  expect(test2).toBe(2);
  expect(test3).toBe(3);
  expect(test4).toBe(4);
  expect(test5).toBe(5);
  expect(test6).toBeFalsy();
  expect(test7).toBeFalsy();
  expect(test8).toBeFalsy();
  expect(test9).toBeFalsy();
  expect(test10).toBeFalsy();
});

//test createBookList
test("Should return Promise that can resolve", () => {
    const booksType = createBookList(data)
  expect(booksType).resolves.toBeInstanceOf(Array)
});


//test retrieve 
test('Should be falsy if gibberish is entered', ()=>{
    expect(retrieve(shouldNotFindResults)).resolves.toBeFalsy()
})
