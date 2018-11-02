const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
  itemCode: { type: String, required: true, unique: true },
  itemName: { type: String, required: true },
  itemCount: { type: String, required: true },
  itemCost: { type: String, required: true },
  itemVolume: { type: String, required: true },
  itemDepth: { type: String, required: true },
},
{
  sparse: true,
  _id: false
});

const productsSchema = new Schema({
  companyName: { type: String, required: true },
  companyCode: { type: String, required: true, unique: true },
  items: [itemsSchema],
},
{
  timestamps: true,
});

productsSchema.statics.create = function (payload) {
  const product = new this(payload);
  return product.save();
};

productsSchema.statics.findAll = function () {
  return this.find({});
};

productsSchema.statics.findOneByCompanyCode = function (companyCode) {
  return this.find({ companyCode });
};

productsSchema.statics.deleteById = function (id) {
  return this.remove({ id });
};

productsSchema.methods.assignAdmin = function () {
  this.admin = true
  return this.save()
}

module.exports = mongoose.model('products', productsSchema);