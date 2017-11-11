var express = require('express');
var bodyParser = require('body-parser');
var config = require('../config.js')
var yt = require('../helpers/youtube.js')
var searchYouTube= require('youtube-search-api-with-axios');

// import searchYouTube from 'youtube-api-search';
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var items = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

//With Callbacks
// app.get('/items', function (req, res) {
//   items.selectAll(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

//With Promises
app.post('/items', (req, res) => {
  //Have user either enter a youtube search query and take the first result or have them enter a youtube url
    //Add this video item to the database under their favorites if it's not already there
      //Create a button that takes the top N videos of the favorite list, and returns a list of related videos.
      
  //This will have to get the search term, then query the youtube api for a search object
  console.log('In the post');
  console.log('req.body', req.body);
  if (req.body.query === '!clear') {
    items.clearDB().then(()=>{
      res.end();
    })
  }
  // let queryData = {
  //   q: req.body.query,
  //   maxResults: 5,
  //   part: 'snippet',
  //   key: config.YOUTUBE_KEY,
  //   chart: 'mostPopular'
  // }
  // console.log('logging the actual npm call, hope it\'s a promise', yt.getVideosByQuery(req.body.query))
  yt.getVideosByQuery(req.body.query).then((videos)=>{
    //Now have access to this in the promise
      //Can put them into the database now once I import database file
        //db.save them;
        items.save(videos).then(()=>{
          res.end();
        })
        
    
    
  })
  // searchYouTube({key: config.YOUTUBE_KEY, q: req.body.query, maxResults: 5, chart: 'mostPopular'}, (videos) => {
  //         console.log(videos);
  //     });
  res.end();
});
app.get('/items', function (req, res) {

  // items.selectAll(function(err, data) {
  //   if(err) {
  //     res.sendStatus(500);
  //   } else {
  //     res.json(data);
  //   }
  // });
  items.selectAll().then((results)=>{
    res.status(200);
    res.json(results);
    // res.json("[{user:'vlad'}]");
  })
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

