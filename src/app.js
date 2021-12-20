import localStorage from "node-localStorage"
import chalk from "chalk";
import ora from "ora"

import prompt from "prompt";
import {retrieve} from './config/apiAccess.js'

const getAll = async (query)=>{
    await retrieve(encodeURIComponent(query)).then((data)=>{
        console.log(data)
        }
    )
}



prompt.start()
console.log(" Enter a search term:")
prompt.get('search', (err, result)=>{
    getAll(result.search)
})




