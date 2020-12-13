const mc = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const dbname = "bbblog";
exports.loadView = function(app, viewPort, apiPort){
    
    const urls = {
        viewUrl : "http://learning.techfryday.com:"+viewPort,
        apiUrl : "http://learning.techfryday.com:"+apiPort
    };

    app.set('view engine', 'ejs');

    var filepath = __dirname;

    app.listen(viewPort, function(){});

    app.get("/", function(req, res){

        res.render('addBlog.ejs', {usefuls:{url:urls}});

    });

    app.get("/allBlogs", function(req, res){

        res.render('allBlogs.ejs', {usefuls:{url:urls}});

    });

    app.get("/blogDetails/:blogId", function(req, res){

        mc.connect('mongodb://localhost:27017', function(err, dbs){
            var db = dbs.db(dbname);
            var col = db.collection("blogs");
            console.log(req.params.blogId);
            col.find({_id:ObjectId(req.params.blogId)}).toArray(function(err, docs){
                // console.log(docs);
                res.render("blogDetails.ejs", {usefuls:{bdetails:docs[0], url:urls}});
            });
        });
        

    });


    // Included Files Loading
    app.get("/vendors/*.css", function(req, res){
        res.sendFile(__dirname+req.url);
    });

    app.get("/vendors/*.js", function(req, res){
        res.sendFile(__dirname+req.url);
    });

    app.get("/uploads/*", function(req, res){
        res.sendFile(__dirname+req.url);
    });
    
    
    
}