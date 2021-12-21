import axios from 'axios'

const URL = "https://www.googleapis.com/books/v1/volumes?q=";
const KEY = "&key=AIzaSyAnrofpaQau3mJIktgSO_K8wz2p11_-ecc";

const PARAMS = "&printType=books&startIndex=0&maxResults=5";

export const retrieve = async(query, bookList = []) => {
    let books = axios
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
                console.log("No results for term: " + decodeURIComponent(query));
            }
        });

    return books;
}

// exports.retrieve = retrieve;

// import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();
//
// const URL = "https://www.googleapis.com/books/v1/volumes?q=";
// const KEY = "&key=AIzaSyAnrofpaQau3mJIktgSO_K8wz2p11_-ecc";
// //Constrains query results to return only first 5 books
// const PARAMS = "&printType=books&startIndex=0&maxResults=5";
//
// export const retrieve = (query, bookList = []) => {
//   let books = axios
//     .get(`${URL}${query}${PARAMS}${KEY}`)
//     .then((res) => {
//       let bookNum = 1;
//       bookList = res.data.items.map((item) => {
//         return {
//           "Book Number": bookNum++,
//           title: item.volumeInfo.title,
//           authors: item.volumeInfo.authors,
//           publisher: item.volumeInfo.publisher,
//         };
//       });
//
//       return bookList;
//     })
//     .catch((e) => {
//       if (e.type === undefined && query === "") {
//         console.log("Blank query, please provide a search term.");
//       } else if (e.type === undefined) {
//         console.log("No results for term: " + decodeURIComponent(query));
//       }
//     });
//
//   return books;
// };
