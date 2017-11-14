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
  fullVideoUrl: String, // 'https://www.youtube.com/watch?v='+ item.id.videoId
  videoUrl: String,
  channelTitle: String, //item.snippet.channelId
  publishedAt: String, //item.snippet.publishedAt
  thumbnail: String
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
    resolve(Item.find({}).limit(50));
  })
};

var clearDb = () =>{
  return new Promise((resolve, reject)=>{
  resolve(Item.remove({}));
  });
}

var randomizeDb = () =>{
  return new Promise((resolve, reject)=>{
  resolve(Item.aggregate({$sample:{size:1}}));
  });
}

//Pass save an array of items
let newItem;

let save = (items) => {
  return new Promise((resolve,reject) => {
  items.forEach((item)=>{
    newItem = new Item({
    title: item.snippet.title, //item.snippet.title
    description: item.snippet.description, //item.snippet.description
    fullVideoUrl: 'https://www.youtube.com/watch?v='+ item.id.videoId, // 'https://www.youtube.com/watch?v='+ item.id.videoId
    videoUrl: item.id.videoId,
    channelTitle:item.snippet.channelId, //item.snippet.channelId
    publishedAt: item.snippet.publishedAt, //item.snippet.publishedAt
    thumbnail: item.snippet.thumbnails.default.url
    })
    //let query = item.snippet.description;
    Item.findOneAndUpdate({'title':newItem.title}, {title: item.snippet.title,description: item.snippet.description,fullVideoUrl: 'https://www.youtube.com/watch?v='+ item.id.videoId, videoUrl: item.id.videoId, channelTitle:item.snippet.channelId,publishedAt: item.snippet.publishedAt, thumbnail:item.snippet.thumbnails.default.url}, {upsert:true}, (err,doc)=>{
      if(err) {throw err};
    })
    // newItem.save({'_id': item._id},(err,data) =>{
    //   if (err) {throw err};
    // });
  });
})
}


module.exports.selectAll = selectAll;
module.exports.save = save;
module.exports.clearDb = clearDb;
module.exports.randomizeDb = randomizeDb;