const Stores = require('../../models/stores');
const Users = require('../../models/users');
const reponseError = require('../common/responseError');

/**
 * GET /api/store/list
 *
 * @author seonhyungjo
 * @summary 모든 지점 정보 가져오기
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns [{branchCode, branchName}, {branchCode, branchName}]
 */
exports.getAllStore = (req, res) => {
  Stores.findAll()
    .then(store => {
      if (!store) throw new Error("Can't find stores");
      res.status(200).send(store);
    })
    .catch(err => {
      console.log(err);
      reponseError(res, 'NOT_FIND_ODER');
    });
};

/**
 * GET /api/store/first
 *
 * @author seonhyungjo
 * @summary 첫번째 storeId, userId를 뽑아서 넘겨주기
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns {storeId, userId}
 */
exports.getFirstStore = (req, res) => {
  Stores.findAll()
    .then(store => {
      if (!store) throw new Error("Can't find stores");
      Users.findOneByBranchCode(store[0].branchCode)
        .then(users => {
          res
            .status(200)
            .send({ storeId: store[0].branchCode, userId: users[0]._id });
        })
        .catch(err => {
          res.status(200).send({ storeId: store[0].branchCode, userId: '' });
        });
    })
    .catch(err => {
      console.log(err);
      reponseError(res, 'NOT_FIND_ODER');
    });
};

/**
 * POST /api/store
 *
 * @author seonhyungjo
 * @summary 지점 정보 추가하기
 * @private
 * @memberof Admin
 * @param body: 지점정보 { branchCode, branchName }
 * @see None
 * @returns «Query»
 */
exports.addStore = (req, res) => {
  Stores.create(req.body)
    .then(store => {
      res.status(200).send({ success: '0000' });
    })
    .catch(err => {
      console.log(err);
      reponseError(res, 'UPDATE_ODER_ERROR');
    });
};

/**
 * PUT /api/store/:branchCode
 *
 * @author seonhyungjo
 * @summary 지점 정보 수정하기
 * @private
 * @memberof Admin
 * @param branchCode: 지점코드
 * @param body: 지점정보 { branchCode, branchName }
 * @see None
 * @returns «Query»
 */
exports.updateStore = (req, res) => {
  Stores.findOneAndUpdateNew(req.params.branchCode, req.body)
    .then(store => {
      if (!store) throw new Error("Can't find branchCode");
      res.status(200).send({ success: '0000' });
    })
    .catch(err => {
      console.log(err);
      reponseError(res, 'UPDATE_ODER_ERROR');
    });
};

/**
 * DELETE /api/store/:branchCode
 *
 * @author seonhyungjo
 * @summary 지점 정보 삭제하기
 * @private
 * @memberof Admin
 * @param branchCode: 지점코드
 * @see None
 * @returns «Query»
 */
exports.deleteStore = (req, res) => {
  Stores.findStoreByBranchcode(req.params.branchCode)
    .then(store => {
      if (!store) throw new Error("Can't find branchCode");
      return Stores.deleteByBranchCode(req.params.branchCode);
    })
    .then(() => {
      res.status(200).send({ success: '0000' });
    })
    .catch(err => {
      console.log(err);
      reponseError(res, 'DELETE_ODER_ERROR');
    });
};
