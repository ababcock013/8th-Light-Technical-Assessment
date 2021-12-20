import axios from "axios"
import {} from "dotenv/config"
const URL = process.env.URL
const KEY = process.env.G_BOOKS_API_KEY

//Constrains query results to return only first 5 books
const PARAMS = "&printType=books&startIndex=0&maxResults=5"

export const retrieve = async (query, bookList = []) => {

   let books = await axios.get(`${URL}/volumes?q=${query}${PARAMS}${KEY}`)
        .then((res) => {
            let bookNum = 1
                bookList = res.data.items.map(item => {
                    return {
                        "Book Number": bookNum++,
                        title:item.volumeInfo.title,
                        authors:item.volumeInfo.authors,
                        publisher:item.volumeInfo.publisher
                    }
                })
            return bookList
        })
        .catch((e)=>{
            if(e.type === undefined && query === ""){
                console.log("Blank query, please provide a search term.")
            }else if(e.type === undefined){
                console.log("No results for term: " + decodeURIComponent(query))
            }
      })
    return books
}

