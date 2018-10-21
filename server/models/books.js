const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const booksSchema = new Schema({
  title : String,
  author: String,
  price : Number
},
{ timestamps: { createdAt: 'created_at' }});

const checkoutParam = (params) => {
  console.log(params)
  if(!params.title || !params.author || !params.price){
    throw new Error('Params Error')
  }
  return true;
}

// Create new book document
booksSchema.statics.create = function (payload) {
  // this === Model
  if(checkoutParam(payload)){
    const todo = new this(payload);
    return todo.save();
  }
};

// Find All
booksSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find({});
};

// Find One by Param
booksSchema.statics.findOneByTodoid = function(todoid) {
  return this.find({ price : todoid });
};

// Update by todoid
booksSchema.statics.updateByTodoid = function (todoid, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ todoid }, payload, { new: true });
};

// Delete by todoid
booksSchema.statics.deleteByTodoid = function (todoid) {
  return this.remove({ todoid });
};

module.exports = mongoose.model('books', booksSchema);