import enquirer from "enquirer";
import boxen from "boxen";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./scratch/");

import chalk from "chalk";
import ora from "ora";

import prompt from "prompt";
import { retrieve } from "./config/apiAccess.js";
import Enquirer from "enquirer";

const performBookSearch = async (query) => {
  await retrieve(encodeURIComponent(query))
    .then(async (data) => {
      return data;
    })
    .then(async (data) => {
      const spinner = ora("Retrieving books...").start();
      if (data !== undefined) {
        console.log(data);
        spinner.succeed("Books received!");
        await localStorage.setItem(
          "books.js",
          JSON.stringify(data)
            .replace(/^/, "const books =")
            .concat(" \n export default books")
        );
      } else {
        console.log("bad data");
        spinner.fail("Sorry");
        //repeat search
      }
    });
};

prompt.start();
console.log("Welcome to Book Search");
console.log(" Enter a search term to find a book:");
prompt.get("search", (err, result) => {
  performBookSearch(result.search);
});
