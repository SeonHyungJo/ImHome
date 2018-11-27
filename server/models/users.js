const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// usersSchema
const usersSchema = new Schema(
    {
        id: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        bNumber: { type: String, required: true, unique: true },
        bAddress: { type: String, required: true },
        cName: { type: String, required: true },
        email: { type: String, required: true },
        pNumber: { type: String, required: true },
        branchName: { type: String, required: true },
        branchCode: { type: String, unique: true },
        checkAdmin: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

/**
 * @author seonhyungjo
 * @summary 새로운 유저 회원가입
 * @memberof Any
 * @param newUser : 유저에 대한 json형식 정보
 * @see None
 * @returns user.save()
 */
usersSchema.statics.create = function(newUser) {
    const user = new this(newUser);
    return user.save();
};

/**
 * @author seonhyungjo
 * @summary 모든 유저 검색
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 */
usersSchema.statics.findAll = function() {
    return this.find({});
};

/**
 * @author seonhyungjo
 * @summary 해당 아이디로 유저 검색
 * @memberof Admin
 * @param id : 찾으려는 해당 id
 * @see None
 * @returns «Query»
 */
usersSchema.statics.findOneById = function(id) {
    return this.findOne({ id });
};

/**
 * @author seonhyungjo
 * @summary 해당 아이디로 유저 검색
 * @memberof Admin
 * @param id : 찾으려는 해당 id
 * @see None
 * @returns «Query»
 */
usersSchema.statics.findOneByBranchcode = function(branchCode) {
    return this.findOne({ branchCode });
};

/**
 * @author seonhyungjo
 * @summary 해당 아이디로 유저 업데이트
 * @memberof Admin
 * @param id : 찾으려는 해당 id
 *        userInfo : 새로운 유저 정보
 * @see None
 * @returns «Query»
 */
usersSchema.statics.updateById = function(id, userInfo) {
    return this.findOneAndUpdate({ id }, userInfo, { new: true });
};

/**
 * @author seonhyungjo
 * @summary 해당 아이디로 유저 삭제
 * @memberof Admin
 * @param id : 삭제하려는 해당 id
 * @see None
 * @returns «Query»
 */
usersSchema.statics.deleteById = function(id) {
    return this.remove({ id });
};

/**
 * @author seonhyungjo
 * @summary 해당 아이디로 유저 유효성검사
 * @memberof Admin
 * @param id : 찾으려는 해당 id
 *        password : 유효성검사를 위한 비밀번호
 * @see None
 * @returns «Query»
 */
usersSchema.methods.verify = function(password) {
    // const userPassword = usersSchema.statics.findOneById.password
    console.log('password : ' + password);
    console.log('this.password : ' + this.password);
    return this.password === password;
};

/**
 * @author seonhyungjo
 * @summary 해당 아이디로 Admin 계정 확인
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 */
usersSchema.methods.checkingAdmin = function(id, password) {
    const accountCheck = this.methods.verify(id, password); //Boolean

    if (accountCheck) {
        const resultAdmin = usersSchema.statics.findOneById.checkAdmin || false;
        return resultAdmin;
    }

    return false;
};

module.exports = mongoose.model('users', usersSchema);
