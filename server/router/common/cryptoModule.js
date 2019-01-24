const crypto = require("crypto");

const cryptoCipher = (value, key) => {
    let cipher = crypto.createCipher('aes256', key);
    let theCipher = cipher.update(value, 'ascii', 'hex');
    theCipher += cipher.final('hex');

    return theCipher;
}

const decryptoCipher = (value, key) => {
    let decipher = crypto.createDecipher('aes256', key);
    let s = decipher.update(value, 'hex', 'ascii');
    let deciphered = s + decipher.final('ascii');

    return deciphered;
}

const cryptoModule = {
    /** 
     * 단방향 암호화(복호화 불가능 - 비밀번호에 적용)
     * @param : userInfo
     * @return : object({hashPwd : ..., salt: ...})
     */
    cryptoPassword: (userInfo) => {
        let inputPassword = userInfo.password;
        let salt = Math.round((new Date().valueOf() * Math.random())) + "";
        let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

        return { 'hashPwd': hashPassword, 'salt': salt };
    },

    /**
     * 양방향 암호화 - 개인정보 암호화(복호화 가능)
     * @param : userInfo
     * @return : object
     */
    cryptoUserInfo: (userInfo) => {
        for (const key of Object.keys(userInfo)) {
            if (key === 'name' || key === 'bNumber' || key === 'email' || key === 'bPhoneNumber') {
                userInfo[key] = cryptoCipher(userInfo[key], key);
            }
        }

        return userInfo;
    },

    /**
     * 양방향 암호화 - 개인정보 복호화
     * @param : userInfo
     * @return : object
     */
    decryptoUserInfo: (userInfo) => {
        for (const key of Object.keys(userInfo)) {
            if (key === 'name' || key === 'bNumber' || key === 'email' || key === 'bPhoneNumber') {
                userInfo[key] = decryptoCipher(userInfo[key], key);
            }
        }

        return userInfo;
    }
}

module.exports = cryptoModule;
