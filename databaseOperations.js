const mc = require('mongodb').MongoClient;
exports.getBlogDetails = function(bid){
    mc.connect('mongodb://localhost:2017', function(err, dbs){
        var db = dbs.db("bbblog");
        var col = db.collection("blogs");
        col.find().toArray(function(err, docs){
            
        });
    });
}