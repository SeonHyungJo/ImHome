import mongoose from 'mongoose';
import { cryptoPassword } from '../router/common/cryptoModule';

const Schema = mongoose.Schema;

// usersSchema
const usersSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    bNumber: { type: String, required: true },
    bAddress: { type: String, required: true },
    bPhoneNumber: { type: String, required: true },
    cName: { type: String, required: true },
    email: { type: String, required: true },
    pNumber: { type: String, required: false },
    branchName: { type: String, required: true },
    branchCode: { type: String, required: true },
    checkUser: { type: Boolean, default: false },
    checkAdmin: { type: Boolean, default: false },
    salt: { type: String, required: true }
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
  return this.find().select({
    _id: 1, // 시퀀스
    id: 1, // 아이디
    name: 1, //일단은 대표자 이름으로 설정
    bNumber: 1, // 사업자 번호
    bAddress: 1, // 사업장 주소
    bPhoneNumber: 1, // 대표 전화번호
    cName: 1, // 회사명
    email: 1, // 이메일
    pNumber: 1, // 전화번호
    branchName: 1, // 지점명
    branchCode: 1, // 지점코드
    createdAt: 1, // 등록일자
    salt: 1,
    checkAdmin: 1
  });
};

/**
 * @author seonhyungjo
 * @summary 해당 시퀀스 아이디로 유저 검색
 * @memberof Admin
 * @param _id : 찾으려는 해당 _id
 * @see None
 * @returns «Query»
 */
usersSchema.statics.findOneById = function(_id) {
  return this.findOne({ _id })
    .select({
      _id: 1, // 시퀀스
      id: 1, // 아이디,
      name: 1, //일단은 대표자 이름으로 설정
      bNumber: 1, // 사업자 번호
      bAddress: 1, // 사업장 주소
      bPhoneNumber: 1, // 대표 전화번호
      cName: 1, // 회사명
      email: 1, // 이메일
      pNumber: 1, // 전화번호
      branchName: 1, // 지점명
      branchCode: 1, // 지점코드
      createdAt: 1, // 등록일자
      salt: 1,
      checkAdmin: 1
    })
    .catch(err => {
      console.log(err);
      return new this({
        _id: null, // 아이디
        id: null, // 아이디
        password: null,
        name: null, //일단은 대표자 이름으로 설정
        bNumber: null, // 사업자 번호
        bAddress: null, // 사업장 주소
        bPhoneNumber: null, // 대표 전화번호
        cName: null, // 회사명
        email: null, // 이메일
        pNumber: null, // 전화번호
        branchName: null, // 지점명
        branchCode: null, // 지점코드
        checkUser: null,
        createdAt: null,
        salt: null
      });
    });
};

/**
 * @author seonhyungjo
 * @summary 아이디로 유저 검색
 * @memberof Admin
 * @param id : 찾으려는 해당 id
 * @see None
 * @returns «Query»
 */
usersSchema.statics.findOneByUserId = function(id) {
  return this.findOne({ id }).select({
    _id: 1, // 시퀀스
    id: 1, // 아이디
    password: 1,
    name: 1, //일단은 대표자 이름으로 설정
    bNumber: 1, // 사업자 번호
    bAddress: 1, // 사업장 주소
    bPhoneNumber: 1, // 대표 전화번호
    cName: 1, // 회사명
    email: 1, // 이메일
    pNumber: 1, // 전화번호
    branchName: 1, // 지점명
    branchCode: 1, // 지점코드
    createdAt: 1, // 등록일자
    salt: 1,
    checkAdmin: 1
  });
};

/**
 * @author seonhyungjo
 * @summary 해당 브랜치 코드로 모든 유저 검색
 * @memberof Admin
 * @param branchCode : 찾으려는 해당 branchCode
 * @see None
 * @returns «Query»
 */
usersSchema.statics.findOneByBranchCode = function(branchCode) {
  return this.find({ branchCode }).select({
    _id: 1, // 시퀀스
    id: 1, // 아이디
    name: 1, //일단은 대표자 이름으로 설정
    bNumber: 1, // 사업자 번호
    bAddress: 1, // 사업장 주소
    bPhoneNumber: 1, // 대표 전화번호
    cName: 1, // 회사명
    email: 1, // 이메일
    pNumber: 1, // 전화번호
    branchName: 1, // 지점명
    branchCode: 1, // 지점코드
    createdAt: 1, // 등록일자
    salt: 1,
    checkAdmin: 1
  });
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
usersSchema.statics.updateById = function(_id, userInfo) {
  return this.findOneAndUpdate({ _id }, userInfo, { new: true });
};

/**
 * @author seonhyungjo
 * @summary 해당 아이디로 유저 삭제
 * @memberof Admin
 * @param _id : 삭제하려는 유저 _id
 * @see None
 * @returns «Query»
 */
usersSchema.statics.deleteById = function(_id) {
  return this.remove({ _id });
};

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

/**
 * @author seonhyungjo
 * @summary 해당 아이디로 유저 유효성검사
 * @memberof Admin, User
 * @param password : 유효성검사를 위한 비밀번호
 * @see None
 * @returns «Query»
 */
usersSchema.methods.verify = function(password) {
  /* 암호화를 해서 비밀번호를 비교진행 */
  const userInfo = {
    password,
    salt: this.salt
  };
  const newUserInfo = cryptoPassword(userInfo);

  return this.password === newUserInfo.password;
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
usersSchema.methods.checkingAdmin = function() {
  return usersSchema.statics.findOneByUserId.checkAdmin || false;
};

/**
 * @author seonhyungjo
 * @summary 브랜치코드 확인용
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 */
usersSchema.statics.checkingBranchCode = function(id) {
  return this.findOne({ id }).select({
    branchCode: 1 // 지점코드
  });
};

module.exports = mongoose.model('users', usersSchema);
