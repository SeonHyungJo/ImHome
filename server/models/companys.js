const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema(
    {
        companyName: { type: String, required: true, unique: true },
        companyCode: { type: String, required: true, unique: true }
    },
    {
        timestamps: true
    }
);

/**
 * @author jinseong
 * @summary 새로운 회사 등록
 * @private
 * @memberof Admin
 * @param newCompany : 지점에 대한 json형식 정보
 * @see None
 * @returns product.save()
 */
companySchema.statics.create = function(newCompany) {
    const product = new this(newCompany);
    return product.save();
};

/**
 * @author jinseong
 * @summary 모든 회사 정보
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns companyList
 */
companySchema.statics.findAll = function() {
    return this.find().select({ _id: 0, companyCode: 1, companyName: 1 });
};

/**
 * @author jinseong
 * @summary 회사 코드로 지점 정보 가져오기
 * @private
 * @memberof Admin
 * @param companyCode 지점 코드
 * @see None
 * @returns «Query»
 */
companySchema.statics.findCompanyByCompanyCode = function(companyCode) {
    return this.findOne({ companyCode });
};

/**
 * @author jinseong
 * @summary 회사 정보 업데이트
 * @private
 * @memberof Admin
 * @param companyCode 코드
 * @param productInfo: 회사에 대한 json형식 정보
 * @see None
 * @returns company
 */
companySchema.statics.findOneAndUpdateNew = function(companyCode, productInfo) {
    return this.findOneAndUpdate({ companyCode }, productInfo, { new: true });
};

/**
 * @author jinseong
 * @summary 회사 삭제
 * @private
 * @memberof Admin
 * @param companyCode 회사 코드
 * @see None
 * @returns «Query»
 */
companySchema.statics.deleteByCompanyCode = function(companyCode) {
    return this.remove({ companyCode });
};

/**
 * @author jinseong
 * @summary 회사 코드와 이름으로 정보 가져오기
 * @private
 * @memberof Admin
 * @param companyCode 지점 코드
 * @see None
 * @returns «Query»
 */
companySchema.statics.checkCompany = function(companyCode) {
    return this.findOne({ companyCode });
};

module.exports = mongoose.model('companys', companySchema);
