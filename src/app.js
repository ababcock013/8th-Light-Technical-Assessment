require('dotenv').config()
const getBooks = require('./config/apiAccess')
//const books = require('./books');
const prompt = require('prompt');

const getAll = async (query)=>{
    await getBooks.retrive(encodeURIComponent(query)).then((data)=>{
        console.log(data)
        }
    )
}



prompt.start()
console.log(" Enter a search term:")
prompt.get('search', (err, result)=>{
    getAll(result.search)
})




