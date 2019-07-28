const AlgoliaDao = require('../dao/algoliaDao')
const FirebaseDao = require('../dao/firebaseDao')
const AlgoliaParser = require('../parser/algoliaParser')

class RestaurantService{
    constructor(){
        if(RestaurantService._self){
            return RestaurantService._self
        }
        else{
            this.firebase = new FirebaseDao();
            this.algolia = new AlgoliaDao();
            RestaurantService._self = this;
        }
    }

    search(query='', facetFilters=[], page=0, hitsPerPage=20){
        return this.algolia.search(query, facetFilters, page, hitsPerPage)
        .then((result)=>{
            return {
                Restaurants:result.hits.map((record)=>AlgoliaParser.record2Restaurant(record)),
                page:result.page,
                hitsPerPage:result.hitsPerPage,
                allPage:result.nbPages,
                allRestaurants:result.nbHits
            }
        })
    }

    update(data){
        let works = []
        // mean update for data
        if(data.objectID){
            works.push(this.algolia.update(data))
        }
        else{
            this.firebase.search('database/algolia/id_sequence').then((id)=>{
                
                let newId = (id.val() +1);
                data.objectID = newId;
                console.log(newId)
                console.log(AlgoliaParser.record2Restaurant(data));
                works.push(
                    this.algolia.update(AlgoliaParser.record2Restaurant(data))
                );

                works.push(
                    this.firebase.update('database/algolia/', {id_sequence:newId})
                );
            })

            return Promise.all(works)
        }
    }

    delete(objectID){
       return this.algolia.delete(objectID)
    }
}
let rstService = new RestaurantService()
module.exports = rstService