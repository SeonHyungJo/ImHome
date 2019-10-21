import crypto from 'crypto';

/**
 * @description 암호화 복호화 대상 key list(공통으로 잡아서 처리해서 코드 간결화 + performance를 높임)
 */
const keyCheckList = ['name', 'bNumber', 'email', 'bPhoneNumber'];

/**
 * @description 암호화 진행
 */
const cryptoCipher = (value, key) => {
  const cipher = crypto.createCipher('aes256', key);
  const theCipher = cipher.update(value, 'utf8', 'hex') + cipher.final('hex');

  return theCipher;
};

/**
 * @description 복호화 진행
 */
const decryptoCipher = (value, key) => {
  if (value.length === 0) return value;

  const decipher = crypto.createDecipher('aes256', key);
  const salt = decipher.update(value, 'hex', 'utf8');
  const deciphered = salt + decipher.final('utf8');

  return deciphered;
};

/**
 * @description 난수 생성
 */
const getRandomNumber = () =>
  Math.round(new Date().valueOf() * Math.random()) + '';

/**
 * @description 단방향 암호화(복호화 불가능 - 비밀번호에 적용)
 * @param : userInfo{password, salt}
 * @return : userInfo
 */
const cryptoPassword = ({ password, salt = getRandomNumber() }) => {
  if (!password) throw new Error('password param is not set.');

  const hashPassword = crypto
    .createHash('sha512')
    .update(password + salt)
    .digest('hex');

  const newUserInfo = {
    password: hashPassword,
    salt
  };

  return newUserInfo;
};

/**
 * @description 양방향 암호화 - 개인정보 암호화(복호화 가능)
 * @param : userInfo
 * @return : object(userInfo)
 */
const cryptoUserInfo = userInfo => {
  Object.keys(userInfo).map(key => {
    keyCheckList.includes(key) &&
      (userInfo[key] = cryptoCipher(userInfo[key], key));
  });

  if (userInfo.password) {
    userInfo = this.cryptoPassword(userInfo);
  }
  return userInfo;
};

/**
 * @description 양방향 암호화 - 개인정보 복호화
 * @param : userInfo
 * @return : userInfo
 */
const decryptoUserInfo = userInfo => {
  Object.keys(userInfo).map(key => {
    keyCheckList.includes(key) &&
      (userInfo[key] = decryptoCipher(userInfo[key], key));
  });
  return userInfo;
};

module.export = {
  cryptoPassword,
  cryptoUserInfo,
  decryptoUserInfo
};
