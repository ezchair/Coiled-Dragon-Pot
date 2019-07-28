const { RestaurantRecord } = require('../Cooking-Master-Boy/src/index')

class AlgoliaParser{
    static record2Restaurant(record){
        let rst = new RestaurantRecord()
        rst._geoloc = record._geoloc;
        rst.address = record.address;
        rst.customize = record.customize || {};
        rst.reliability = record.reliability;
        rst.founder = record.founder;
        rst.name = record.name;
        rst.objectID = record.objectID || null;
        rst.recommended_dishes = record.recommended_dishes || [];
        rst.average_cost = record.average_cost;

        return rst
    }

}

module.exports = AlgoliaParser