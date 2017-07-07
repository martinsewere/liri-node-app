var fs = require('fs');

var arg2 = process.argv[2];

var arg3 = process.argv[3];

//For twitter
var keys = require('./keys.js');
var twitter = require('twitter');
var params =20;
var client = new twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
});








// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says