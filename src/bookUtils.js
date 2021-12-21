
import boxen from "boxen";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./scratch");

let booksArray = [{name: "not a book!"}];

export const pickFavBook = (num) => {
  return new Promise((resolve) => {
      import("./scratch/books.js").then((books)=>{
          // console.log(books.default[1])
          let favBook = books.default[num -1];
          booksArray.push(favBook);
          console.log(booksArray)
      })

    resolve()
  });
};

export const writeFavoriteToFile = async() => {
  localStorage.setItem(
    "favBooks.js",
    JSON.stringify(booksArray)
      .replace(/^/, "const favBooksList =")
      .concat(" \n export default favBooksList")
  );
};

export const viewFavoriteBooks = async () => {
  await import("./scratch/favBooks.js")
    .then((file) => {
      console.log(
        boxen(JSON.stringify(file, null, 1), {
          title: `Your Favorite Books`,
          titleAlignment: "center",
          padding: 1,
          backgroundColor: "green",
          margin: 3,
          float: "center",
        })
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

// favBooks(0);
// favBooks(3);
// favBooks(1);
// //console.log(booksArray);
// writeFavs()
// viewFavBooks()
