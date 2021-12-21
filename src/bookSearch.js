// noinspection JSCheckFunctionSignatures

import boxen from "boxen";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./scratch/");

import chalk from "chalk";
import ora from "ora";

import prompt from "prompt-async";

import { retrieve } from "./config/apiAccess.js";
import { pickFavBook, viewFavoriteBooks } from "./bookUtils.js";

//let booksArray = [];

const performBookSearch = async (query) => {
  retrieve(encodeURIComponent(query))
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
            backgroundColor: "blue",
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
        console.log("Books written");
      } else {
        spinner.fail(chalk.red("Sorry, search failed."));
      }
    })
    .then(() => {
      prompt.start();
      console.log(
        boxen(
          "Review the list and choose a book by number to add it to your favorites: "
        )
      );

      prompt.get("number", async (err, result) => {
        // noinspection JSUnresolvedVariable
        pickFavBook(result.number)
          .then(async () => {
            await viewFavoriteBooks();
          })
          .then(() => {
            console.log("choose again?");
            prompt.get("yesNo", async (err, result) => {
              if (result.yesNo === "y") {
                 await promptForSearch()
              } else {
                console.log('Good buy')
              }
            });
          });
      });
    });
};

const promptForSearch = async () => {
  return new Promise((resolve) => {
    console.log("Welcome to Book Search");
    // await prompt.start();
    console.log(" Enter a search term to find a book:");
    prompt.get("search", (err, result) => {
      performBookSearch(result.search);
      // prompt.stop();
    });
    resolve();
  });
};

//export default promptForSearch;

promptForSearch().catch((err) => {
  console.log(err);
});
