const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//User 관련 스키마 선언
const usersSchema = new Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  name: { type: String, required: true },
  bNumber: { type: String, required: true, unique: true },
  bAddress: { type: String, required: true },
  cName: { type: String, required: true },
  email: { type: String, required: true },
  pNumber: { type: String, required: true },
  branchName: { type: String, required: true },
  branchCode: { type: String, required: true, unique: true }
},
{
  timestamps: true
});

// Create new user document
usersSchema.statics.create = function (payload) {
  const todo = new this(payload);
  return todo.save();
};

// Find All User
usersSchema.statics.findAll = function () {
  return this.find({});
};

// Find One
usersSchema.statics.findOneById = function (id) {
  return this.find({ id: id });
};

// Update by branchCode
usersSchema.statics.findOneById = function (id, payload) {
  return this.findOneAndUpdate({ id }, payload, { new: true });
};

// Delete by branchCode
usersSchema.statics.deleteById = function (id) {
  return this.remove({ id });
};

// verify the password of the User documment
usersSchema.methods.verify = function(password) {
  return this.password === password
}

usersSchema.methods.assignAdmin = function() {
  this.admin = true
  return this.save()
}

module.exports = mongoose.model('users', usersSchema);