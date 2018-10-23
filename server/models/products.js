const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  companyName: { type: String, required: true },
  companyCode: { type: String, required: true },
  items: [{
    itemCode: { type: String, required: true, unique: true },
    itemName: { type: String, required: true },
    itemCount: { type: String, required: true },
    itemCost: { type: String, required: true },
    itemVolume: { type: String, required: true },
    itemDepth: { type: String, required: true },
  }],
},
{
  timestamps: true
});

productsSchema.statics.create = function (payload) {
  const product = new this(payload);
  console.log(product);
  return product.save();
};

productsSchema.statics.findAll = function () {
  return this.find({});
};

productsSchema.statics.findOneById = function (id) {
  return this.find({ id: id });
};

productsSchema.statics.findOneById = function (id, payload) {
  return this.findOneAndUpdate({ id }, payload, { new: true });
};

productsSchema.statics.deleteById = function (id) {
  return this.remove({ id });
};

productsSchema.methods.verify = function (password) {
  return this.password === password
}

productsSchema.methods.assignAdmin = function () {
  this.admin = true
  return this.save()
}

module.exports = mongoose.model('products', productsSchema);