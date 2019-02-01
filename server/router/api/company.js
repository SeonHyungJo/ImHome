import express from 'express';
const Companys = require('../../models/companys');
const reponseError = require('../common/responseError');
const authMiddleware = require('../middlewares/auth');

export let router = express.Router();

router.use('/company', function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
//router.use('/', authMiddleware);

/**
 * GET /api/company/list
 *
 * @author jinseong
 * @summary 모든 회사 정보 가져오기
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns [{companyCode, companyName}, {companyCode, companyName}]
 */
router.get('/company/list', function(req, res) {
  Companys.findAll()
    .then(company => {
      if (!company) throw new Error("Can't find companys");
      res.status(200).send(company);
    })
    .catch(err => {
      console.log(err);
      reponseError(res, 'NOT_FIND_ODER');
    });
});

/**
 * POST /api/company
 *
 * @author jinseong
 * @summary 지점 회사 추가하기
 * @private
 * @memberof Admin
 * @param body: 회사정보 { companyCode, companyName }
 * @see None
 * @returns «Query»
 */
router.post('/company', function(req, res) {
  Companys.create(req.body)
    .then(company => {
      res.status(200).send({ success: '0000' });
    })
    .catch(err => {
      console.log(err);
      reponseError(res, 'UPDATE_ODER_ERROR');
    });
});

/**
 * PUT /api/company/:companyCode
 *
 * @author jinseong
 * @summary 회사 정보 수정하기
 * @private
 * @memberof Admin
 * @param companyCode: 회사코드
 * @param body: 회사정보 { companyCode, companyName }
 * @see None
 * @returns «Query»
 */
router.put('/company/:companyCode', function(req, res) {
  Companys.findOneAndUpdateNew(req.params.companyCode, req.body)
    .then(company => {
      if (!company) throw new Error("Can't find companyCode");
      res.status(200).send({ success: '0000' });
    })
    .catch(err => {
      console.log(err);
      reponseError(res, 'UPDATE_ODER_ERROR');
    });
});

/**
 * DELETE /api/company/:companyCode
 *
 * @author jinseong
 * @summary 회사 정보 삭제하기
 * @private
 * @memberof Admin
 * @param companyCode: 회사코드
 * @see None
 * @returns «Query»
 */
router.delete('/company/:companyCode', function(req, res) {
  Companys.findCompanyByCompanycode(req.params.companyCode)
    .then(company => {
      if (!company) throw new Error("Can't find companyCode");
      return Companys.deleteByCompanyCode(req.params.companyCode);
    })
    .then(() => {
      res.status(200).send({ success: '0000' });
    })
    .catch(err => {
      console.log(err);
      reponseError(res, 'DELETE_ODER_ERROR');
    });
});
