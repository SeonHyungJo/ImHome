const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const authMiddleware = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.query.token;

  if (!token) {
    return res.status(200).json({
      success: false,
      message: 'not Permission'
    });
  }

  const authCheck = new Promise((resolve, reject) => {
    jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
      if (err) reject(err);
      console.log(decoded);

      Users.checkingBranchCode(decoded.id)
        .then(result => {
          if (decoded.branchCode !== result.branchCode) {
            throw new Error('not Permission');
          }
        })
        .catch(onError);

      resolve(decoded);
    });
  });

  const onError = error => {
    res.status(200).json({
      success: false,
      message: error.message
    });
  };

  authCheck
    .then(decoded => {
      req.decoded = decoded;
      next();
    })
    .catch(onError);
};

module.exports = authMiddleware;
