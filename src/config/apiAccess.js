import axios from "axios";
// I normally use .env for these types of data
const URL = "https://www.googleapis.com/books/v1/volumes?q=";
const KEY = "&key=AIzaSyAnrofpaQau3mJIktgSO_K8wz2p11_-ecc";

const PARAMS = "&printType=books&startIndex=0&maxResults=5";

export const retrieve = async (query, bookList = []) => {
  return axios
    .get(`${URL}${query}${PARAMS}${KEY}`)
    .then((res) => {
      return createBookList(res);
    })
    .catch((e) => {
      console.log(e);
    });
};

const createBookList = async (data, bookList = []) => {
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
