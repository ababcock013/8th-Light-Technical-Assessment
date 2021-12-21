import boxen from "boxen";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./scratch");

let booksArray = [];
let temp = []
export const pickFavBook = (num) => {
  return new Promise((resolve) => {
    import("./scratch/books.js").then((books) => {
      let favBook = books.default[num - 1];
      booksArray.push(JSON.stringify(favBook));
      resolve();
      //return favBook
    });
  });
};

export const writeFavoriteToFile = async () => {
   // booksArray.push(booksArray)
    //console.log(temp)
  // await localStorage.setItem(
  //   "favBooks.js",
  //   JSON.stringify()
  //     .replace(/^/, "const favBooksList =")
  //     .concat(" \n export default favBooksList")
  // );
};

export const viewFavoriteBooks = async () => {


      console.log(
        boxen(booksArray.toString(), {
          title: `Your Favorite Books`,
          titleAlignment: "center",
          padding: 1,
          backgroundColor: "green",
          margin: 3,
          float: "center",
        })
      );


};
