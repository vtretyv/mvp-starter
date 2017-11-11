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
  quantity: Number,
  name: String,
  description: String
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

let newItem;
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

//Pass save an array of items
var save = (items) => {
  items.forEach((item)=>{
    newItem = new Item({
    quantity: item.quantity,
    name: item.name,
    description: item.description
    });
    newItem.save((err,data) =>{
      if (err) {throw err};
    });
  });
}

module.exports.selectAll = selectAll;