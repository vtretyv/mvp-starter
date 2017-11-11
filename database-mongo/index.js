var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
let Promise = require('bluebird');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  title: String, //item.snippet.title
  description: String, //item.snippet.description
  videoUrl: String, // 'https://www.youtube.com/watch?v='+ item.id.videoId
  channelTitle: String, //item.snippet.channelId
  publishedAt: String //item.snippet.publishedAt
});

var Item = mongoose.model('Item', itemSchema);


//With callbacks
// var selectAll = function(callback) {

//   Item.find({}, function(err, items) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, items);
//     }
//   });
// };

// var save = (items,callback) => {
//   items.forEach((item)=>{
//   newItem = new Item({
//     quantity: item.quantity,
//     name: item.name,
//     description: item.description
//   });
//   newItem.save((err,data) =>{
//     if (err) {throw err};
//     callback(data); //Callback here?
//   });
//   });
// }

//With Promises
var selectAll = ()=>{
  return new Promise((resolve,reject)=>{
    resolve(Item.find({}));
  })
};

var clearDb = () =>{
  db.items.remove({});
}

//Pass save an array of items
let newItem;

let save = (items) => {
  items.forEach((item)=>{
    newItem = new Item({
    title: item.snippet.title, //item.snippet.title
    description: item.snippet.description, //item.snippet.description
    videoUrl: 'https://www.youtube.com/watch?v='+ item.id.videoId, // 'https://www.youtube.com/watch?v='+ item.id.videoId
    channelTitle:item.snippet.channelId, //item.snippet.channelId
    publishedAt: item.snippet.publishedAt, //item.snippet.publishedAt
  })
  
  newItem.save((err,data) =>{
    if (err) {throw err};
  });
  });
}


module.exports.selectAll = selectAll;