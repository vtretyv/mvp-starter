const axios = require('axios'); //Change over to axios soon
const request = require('request');
const config = require('../config.js'); //Need to put youtube API key in here
const Promise = require('bluebird');
const searchYouTube= require('youtube-search-api-with-axios');

let getVideosByQuery = (query) => {
  return new Promise((resolve,reject) => {
      searchYouTube({key: config.YOUTUBE_KEY, q: query, maxResults: 5, chart: 'mostPopular'}, (videos) => {
            resolve(videos);
        });
  });
};
let getVideosByChannel = (channel)=>{
  
  
};


module.exports.getVideosByQuery = getVideosByQuery;