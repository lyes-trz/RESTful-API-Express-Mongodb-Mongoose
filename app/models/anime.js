var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnimeSchema = new Schema({

     name: String,
     genre: String,
     episodes: Number


});

module.exports = mongoose.model('Anime', AnimeSchema);



