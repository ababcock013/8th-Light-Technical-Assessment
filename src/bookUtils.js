import boxen from "boxen";
//import chalk from "chalk"; // disabled  chalk for testing

const favBooks = [];

// Creates and returns an array of book objects
export const createBookList = async (data, bookList = []) => {
  let bookNum = 1;
  bookList = data.data.items.map((book) => {
    return {
      "Book Number": bookNum++,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      publisher: book.volumeInfo.publisher,
    };
  });
  return bookList;
};

//Chooses a book to save to favorites
export const pickFavBook = async (num, books) => {
  const pick = books[num - 1];
  favBooks.push(pick);
};

export const viewFavoriteBooks = async () => {
  console.log(
    boxen(JSON.stringify(favBooks), {
      title: `Your Favorite Books`,
      titleAlignment: "center",
      padding: 1,
      backgroundColor: "#255706",
      margin: 3,
      float: "center",
    })
  );
};

//************Input validation******************

//checks search input
export const isSearchValid = (query) => {
  const invalid = new RegExp(/^\s+$/);
  if (invalid.test(query) || query.length === 0) {
    //console.log(chalk.red("Empty search strings are not allowed."));
    console.log("Empty search strings are not allowed."); // chalk disabled for testing
    return false;
  } else {
    return query.trim();
  }
};

//checks if yes or no inputs are valid
export const isInputValid = (input) => {
  const invalid = new RegExp(/^n|y/, "gi");
  if (!invalid.test(input) || input.length === 0) {
    return false;
  } else {
    return input[0].toLowerCase();
  }
};

//checks if the number of the book chosen is between 1-5
export const isValidNumber = (input) => {
  const invalid = new RegExp(/^[1-5]$/);
  if (!invalid.test(input) || input.length === 0) {
    return false;
  } else {
    return input;
  }
};
