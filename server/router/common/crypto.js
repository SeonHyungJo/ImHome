const crypto = require("crypto");

const cryptoModule = {
    cryptoPassword: (userInfo) => {
        let inputPassword = userInfo.password;
        let salt = Math.round((new Date().valueOf() * Math.random())) + "";
        let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

        return { 'hashPwd': hashPassword, 'salt': salt };
    }
}

module.exports = cryptoModule;
