import enquirer from "enquirer";
import boxen from "boxen";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./scratch/");

import chalk from "chalk";
import ora from "ora";

import prompt from "prompt";
import { retrieve } from "./config/apiAccess.js";
import Enquirer from "enquirer";


const getAll = async (query) => {
  const spinner = ora("Retrieving books...").start();
  await retrieve(encodeURIComponent(query)).then((data) => {
    console.log(data);
    spinner.succeed("Books received!");
    localStorage.setItem(
      "books.js",
      JSON.stringify(data)
        .replace(/^/, "const books =")
        .concat(" \n export default books")
    );
    //console.log(localStorage.getItem('books'))
  });
};

prompt.start();
console.log('Welcome to Book Search')
console.log(" Enter a search term to find a book:");
prompt.get("search", (err, result) => { getAll(result.search) })




