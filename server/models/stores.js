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

/**
 * @author seonhyungjo
 * @summary 새로운 지점 등록
 * @private
 * @memberof Admin
 * @param newBranch : 지점에 대한 json형식 정보
 * @see None
 * @returns product.save()
 */
storeSchema.statics.create = function(newBranch) {
    const product = new this(newBranch);
    return product.save();
};

/**
 * @author seonhyungjo
 * @summary 모든 지점 정보
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns storeList
 */
storeSchema.statics.findAll = function() {
    return this.find().select({ _id: 0, branchCode: 1, branchName: 1 });
};

/**
 * @author seonhyungjo
 * @summary 지점 코드로 지점 정보 가져오기
 * @private
 * @memberof Admin
 * @param branchCode 지점 코드
 * @see None
 * @returns «Query»
 */
storeSchema.statics.findStoreByBranchcode = function(branchCode) {
    return this.findOne({ branchCode });
};

/**
 * @author seonhyungjo
 * @summary 지점 정보 업데이트
 * @private
 * @memberof Admin
 * @param branchCode 지점 코드
 * @param productInfo: 지점에 대한 json형식 정보
 * @see None
 * @returns store
 */
storeSchema.statics.findOneAndUpdateNew = function(branchCode, productInfo) {
    return this.findOneAndUpdate({ branchCode }, productInfo, { new: true });
};

/**
 * @author seonhyungjo
 * @summary 지점 삭제
 * @private
 * @memberof Admin
 * @param branchCode 지점 코드
 * @see None
 * @returns «Query»
 */
storeSchema.statics.deleteByBranchCode = function(branchCode) {
    return this.remove({ branchCode });
};

/**
 * @author seonhyungjo
 * @summary 지점 코드와 이름으로 정보 가져오기
 * @private
 * @memberof Admin
 * @param branchCode 지점 코드
 * @param branchName 지점명
 * @see None
 * @returns «Query»
 */
storeSchema.statics.checkBranch = function(branchCode, branchName) {
    return this.findOne({ branchCode, branchName });
};

module.exports = mongoose.model('stores', storeSchema);
