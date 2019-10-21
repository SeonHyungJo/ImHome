import jwt from 'jsonwebtoken';
import reponseError from './responseError';

// Token 유무확인
const checkToken = token =>
  new Promise((resolve, reject) => {
    if (!token) {
      console.log('Dont have Token');
      reject(new Error('DONT_HAVE_TOKEN'));
    }
    resolve(token);
  });

// Token 유효성 체크
const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
      if (err) reject(new Error('TOKEN_INCORRECT'));

      resolve(decoded);
    });
  });

const authMiddleware = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.query.token;

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

  checkToken(token).then(verifyToken).then(respond).catch(onError);
};

export default authMiddleware;
