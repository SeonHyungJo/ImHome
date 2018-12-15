const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
    itemName: { type: String, required: true },
    itemCount: { type: String },
    itemCost: { type: String },
    itemVolume: { type: String },
    itemDepth: { type: Number, required: true },
    parentId: { type: String, required: true },
    itemDesc: { type: String }
});

const productsSchema = new Schema(
    {
        companyName: { type: String, required: true },
        companyCode: { type: String, required: true, unique: true },
        items: [itemsSchema]
    },
    {
        timestamps: true
    }
);

productsSchema.statics.findAll = function() {
    return this.find({});
};

productsSchema.statics.findByCompanyCode = function(companyCode) {
    return this.findOne({ companyCode });
};

productsSchema.statics.findOneUpdateById = function(id, payload) {
    return this.findOneAndUpdate({ id }, payload, { new: true });
};

productsSchema.statics.deleteById = function(productId) {
    return this.deleteOne({ _id: productId });
};

/**
 * @author jinseong
 * @summary 새로운 item 등록
 * @param companyCode: 부모 컴퍼니의 코드, itemInfo : 새 품목에 대한 json형식 정보
 * @returns product
 */
productsSchema.statics.findOneAndUpdateNew = function(companyCode, itemInfo) {
    return this.findOneAndUpdate({ companyCode }, { $push: { items: itemInfo } }, { new: true });
};

/**
 * @author jinseong
 * @summary item 변경
 * @param companyCode: 부모 컴퍼니의 코드, iteminfo: 변경 품목에 대한 json형식 정보
 * @returns product
 */
productsSchema.statics.findOneAndUpdateItem = function(companyCode, itemInfo) {
    return this.findOneAndUpdate(
        { companyCode: companyCode, 'items._id': itemInfo._id },
        {
            'items.$.itemName': itemInfo.itemName,
            'items.$.itemCount': itemInfo.itemCount,
            'items.$.itemCost': itemInfo.itemCost,
            'items.$.itemVolume': itemInfo.itemVolume
        },
        { new: true }
    );
};

/**
 * @author jinseong
 * @summary item 삭제
 * @param companyCode: 부모 컴퍼니의 코드, iteminfo: 삭제 item id
 * @returns product
 */
productsSchema.statics.findOneAndUpdateDelete = function(companyCode, itemInfo) {
    return this.findOneAndUpdate({ companyCode }, { $pull: { items: itemInfo } }, { new: true });
};

/**
 * @author jinseong
 * @summary 새로운 품목 등록 (*주의* item과는 다른 개념임 )
 * @param newProduct : 새 품목에 대한 json형식 정보
 * @returns product.save()
 */
productsSchema.statics.create = function(newProduct) {
    const product = new this(newProduct);
    return product.save();
};

module.exports = mongoose.model('products', productsSchema);
