const Users = require('../../models/users');
const Store = require('../../models/stores');
const crypto = require('../common/cryptoModule');
const reponseError = require('../common/responseError');
const reponseSuccess = require('../common/responseSuccess');
const jwt = require('jsonwebtoken');

/**
 * POST /api/register
 *
 * @author seonhyungjo
 * @summary 회원가입
 * @memberof USER
 * @param
 * {
 *     id : USER_ID,
 *     password: PASSWORD,
 *     name : NAME,
 *     bNumber : BUSINESS_NUMBER,
 *     bAddress : BUSINESS_ADDRESS,
 *     cName : COMPANY_NAME,
 *     email : EMAIL,
 *     bPhoneNumber : PHONE_NUMBER,
 *     branchName : BRANCH_NAME,
 *     branchCode : BRANCH_CODE
 * }
 * 190123 수정 - 비밀번호 암호화 추가 - @author BKJang
 */

exports.register = (req, res) => {
    let userInfo = req.body;
    /* 
     * 비밀번호 암호화
    */
    userInfo = crypto.cryptoUserInfo(userInfo);

    /*
        아이디가 존재한다면 ERROR처리 
        없다면 새로 생성
    */
    const checkId = user => {
        const userId = userInfo.id;
        return new Promise((resolve, reject) => {
            let result = true;
            if (user && userId === user.id)
                result = false;

            return resolve(result);
        });
    }

    const create = checkIdResult => {
        const branchCode = userInfo.branchCode;

        return new Promise((resolve, reject) => {
            if (!checkIdResult) {
                return resolve('REGISTER_FAIL_ID');
            }
            Store.checkBranch(branchCode).then(result => {
                if (result != null) {
                    userInfo.branchName = result.branchName;
                    return resolve(Users.create(userInfo));
                }

                return reject(new Error('Not Find Branch'));
            });
        });
    };

    const respond = (resultKey) => {
        if (resultKey === 'REGISTER_FAIL_ID') {
            reponseError(res, resultKey);
            return;
        }
        reponseSuccess(res);
    };

    // run when there is an error (username exists)
    const onError = (error) => {
        console.log(error.message);
        reponseError(res, 'REGISTER_FAIL');
    };

    // 해당 아이디 복수 확인
    Users.findOneByUserId(userInfo.id)
        .then(checkId)
        .then(create)
        .then(respond)
        .catch(onError);
};

/**
 * POST /api/login
 *
 * @author seonhyungjo
 * @summary 로그인
 * @memberof USER
 * @param
 * {
 *      id,
 *      password
 * }
 */
exports.login = (req, res) => {
    const { id, password } = req.body;
    let userInfo = req.body;
    const secret = req.app.get('jwt-secret');
    let checkAdmin = false;

    const check = user => {
        const checkPassword = user.verify(password);
        checkAdmin = user.checkAdmin;
        console.log(user);
        if (checkPassword) {
            return new Promise((resolve, reject) => {
                jwt.sign(
                    {
                        id: user.id,
                        username: user.username,
                        branchCode: user.branchCode,
                        admin: checkAdmin
                    },
                    secret,
                    {
                        expiresIn: '30m',
                        issuer: 'imhome.com',
                        subject: 'userInfo',
                        algorithm: 'HS512'
                    },
                    (err, token) => {
                        if (err) reject(err);
                        resolve(token);
                    }
                );
            });
        } else {
            throw new Error('login failed');
        }
    };

    const respond = token => {
        res.send({
            success: '0000',
            imhomeToken: token,
            checkAdmin: checkAdmin
        });
    };

    const onError = error => {
        console.log(error);
        reponseError(res, 'LOGIN_FAIL');
    };

    Users.findOneByUserId(id)
        .then(check)
        .then(respond)
        .catch(onError);
};

/*
    GET /api/check
*/

/**
 * POST /api/login
 *
 * @author seonhyungjo
 * @summary 로그인
 * @memberof USER
 * @param
 * {
 *      id,
 *      password
 * }
 */

exports.check = (req, res) => {
    const token = req.headers['x-access-token'] || req.query.token;

    if (!token) {
        console.log('Dont have Token');
        reponseError(res, 'NOT_LOGIN');
    }

    const checkToken = new Promise((resolve, reject) => {
        jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
            if (err) reject(err);
            resolve(decoded);
        });
    });

    const respond = token => {
        res.json({
            success: '0000',
            info: token
        });
    };

    const onError = error => {
        console.log(error.message);
        reponseError(res, 'NOT_LOGIN');
    };

    checkToken.then(respond).catch(onError);
};
