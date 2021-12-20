

import chalk from "chalk";
import ora from "ora"

import prompt from "prompt";
import {retrieve} from './config/apiAccess.js'


const getAll = async (query)=>{
    const spinner = ora("Retrieving books...").start()
    await retrieve(encodeURIComponent(query)).then((data)=>{
        //console.log(data)
        spinner.succeed("Books received!")
        localStorage.setItem('books', data);
        }
    )
}



prompt.start()
console.log(" Enter a search term:")
prompt.get('search', (err, result)=>{
    getAll(result.search)
    console.log(localStorage.getItem('books'))
})




