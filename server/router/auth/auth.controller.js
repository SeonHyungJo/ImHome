import Users from '../../models/users';
import Store from '../../models/stores';
import crypto from '../common/cryptoModule';
import reponseError from '../common/responseError';
import reponseSuccess from '../common/responseSuccess';
import jwt from 'jsonwebtoken';

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
 *     bPhoneNumber : PHONE_NUMBER,
 *     cName : COMPANY_NAME,
 *     email : EMAIL,
 *     pNumber : ???
 *     branchName : BRANCH_NAME,
 *     branchCode : BRANCH_CODE
 * }
 * 190123 수정 - 비밀번호 암호화 추가 - @update BKJang
 * 190130 수정 - 코드 리팩토링 - @update SeonHyungJo
 */

exports.register = (req, res) => {
  const userInfo = req.body;

  // 빈값 체크
  const blankCheck = insertUserInfo => {
    return new Promise((resolve, reject) => {
      Object.keys(insertUserInfo).map(key => {
        if (!insertUserInfo[key])
          reject(new Error(`BLANK_${key.toUpperCase()}`));
      });

      resolve(insertUserInfo);
    });
  };

  // 비밀번호 암호화
  const cryptoUserInfo = insertUserInfo => {
    return new Promise(resolve => {
      const cryptoUserInfo = {
        ...insertUserInfo,
        ...crypto.cryptoUserInfo(userInfo)
      };

      resolve(cryptoUserInfo);
    });
  };

  // 아이디 중복확인
  const checkUserId = cryptoInfo => {
    return new Promise((resolve, reject) => {
      Users.findOneByUserId(cryptoInfo.id)
        .then(foundUserInfo => {
          const result =
            foundUserInfo && cryptoInfo.id === foundUserInfo.id ? false : true;

          result ? resolve(cryptoInfo) : reject(new Error('ALREADY_EXIST_ID'));
        })
        .catch(new Error('ERROR_FIND_USERID'));
    });
  };

  // BranchName 확인
  const checkBranchCode = cryptoInfo => {
    return new Promise((resolve, reject) => {
      Store.checkBranch(cryptoInfo.branchCode)
        .then(foundBranch => {
          if (foundBranch) {
            cryptoInfo = {
              ...cryptoInfo,
              branchName: foundBranch.branchName,
              checkUser: true
            };

            resolve(cryptoInfo);
          }

          reject(new Error('BLANK_BRANCHNAME'));
        })
        .catch(new Error('ERROR_CHECK_BRANCH'));
    });
  };

  const create = cryptoInfo => {
    return new Promise(() => {
      Users.create(cryptoInfo)
        .then(createResult => {
          console.log(createResult);
          reponseSuccess(res);
        })
        .catch(new Error('ERROR_CREATE'));
    });
  };

  // run when there is an error (username exists)
  const onError = error => {
    console.log(error.message);
    //reponseError(res, 'REGISTER_FAIL');
    reponseError(res, error.message);
  };

  // 해당 아이디 복수 확인
  blankCheck(userInfo)
    .then(cryptoUserInfo)
    .then(checkUserId)
    .then(checkBranchCode)
    .then(create)
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
  console.log(id);
  const secret = req.app.get('jwt-secret');
  let checkAdmin = false;

  const check = user => {
    const checkPassword = user.verify(password);
    checkAdmin = user.checkAdmin;
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
    console.log(token);
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
