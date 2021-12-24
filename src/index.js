// noinspection JSCheckFunctionSignatures
import boxen from "boxen";
import chalk from "chalk";
import ora from "ora";
import prompt from "prompt-async";
import { retrieve } from "./config/apiAccess.js";
import {
  isInputValid,
  isSearchValid,
  isValidNumber,
  pickFavBook,
  viewFavoriteBooks,
} from "./bookUtils.js";

let booksArray = [];

//Handles search function and UI view
const performBookSearch = async (query) => {
  retrieve(encodeURIComponent(query))
    .then((data) => {
      return data;
    })
    .then((data) => {
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
        booksArray.length = 0;
        data.map((item) => {
          booksArray.push(item);
        });

        console.log("Books written to file.");
      } else {
        spinner.fail(chalk.red("Sorry, search failed."));
      }
    })
    .then(() => {
      prompt.start();
      promptForNumber();
    });
};

//Main prompt and entry to search
const promptForSearch = async () => {
  console.log("Welcome to Book Search");
  console.log(" Enter a search term to find a book:");
  prompt.get("search", (err, result) => {
    if (!isSearchValid(result.search)) {
      //console.log("Your search was blank");
      promptForSearch();
    } else {
      performBookSearch(result.search);
    }
  });
};
//Prompt to ask to continue search
const promptToContinue = async () => {
  console.log(
    "Perform another search and add more books to your list? y for yes, n to exit."
  );
  await prompt.get("yesNo", async (err, result) => {
    let input = await isInputValid(result.yesNo);
    if (input === "y") {
      await promptForSearch();
    }
    if (input === "n") {
      console.log(chalk.green("Exiting Book Search, Good bye."));
    } else if (input === false) {
      console.log(chalk.red("Enter y or n only."));
      await promptToContinue();
    }
  });
};

//Prompt for picking book to add to favorites list
const promptForNumber = () => {
  console.log(
    boxen(
      "Review the list and choose a book by number to add it to your favorites: "
    )
  );
  prompt.get("number", async (err, result) => {
    let number = result.number;
    if (!isValidNumber(number)) {
      console.log(chalk.red("Only numbers 1-5 are valid"));
      promptForNumber();
    } else {
      await pickFavBook(number, booksArray)
        .then(async () => {
          await viewFavoriteBooks();
        })
        .then(() => {
          promptToContinue();
        });
    }
  });
};

//starts the CLI for the program
promptForSearch().catch((err) => {
  console.log(err);
});
