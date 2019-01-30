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

  // 회원생성
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

  // Error 처리
  const onError = error => {
    console.log(error.message);
    error.message
      ? reponseError(res, error.message)
      : reponseError(res, 'REGISTER_FAIL');
  };

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
  const loginInfo = req.body;

  // 빈값 체크
  const blankCheck = userInfo => {
    return new Promise((resolve, reject) => {
      Object.keys(userInfo).map(key => {
        if (!userInfo[key]) reject(new Error(`BLANK_${key.toUpperCase()}`));
      });

      resolve(userInfo);
    });
  };

  const checkPassword = userInfo => {
    return new Promise((resolve, reject) => {
      if (!userInfo) {
        reject(new Error('ID_INCORRECT'));
      }

      const { id, username, branchCode, checkAdmin = false } = userInfo;
      const checkPassword = userInfo.verify(loginInfo.password);
      const secret = req.app.get('jwt-secret');

      checkPassword
        ? resolve({
            imhomeToken: jwt.sign(
              {
                id,
                username,
                branchCode,
                admin: checkAdmin
              },
              secret,
              {
                expiresIn: '1d',
                issuer: 'imhome.com',
                subject: 'lets_check_imhome_token',
                algorithm: 'HS512'
              }
            ),
            checkAdmin
          })
        : reject(new Error('PASSWORD_INCORRECT'));
    });
  };

  const respond = resultObj => {
    const { imhomeToken, checkAdmin } = resultObj;

    reponseSuccess(res, {
      imhomeToken,
      checkAdmin
    });
  };

  const onError = error => {
    console.log(error.message);
    error.message
      ? reponseError(res, error.message)
      : reponseError(res, 'LOGIN_FAIL');
  };

  blankCheck(loginInfo)
    .then(loginInfo => Users.findOneByUserId(loginInfo.id))
    .then(checkPassword)
    .then(respond)
    .catch(onError);
};

/**
 * POST /api/check
 *
 * @author seonhyungjo
 * @summary 토큰 확인용 API
 * @memberof ALL
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
    reponseError(res, 'DONT_HAVE_TOKEN');
  }

  const checkToken = new Promise((resolve, reject) => {
    jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
      if (err) reject(TOKEN_INCORRECT);
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
    error.message
      ? reponseError(res, error.message)
      : reponseError(res, 'CHECK_FAIL');
  };

  checkToken.then(respond).catch(onError);
};
