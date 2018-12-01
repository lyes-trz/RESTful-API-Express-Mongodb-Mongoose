var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Anime = require('./app/models/anime');



// Configure app for bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



// set up port for server to listen on
var port = process.env.PORT || 3000;



// Connect to db
mongoose.connect('mongodb://localhost:27017/codealong');



// Api routes
var router = express.Router();



// routes will all be prefixed with /api
app.use('/api', router) ;



// test route
router.get('/', function(req, res){
        res.json({message: 'Welcome to our Anime-API'});
});




router.route('/animes') 

 .post(function(req, res){
 	 var anime = new Anime(); // new instance of a Anime
 	 anime.name = req.body.name;
 	 anime.genre = req.body.genre;
 	 anime.episodes = req.body.episodes;
 	

 	 anime.save(function(err){
 	 	  if (err) {
 	 	  	res.send(err);
 	 	  }
 	 	  res.json({message: 'Anime was successfully manufactured'});
 	 });
 })

 .get(function(req, res){
 	 
 	 Anime.find(function(err, Animes){
 	 	  if (err) {
 	 	  	res.send(err);
 	 	  }
 	 	  res.json(Animes);
 	 });
 });



router.route('/anime/:anime_id')

     .get(function(req, res){
     	Anime.findById(req.params.anime_id, function(err, anime){
     		if (err) {
     			res.send(err);
     		}
     		res.json(anime);
     	});
     });
    
 router.route('/anime/:anime_id')  
    .delete(function(req, res){
    // destroy
    Anime.findByIdAndRemove(req.params.anime_id, function(err){
      	if(err){
      		res.send(err);
      	}
      });
});




router.route('/anime/name/:name')

     .get(function(req, res){
     	Anime.find({name: req.params.name}, function(err, anime){
     		if (err) {
     			res.send(err);
     		}
     		res.json(anime);
     	});
     });


router.route('/anime/genre/:genre')

     .get(function(req, res){
     	Anime.find({genre: req.params.genre}, function(err, anime){
     		if (err) {
     			res.send(err);
     		}
     		res.json(anime);
     	});
     });







//fire up server & msg to console
app.listen(port);
console.log("Server listening on port : " + port);

//