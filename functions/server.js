const express = require('express');
const path = require('path');
const server = express();
const bodyParser = require('body-parser');

const MarkdownService = require('./service/markdownService')
const RestaurantService = require('./service/restaurantService')

server.use(bodyParser.json());

server.get('/', (req,res)=>{
    //const lastPath = path.dirname(__dirname)
    //const readmePath = path.join(lastPath, 'README.md')
    const targetPath = path.join(__dirname, 'build', 'index.html')
    //MarkdownService.parse(readmePath, targetPath)
    res.sendfile(targetPath)
})

server.get('/helloworld', (req, res) => {
    res.send({text:"Hello The Colorful World!"})
});

server.get('/search',(req,res)=>{
    let {query , facetFilters, page, hitsPerPage} = req.query

    facetFilters = JSON.parse(`[${facetFilters.split("'").join('"')}]`)
    page = parseInt(page)
    hitsPerPage = parseInt(hitsPerPage)

    RestaurantService.search(query, facetFilters, page, hitsPerPage).then(
        (result)=>{
            res.send(result)
        }
    ).catch((e)=>{
        res.send(e)
    })
})

server.post('/update', (req, res) => {
    RestaurantService.update(req.body)
    .then(()=>{
        res.send('post sucessful')
    })
});

server.delete('/delete', (req, res)=>{
    RestaurantService.delete(res.body.ids)
    .then(()=>{
        res.send('delete')
    })
})


module.exports = {
    server,
};