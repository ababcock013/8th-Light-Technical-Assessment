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
        console.log("\n");
        console.log(
          boxen(JSON.stringify(data, null, 1), {
            title: `Top Five results for "${query}"`,
            titleAlignment: "center",
            padding: 1,
            backgroundColor: "#a5c0d1",
            margin: 3,
            float: "center",
          })
        );
        spinner.succeed(chalk.green("Books received!"));
        await localStorage.setItem(
          "books.js",
          JSON.stringify(data)
            .replace(/^/, "const books =")
            .concat(" \n export default books")
        );
      } else {
        spinner.fail(chalk.red("Sorry, search failed."));
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
