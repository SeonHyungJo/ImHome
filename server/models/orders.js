const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemsSchema = new Schema(
    {
        itemCode: { type: String, required: true },
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

const orderSchema = new Schema(
    {
        orderId: { type: String, required: true },
        branchName: { type: String, required: true },
        branchCode: { type: String, required: true },
        items: [itemsSchema],
        complete: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

/**
 * @author seonhyungjo
 * @summary 주문내역 생성
 * @private
 * @memberof Admin
 * @param payload : Json형식 데이터
 * @see None
 * @returns «Query»
 */
orderSchema.statics.create = function(payload) {
    const product = new this(payload);
    return product.save();
};

/**
 * @author seonhyungjo
 * @summary 출고완료되지 않은 주문내역 가져오기
 * @private
 * @memberof Admin
 * @param branchCode : 지점코드로 구분
 * @see None
 * @returns «Query»
 */
orderSchema.statics.findInCompleteOrder = function(branchCode) {
    return this.find({ branchCode, complete: false });
};

/**
 * @author seonhyungjo
 * @summary 주문내역 업데이트
 * @private
 * @memberof Admin
 * @param branchCode : 지점코드로 구분
 * @param productInfo : 수정하는 Json형식 데이터
 * @see None
 * @returns «Query»
 */
orderSchema.statics.findOneAndUpdateNew = function(branchCode, productInfo) {
    return this.findOneAndUpdate({ branchCode, complete: false }, productInfo, { new: true });
};

/**
 * @author seonhyungjo
 * @summary Complete = true로 변경 진행(출고완료처리)
 * @private
 * @memberof AdminchangeCompleteTrue
 * @param branchCode : 지점코드로 구분
 * @see None
 * @returns «Query»
 */
orderSchema.statics.changeCompleteTrue = function(branchCode) {
    return this.findOneAndUpdate({ branchCode, complete: false }, { complete: true });
};

orderSchema.statics.deleteByBranchCode = function(branchCode) {
    return this.remove({ branchCode });
};

module.exports = mongoose.model('orders', orderSchema);
