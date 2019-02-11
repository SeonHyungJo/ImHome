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
    tradeStatementCount: { type: Number, default: 0 },
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

orderSchema.statics.findAllOrder = function(payload) {
  return this.find().select({
    _id: 1,
    branchCode: 1,
    branchName: 1,
    items: 1,
    updatedAt: 1,
    complete: 1
  });
};

/**
 * @author seonhyungjo
 * @summary 해당 지점의 출고완료된 주문내역 리스트 가져오기
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 */
orderSchema.statics.findOrderList = function(branchCode) {
  return this.find({ branchCode, complete: true }).select({
    _id: 1,
    branchCode: 1,
    branchName: 1,
    items: 1,
    updatedAt: 1
  });
};

/**
 * @author seonhyungjo
 * @summary 출고완료되지 않은 브랜치 리스트
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 */
orderSchema.statics.findInCompleteBranches = function() {
  return this.find({ complete: false })
    .select({ _id: 1, branchCode: 1, branchName: 1, updatedAt: 1 })
    .sort({ updatedAt: -1 });
};

/**
 * @author seonhyungjo
 * @summary 출고완료되지 않은 주문내역 가져오기
 * @private
 * @memberof Admin
 * @param _id : 주문 아이디
 * @see None
 * @returns «Query»
 */
orderSchema.statics.findInCompleteOrderByBranchcode = function(_id) {
  return this.find({ _id, complete: false });
};

/**
 * @author seonhyungjo
 * @summary 출고된 주문내역 가져오기
 * @private
 * @memberof Admin
 * @param branchCode : 지점코드로 구분
 * @see None
 * @returns «Query»
 */
orderSchema.statics.findCompleteOrderByBranchcode = function(branchCode) {
  return this.find({ branchCode, complete: true });
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
orderSchema.statics.findInCompleteOrderByBranchcode = function(branchCode) {
  return this.find({ branchCode, complete: false }).select({
    _id: 1,
    branchCode: 1,
    branchName: 1,
    items: 1,
    updatedAt: 1
  });
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
  return this.findOneAndUpdate({ branchCode, complete: false }, productInfo, {
    new: true
  });
};

/**
 * @author seonhyungjo
 * @summary Complete = true로 변경 진행(출고완료처리)
 * @private
 * @memberof Admin
 * @param branchCode : 지점코드로 구분
 * @see None
 * @returns «Query»
 */
orderSchema.statics.changeCompleteTrue = function(branchCode) {
  return this.findOneAndUpdate(
    { branchCode, complete: false },
    { complete: true }
  );
};

/**
 * @author seonhyungjo
 * @summary 주문내역을 삭제한다.
 * @private
 * @memberof AdminchangeCompleteTrue
 * @param _id : 주문 아이디
 * @see None
 * @returns «Query»
 */
orderSchema.statics.deleteByBranchCode = function(_id) {
  return this.remove({ _id });
};

module.exports = mongoose.model('orders', orderSchema);
