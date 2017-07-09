var arg2 = process.argv[2];

var arg3 = process.argv[3];

//For twitter, spotify and omdb
var twitter = require("twitter");
var twitterkeys = require("./keys.js");
var spotify = require("node-spotify-api");
var spotifyKeys = require("./keys.js/");
var omdb = require("./keys.js");
var request = require("request");
var fs = require("fs");



//Define Consumer keys and tokens
var keyOne = twitter.twitterKeys.consumer_key;
var keyTwo = twitter.twitterKeys.consumer_secret; 
var tokenOne = twitter.twitterKeys.access_token_key;
var tokenTwo = twitter.twitterKeys.access_token_secret;

var spotifyId = spotifyKeys.spotifyKeys.client_id;
var spotifySecret = spotifyKeys.spotifyKeys.client_secret;

var omdbKey = omdb.requestKeys.request_key;


// For Spotify

cla(process.argv[2], process.argv[3]);

function cla(command, param) {
	switch (command) {
		case "my-tweets" : getTweets();
		break;
		case "spotify-this-song" : spotify_this_song(params);
		break;
		case "movie-this" : movie_this(params);
		break;
		case "do-what-it-says" : do_what_it_says();
		break;
	}
}

function getTweets() {

var params =20;
var client = new twitter({
	consumer_key: keyOne,
	consumer_secret: keyTwo,
	access_token_key: tokenOne,
	access_token_secret: tokenTwo,
});

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for (var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].text + " Created on: " + tweets[i].created_at);
			}
		} else {
			console.log(error);
		}

	});
}

function spotify_this_song(song) {
	if(song == null) {
		song = "The Sign";
	}
	spotify.search({ type : 'track', query: song }, function(error, data) {
		if(error) {
			console.log(error);
			return;
		}
		console.log("Artist: " + data.tracks.items[0].artists[0].name);
		console.log("Song Name: " + data.tracks.items[0].name);
		console.log("Spotify Preview Link: " + data.tracks.items[0].external_urls.spotify);
		console.log("Album: " + data.tracks.items[0].album.name);
	});
}

function movie_this(movie) {
	if(movie == null) {
		movie = "Mr Nobody";
	}
	request('http://www.omdbapi.com/?t=' + movie + "&tomatoes=true", function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var movieData = JSON.parse(body);
			console.log("Title: " + movieData.Title);
			console.log("Year: " + movieData.Year);
			console.log("IMDB Ratings: " + movieData.imdbRating);
			console.log("Country: " + movieData.Country);
			console.log("Language: " + movieData.Language);
			console.log("Plot: " + movieData.Plot);
			console.log("Actors:" + movieData.Actors);
			console.log("Rotten Tomatoes Rating:" + movieData.tomatoUserRating);
			console.log("Rotten Tomatoes URL:" + movieData.tomatoURL);
			fs.appendFile('log.txt', "Title: " + movieData.Title + "\n" + "Year: " + movieData.Year + "\n" + "IMDB Rating: " + movieData.imdbRating + "\n" + "Country: " + movieData.Country + "\n" + "Language: " + movieData.Language + "\n" + "Plot: " + movieData.Plot + "\n" + "Actors: " + movieData.Actors + "\n" + "Rotten Tomatoes Rating: " + movieData.tomatoUserRating + "\n" + "Rotten Tomatoes URL: " + movieData.tomatoURL + "\n" + "=================================================================");
		}
		else {
			console.log(error);
		}
	});
}

function do_what_it_says() {
	fs.readFile("random.txt", "utf8", function(error, data) {
		var parameters = data.split(",");
		parameters[1] = parameters[1].replace(/"/g , " ").trim();
		cla(parameters[0], parameters[1]);
	});
}
