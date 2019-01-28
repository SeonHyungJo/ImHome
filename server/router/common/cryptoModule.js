const crypto = require("crypto");

const cryptoCipher = (value, key) => {
    let cipher = crypto.createCipher('aes256', key);
    let theCipher = cipher.update(value, 'utf8', 'hex');
    theCipher += cipher.final('hex');

    return theCipher;
}

const decryptoCipher = (value, key) => {
    if (value.length === 0) {
        return value;
    }
    let decipher = crypto.createDecipher('aes256', key);
    let s = decipher.update(value, 'hex', 'utf8');
    let deciphered = s + decipher.final('utf8');
    return deciphered;
}

const cryptoModule = {
    /** 
     * 단방향 암호화(복호화 불가능 - 비밀번호에 적용)
     * @param : userInfo
     * @return : object(userInfo)
     */
    cryptoPassword(userInfo) {
        if (!userInfo || !userInfo.password)
            throw new Error('password param is not set.');

        let inputPassword = userInfo.password;
        let salt = userInfo.salt ? userInfo.salt : Math.round((new Date().valueOf() * Math.random())) + "";
        let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

        userInfo.password = hashPassword;
        userInfo.salt = salt;

        return userInfo;
    },

    /**
     * 양방향 암호화 - 개인정보 암호화(복호화 가능)
     * @param : userInfo
     * @return : object(userInfo)
     */
    cryptoUserInfo(userInfo) {
        for (const key of Object.keys(userInfo)) {
            if (key === 'name' || key === 'bNumber' || key === 'email' || key === 'bPhoneNumber') {
                userInfo[key] = cryptoCipher(userInfo[key], key);
            }
        }
        if (userInfo.password)
            userInfo = this.cryptoPassword(userInfo);

        return userInfo;
    },

    /**
     * 양방향 암호화 - 개인정보 복호화
     * @param : userInfo
     * @return : object(userInfo)
     */
    decryptoUserInfo(userInfo) {
        for (const key of Object.keys(userInfo.toObject())) {
            if (key === 'name' || key === 'bNumber' || key === 'email' || key === 'bPhoneNumber') {
                console.log(key, userInfo[key]);
                userInfo[key] = decryptoCipher(userInfo[key], key);
                console.log(userInfo[key]);
            }
        }
        return userInfo;
    }
}

module.exports = cryptoModule;
