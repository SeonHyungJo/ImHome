const jwt = require('jsonwebtoken');
import reponseError from '../common/responseError';

const authMiddleware = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.query.token;

  // token의 여부확인
  const checkToken = token => {
    return new Promise((resolve, reject) => {
      if (!token) {
        console.log('Dont have Token');
        reject(new Error('DONT_HAVE_TOKEN'));
      }
      resolve(token);
    });
  };

  // token 실질적 확인
  const verifyToken = token => {
    return new Promise((resolve, reject) => {
      console.log(token);
      jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
        if (err) reject(new Error('TOKEN_INCORRECT'));
        resolve(decoded);
      });
    });
  };

  const respond = decoded => {
    req.decoded = decoded;
    next();
  };

  const onError = error => {
    console.log(error.message);
    error.message
      ? reponseError(res, error.message)
      : reponseError(res, 'CHECK_FAIL');
  };

  checkToken(token)
    .then(verifyToken)
    .then(respond)
    .catch(onError);
};

module.exports = authMiddleware;
