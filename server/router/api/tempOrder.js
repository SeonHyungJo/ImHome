const TempOrders = require('../../models/tempOrders');
const Stores = require('../../models/stores');
const reponseError = require('../common/responseError');

/**
 * @author Jinseong
 * @summary 모든 주문내역 조회
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 */
// router.get('/tempOrders', function(req, res) {
//   TempOrders.findAllOrder()
//     .then(orderList => {
//       if (!orderList) throw new Error('order not found');
//       res.status(200).send(orderList);
//     })
//     .catch(err => {
//       console.log(err);
//       reponseError(res, 'NOT_FIND_ODER');
//     });
// });

/**
 * @author Jinseong
 * @summary 모든 주문내역 조회
 * @private
 * @memberof Admin, User
 * @param
 * @see None
 * @returns «Query»
 */

exports.getAllOrderList = (req, res) => {
  const branchCode = req.decoded.admin ? req.params.branchCode : req.decoded.branchCode;

  TempOrders.findOrderList(branchCode)
    .then(orderList => {
      if (!orderList) throw new Error('order not found');
      res.status(200).send(orderList);
    })
    .catch(err => {
      console.log(err);
      reponseError(res, 'NOT_FIND_ODER');
    });
};

/**
 * GET /api/tempOrders/branch/incomplete
 *
 * @author Jinseong
 * @summary 주문내역 관련 브랜치 리스트 가져오기
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 */
exports.getIncompleteBranchList = (req, res) => {
  TempOrders.findInCompleteBranches()
    .then(branchList => {
      if (!branchList) throw new Error('branch not found');
      res.status(200).send(branchList);
    })
    .catch(err => {
      console.log(err);
      reponseError(res, 'NOT_FIND_BRANCH');
    });
};

/**
 * GET /api/tempOrders/branch/complete
 *
 * @author Jinseong
 * @summary 출고내역 관련 브랜치 리스트 가져오기
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 * @deprecated
 */
exports.getCompleteBranchList = (req, res) => {
  // TempOrders.findCompleteBranches()
  //     .then(branchList => {
  //         if (!branchList) throw new Error('branch not found');
  //         res.status(200).send(branchList);
  //     })
  //     .catch(err => {
  //         console.log(err);
  //         reponseError(res, 'NOT_FIND_BRANCH');
  //     });
  reponseError(res, 'NOT_FIND_BRANCH');
};

/**
 * GET /api/tempOrders/:branchCode
 *
 * @author Jinseong
 * @summary 출고되지 않은 지점 주문내역 조회
 * @private
 * @memberof Admin, User
 * @param
 * @see None
 * @returns «Query»
 */
exports.getOrderList = (req, res) => {
  const branchCode = req.params.branchCode ? req.params.branchCode : '002';

  Stores.find({ branchCode })
    .then(store => {
      console.log(store);
      if (store.length == 0) {
        throw new Error('Dont exit branchCode');
      }

      return TempOrders.findInCompleteOrderByBranchcode(branchCode);
    })
    .then(order => {
      if (!order) throw new Error('order not found');
      res.status(200).send(order);
    })
    .catch(err => {
      console.log(err);
      reponseError(res, 'NOT_FIND_ODER');
    });
};

/**
 * POST /api/tempOrder
 *
 * @author Jinseong
 * @summary 주문내역 추가 또는 수정진행
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 */
exports.updateOrderList = (req, res) => {
  Stores.findStoreByBranchcode(req.body.branchCode)
    .then(store => {
      // branchName을 잘못 넣을 것을 대비해서 만듬
      req.body.branchName = store.branchName;
      return TempOrders.findInCompleteOrderByBranchcode(store.branchCode);
    })
    .then(order => {
      if (order.length !== 0) {
        //기존에 complete:false인 내역이 있을 경우 수정진행
        console.log('Modified');
        const modifiedOrder = Object.assign({}, order, req.body);

        return TempOrders.findOneAndUpdateNew(req.body.branchCode, modifiedOrder);
        //throw new Error('Already exit');
      }
      // 기존에 complete:false인 내역이 없을 경우 주문내역 추가
      return TempOrders.create(req.body);
    })
    .then(() => {
      res.status(200).send({ success: '0000' });
    })
    .catch(err => {
      console.log(err);
      reponseError(res, 'CREATE_ODER_ERROR');
    });
};

/**
 * PUT /api/tempOrders/complete/:branchCode
 *
 * @author Jinseong
 * @summary 지점별 출고완료 처리하기
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 */
exports.setComplete = (req, res) => {
  TempOrders.findInCompleteOrderByBranchcode(req.params.branchCode)
    .then(order => {
      if (order.length == 0) {
        console.log('Dont exit');
        reponseError(res, 'DONT_EXIT');
      }
      return TempOrders.changeCompleteTrue(req.params.branchCode);
    })
    .then(() => {
      res.status(200).send({ success: '0000' });
    })
    .catch(err => {
      console.log(err);
      reponseError(res, 'AREADY_COMPLETE');
    });
};

/**
 * DELETE /api/tempOrders/:_id
 *
 * @author Jinseong
 * @summary 해당 주문 삭제
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 */
exports.deleteTempOrder = (req, res) => {
  TempOrders.deleteById(req.params.tempOrderId)
    .then(() => {
      res.status(200).send({ success: '0000' });
    })
    .catch(err => {
      console.log(err);
      reponseError(res, 'DELETE_TEMP_ORDER_ERROR');
    });
};
