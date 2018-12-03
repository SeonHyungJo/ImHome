const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema(
    {
        branchName: { type: String, required: true, unique: true },
        branchCode: { type: String, required: true, unique: true }
    },
    {
        timestamps: true
    }
);

storeSchema.statics.create = function(payload) {
    const product = new this(payload);
    return product.save();
};

storeSchema.statics.findAll = function() {
    return this.find().select({ _id: 0, branchCode: 1, branchName: 1 });
};

storeSchema.statics.findOneAndUpdateNew = function(branchCode, productInfo) {
    return this.findOneAndUpdate({ branchCode }, productInfo, { new: true });
};

storeSchema.statics.deleteByBranchCode = function(branchCode) {
    return this.remove({ branchCode });
};

storeSchema.statics.checkBranch = function(branchCode, branchName) {
    return this.findOne({ branchCode, branchName });
};

module.exports = mongoose.model('store', storeSchema);
