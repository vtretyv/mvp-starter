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
  return new Promise((resolve,reject) => {
    let options = {
      url: 'https://www.googleapis.com/youtube/v3/channels',
      headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
      },
      qs: {
        q:channel,
        maxResults: 3,

      }
    }
      searchYouTube({key: config.YOUTUBE_KEY, q: query, maxResults: 3, chart: 'mostPopular'}, (videos) => {
            resolve(videos);
        });
  });
  
};


module.exports.getVideosByQuery = getVideosByQuery;