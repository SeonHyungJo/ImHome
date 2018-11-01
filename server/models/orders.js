const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
  itemCode: { type: String, required: true },
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

const orderSchema = new Schema({
  branchName: { type: String, required: true },
  branchCode: { type: String, required: true },
  items: [itemsSchema],
  complete: { type: Boolean, default: false },
},
{
  timestamps: true,
});

orderSchema.statics.create = function (payload) {
  const product = new this(payload);
  return product.save();
};

orderSchema.statics.findAll = function () {
  return this.find({});
};

orderSchema.statics.findOneByBranchCode = function (branchCode) {
  return this.find({ branchCode, complete: false });
};

orderSchema.statics.findOneAndUpdateNew = function (branchCode, productInfo) {
  return this.findOneAndUpdate({ branchCode }, productInfo, { new: true });
};

orderSchema.statics.deleteByBranchCode = function (branchCode) {
  return this.remove({ branchCode });
};

module.exports = mongoose.model('orders', orderSchema);