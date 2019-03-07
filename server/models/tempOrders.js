const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
  itemName: { type: String, required: true },
  itemCount: { type: String, required: true },
  itemCost: { type: String, required: true },
  itemVolume: { type: String, required: true },
  itemDepth: { type: String, required: true }
});

const tempOrder = new Schema(
  {
    branchName: { type: String, required: true },
    branchCode: { type: String, required: true },
    companyCode: { type: String, required: true },
    items: [itemsSchema],
    tradeStatementCount: { type: Number, default: 0 },
    complete: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

/**
 * @author Jinseong
 * @summary 주문내역 생성
 * @private
 * @memberof Admin
 * @param payload : Json형식 데이터
 * @see None
 * @returns «Query»
 */
tempOrder.statics.create = function(payload) {
  const tempOrder = new this(payload);
  return tempOrder.save();
};

tempOrder.statics.findAllOrder = function(payload) {
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
 * @author Jinseong
 * @summary 해당 지점의 출고완료된 주문내역 리스트 가져오기
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 */
tempOrder.statics.findOrderList = function(branchCode) {
  return this.find({ branchCode, complete: true }).select({
    _id: 1,
    branchCode: 1,
    branchName: 1,
    items: 1,
    updatedAt: 1
  });
};

/**
 * @author Jinseong
 * @summary 출고완료되지 않은 브랜치 리스트
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 */
tempOrder.statics.findInCompleteBranches = function() {
  return this.find({ complete: false })
    .select({ _id: 1, branchCode: 1, branchName: 1, updatedAt: 1 })
    .sort({ updatedAt: -1 });
};

// /**
//  * @author Jinseong
//  * @summary 출고완료되지 않은 주문내역 가져오기
//  * @private
//  * @memberof Admin
//  * @param _id : 주문 아이디
//  * @see None
//  * @returns «Query»
//  */
// tempOrder.statics.findInCompleteOrderByBranchcode = function(_id) {
//   return this.find({ _id, complete: false });
// };

/**
 * @author Jinseong
 * @summary 출고된 주문내역 가져오기
 * @private
 * @memberof Admin
 * @param branchCode : 지점코드로 구분
 * @see None
 * @returns «Query»
 */
tempOrder.statics.findCompleteOrderByBranchcode = function(branchCode) {
  return this.find({ branchCode, complete: true });
};

/**
 * @author Jinseong
 * @summary 임시저장 주문 가져오기
 * @private
 * @memberof Admin
 * @param branchCode : 지점코드로 구분, companyCode : 업체코드로 구분
 * @see None
 * @returns «Query»
 */
tempOrder.statics.findTempOrderByBranchcodeAndCompanyCode = function(branchCode, companyCode) {
  return this.find({ branchCode, companyCode, complete: false }).select({
    _id: 1,
    companyCode: 1,
    branchCode: 1,
    branchName: 1,
    items: 1,
    updatedAt: 1
  });
};

/**
 * @author Jinseong
 * @summary 주문내역 업데이트
 * @private
 * @memberof Admin
 * @param branchCode : 지점코드로 구분
 * @param companyCode : 업체코드
 * @param productInfo : 수정하는 Json형식 데이터
 * @see None
 * @returns «Query»
 */
tempOrder.statics.findOneAndUpdateNew = function(branchCode, companyCode, productInfo) {
  return this.findOneAndUpdate({ branchCode, companyCode, complete: false }, productInfo, {
    new: true
  });
};

/**
 * @author Jinseong
 * @summary Complete = true로 변경 진행(출고완료처리)
 * @private
 * @memberof Admin
 * @param branchCode : 지점코드로 구분
 * @see None
 * @returns «Query»
 */
tempOrder.statics.changeCompleteTrue = function(branchCode) {
  return this.findOneAndUpdate({ branchCode, complete: false }, { complete: true });
};

/**
 * @author Jinseong
 * @summary 주문내역을 삭제한다.
 * @private
 * @memberof AdminchangeCompleteTrue
 * @param _id : 주문 아이디
 * @see None
 * @returns «Query»
 */
tempOrder.statics.deleteById = function(_id) {
  return this.remove({ _id });
};

module.exports = mongoose.model('tempOrders', tempOrder);
