// noinspection JSCheckFunctionSignatures

import boxen from "boxen";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./scratch/");

import chalk from "chalk";
import ora from "ora";

import prompt from "prompt-async";

import { retrieve } from "./config/apiAccess.js";
import { pickFavBook, viewFavoriteBooks } from "./bookUtils.js";

//Handles search functions
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
        //  console.clear()
        // process.exit()
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
       await pickFavBook(result.number)
          .then(async () => {
            await viewFavoriteBooks();
          })
          .then(() => {
            console.log("Perform another search and add more books to your list? y for yes, n or any other key to exit");
            prompt.get("yesNo", async (err, result) => {
              if (result.yesNo === "y") {
                await promptForSearch();
              } else {
                console.log("Thank you, have a nice day!");
              }
            });
          });
      });
    });
};

//Main prompt and entry to search
const promptForSearch = async () => {
  return new Promise((resolve, reject) => {
    console.log("Welcome to Book Search");
    console.log(" Enter a search term to find a book:");
    prompt.get("search", (err, result) => {
      if (result.search === "") {
        console.log("Your search was blank");
        promptForSearch();
      } else {
        performBookSearch(result.search);
      }
    });
    resolve();
  });
};


promptForSearch().catch((err) => {
  console.log(err);
});
