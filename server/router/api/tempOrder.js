const TempOrders = require('../../models/tempOrders');
const Stores = require('../../models/stores');
import reponseError from '../common/responseError';

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
  const branchCode = req.decoded.admin
    ? req.params.branchCode
    : req.decoded.branchCode;

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
 * GET /api/tempOrders/:companyCode
 *
 * @author Jinseong
 * @summary 임시저장 주문내역 조회
 * @private
 * @memberof Admin, User
 * @param
 * @see None
 * @returns «Query»
 */
exports.getOrderList = (req, res) => {
  const branchCode = req.decoded.admin
    ? req.params.branchCode
    : req.decoded.branchCode;
  const companyCode = req.params.companyCode ? req.params.companyCode : '';

  Stores.find({ branchCode })
    .then(store => {
      if (store.length == 0) {
        throw new Error('Dont exit branchCode');
      } else if (companyCode === '') {
        throw new Error('Dont have companyCode');
      }
      // console.log(companyCode);
      return TempOrders.findTempOrderByBranchcodeAndCompanyCode(
        branchCode,
        companyCode
      );
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
  const branchCode = req.decoded.branchCode;
  const companyCode = req.body.companyCode ? req.body.companyCode : '';
  Stores.findStoreByBranchcode(branchCode)
    .then(store => {
      if (store.length == 0) {
        throw new Error('Dont exit branchCode');
      } else if (companyCode === '') {
        throw new Error('Dont have companyCode');
      }
      req.body.branchCode = store.branchCode;
      req.body.branchName = store.branchName;

      return TempOrders.findTempOrderByBranchcodeAndCompanyCode(
        branchCode,
        companyCode
      );
    })
    .then(order => {
      if (order.length !== 0) {
        //기존에 complete:false인 내역이 있을 경우 수정진행
        console.log('Modified');
        const modifiedOrder = Object.assign({}, order, req.body);

        return TempOrders.findOneAndUpdateNew(
          branchCode,
          companyCode,
          modifiedOrder
        );
        //throw new Error('Already exit');
      } else {
        // 기존에 complete:false인 내역이 없을 경우 주문내역 추가
        // console.log(req.body);
        return TempOrders.create(req.body);
      }
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
