import axios from "axios";
// I normally use .env for these types of data
const URL = "https://www.googleapis.com/books/v1/volumes?q=";
const KEY = "&key=AIzaSyAnrofpaQau3mJIktgSO_K8wz2p11_-ecc";

const PARAMS = "&printType=books&startIndex=0&maxResults=5";

export const retrieve = async (query, bookList = []) => {
  return axios
    .get(`${URL}${query}${PARAMS}${KEY}`)
    .then((res) => {
      let bookNum = 1;
      bookList = res.data.items.map((item) => {
        return {
          "Book Number": bookNum++,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors,
          publisher: item.volumeInfo.publisher,
        };
      });
      return bookList;
    })
    .catch((e) => {
      if (e.type === undefined && query === "") {
        console.log("Blank query, please provide a search term.");
      } else if (e.type === undefined) {
        throw new Error(
          `No results for term: ${decodeURIComponent(
            query
          )}! This is not a usual error, check what you typed, It'd had to have been something REALLY crazy!!`
        );
      }
    });
};
