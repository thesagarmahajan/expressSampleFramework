const multipart = require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  __dirname+'/uploads' });
const bodyParser = require('body-parser');
const cors = require('cors');
const mc = require('mongodb').MongoClient;
const dbname = "bbblog";
exports.api = function(app, port){
    
    app.listen(port, function(){});
    app.use(cors());
    

    

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    
        mc.connect("mongodb://localhost:27017", function(err, dbs){
            var db = dbs.db(dbname);
            var col = db.collection("blogs");
                app.post("/uploadBlog", function(req, res){
                    console.log(req.body);
                    col.insertOne(req.body, function(err, res){
                        if (err) throw err;
                    });
                    res.json({SUCCESS:"BLOG_ADDED"});
                });

                app.get("/allBlogs", function(req, res){

                    col.find().toArray(function(err, docs){

                        console.log(docs);
                        res.json(docs);

                    });
            
                });
        });
    
    
    app.post("/uploadBlogImage", multipartMiddleware, function(req, res){
        console.log(req.files);
        var filePath = req.files.uploads.path;
        filePath = "/uploads/"+filePath.split("uploads/")[1];
        res.json({"filePath":filePath});
    });
    
}