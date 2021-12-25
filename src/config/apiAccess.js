import axios from "axios";
import { createBookList } from "../bookUtils.js";

// I normally use .env for these types of data
const URL = "https://www.googleapis.com/books/v1/volumes?q=";
const KEY = "&key=AIzaSyAnrofpaQau3mJIktgSO_K8wz2p11_-ecc";
const PARAMS = "&printType=books&startIndex=0&maxResults=5";

// Retrieve now is only responsible for fetching data from the api,
// passing it to createBookList and returning the data or false
export const retrieve = async (query) => {
  return axios
    .get(`${URL}${query}${PARAMS}${KEY}`)
    .then((res) => {
      if (res.data.totalItems) {
        return createBookList(res);
      } else {
        return false;
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
