const Algolia = require('algoliasearch')
const config = require('../config')

class AlgoliaDao{

    constructor(){
        const { NODE_ENV='development' } = process.env
        let {apiKey, index, appId} = config[NODE_ENV].algolia
        this._algolia = Algolia(appId, apiKey, {timeout:2000})
        this._index = this._algolia.initIndex(index)
    }

    search(query='', facetFilters=[], page=0, hitsPerPage=20, option={}){
        if (typeof (query) !== 'string') {
            throw new Error('query must be a string')
        }

        if (!Array.isArray(facetFilters)) {
            throw new Error('facetFilters must be a one or two dimension array')
        }

        if (typeof (page) !== 'number') {
            throw new Error('page must be a number')
        }

        if (typeof (hitsPerPage) !== 'number') {
            throw new Error('hitsPerPage must be a number')
        }

        let queryparameters = {
            query,
            facetFilters,
            page,
            hitsPerPage,
            ...option
        }
        console.log(queryparameters)

        return this._index.search(queryparameters)
    }

    update(updateData = []){
        return this._index.partialUpdateObject(updateData)
    }

    delete(ids = []){
        return this._index.deleteObjects(ids)
    }

    _check(){
        if(!this._index){
            throw new Error("Algolia Index init fail")
        }
    }
}

module.exports = AlgoliaDao