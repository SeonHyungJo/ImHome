const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemsSchema = new Schema(
    {
        itemCode: { type: String, required: true, unique: true },
        itemName: { type: String, required: true },
        itemCount: { type: String, required: true },
        itemCost: { type: String, required: true },
        itemVolume: { type: String, required: true },
        itemDepth: { type: String, required: true }
    },
    {
        sparse: true,
        _id: false
    }
);

const productsSchema = new Schema(
    {
        companyName: { type: String, required: true },
        companyCode: { type: String, required: true, unique: true },
        productName: { type: String, required: true },
        productDesc: { type: String, required: true },
        items: [itemsSchema]
    },
    {
        timestamps: true
    }
);

// 이건뭐지
// productsSchema.statics.create = function(payload) {
//     const product = new this(payload);
//     return product.save();
// };

productsSchema.statics.findAll = function() {
    return this.find({});
};

productsSchema.statics.findByCompanyCode = function(companyCode) {
    return this.find({ companyCode });
};

productsSchema.statics.findOneUpdateById = function(id, payload) {
    return this.findOneAndUpdate({ id }, payload, { new: true });
};

productsSchema.statics.findOneAndUpdateNew = function(companyCode, productInfo) {
    return this.findOneAndUpdate({ companyCode }, productInfo, { new: true });
};

productsSchema.statics.deleteById = function(productId) {
    return this.deleteOne({ _id: productId });
};

/**
 * @author jinseong
 * @summary 새로운 품목 등록 (*주의* item과는 다른 개념임 )
 * @private
 * @memberof Admin
 * @param newProduct : 새 품목에 대한 json형식 정보
 * @see None
 * @returns product.save()
 */
productsSchema.statics.create = function(newProduct) {
    const product = new this(newProduct);
    return product.save();
};

module.exports = mongoose.model('products', productsSchema);
