const Orders = require('../../models/orders');
const Stores = require('../../models/stores');
const reponseError = require('../common/responseError');
const orderExcel = require('../external/orderExcel');

/**
 * @author seonhyungjo
 * @summary 모든 주문내역 조회
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 */
// router.get('/order', function(req, res) {
//   Orders.findAllOrder()
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
 * @author seonhyungjo
 * @summary 모든 주문내역 조회
 * @private
 * @memberof Admin, User
 * @param
 * @see None
 * @returns «Query»
 */

exports.getAllOrderList = (req, res) => {
  // 2019-02-20 QueryString 적용
  // startDate, endDate, type
  const today = new Date();
  today.setDate(today.getDate() - 7);
  const startDate = req.query.startDate ? req.query.startDate : today;
  const endDate = req.query.endDate ? req.query.endDate : new Date();
  const branchCode = req.decoded.admin
    ? req.params.branchCode
    : req.decoded.branchCode;

  Orders.findOrderList(branchCode, startDate, endDate)
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
 * GET /api/order/branch/incomplete
 *
 * @author seonhyungjo
 * @summary 주문내역 관련 브랜치 리스트 가져오기
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 */
exports.getIncompleteBranchList = (req, res) => {
  Orders.findInCompleteBranches()
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
 * GET /api/order/branch/complete
 *
 * @author seonhyungjo
 * @summary 출고내역 관련 브랜치 리스트 가져오기
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 * @deprecated
 */
exports.getCompleteBranchList = (req, res) => {
  // Orders.findCompleteBranches()
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
 * GET /api/order/:branchCode
 *
 * @author seonhyungjo
 * @summary 출고되지 않은 지점 주문내역 조회
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

  Stores.find({ branchCode })
    .then(store => {
      if (store.length == 0) {
        throw new Error('Dont exit branchCode');
      }

      return Orders.findInCompleteOrderByBranchcode(branchCode);
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
 * POST /api/order
 *
 * @author seonhyungjo
 * @summary 주문내역 추가 또는 수정진행
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 */
exports.updateOrderList = (req, res) => {
  const branchCode = req.decoded.admin
    ? req.params.branchCode
    : req.decoded.branchCode;

  Stores.findStoreByBranchcode(branchCode)
    .then(store => {
      // branchName을 잘못 넣을 것을 대비해서 만듬
      req.body.branchName = store.branchName;
      req.body.branchCode = store.branchCode;
      return Orders.findInCompleteOrderByBranchcode(store.branchCode);
    })
    .then(order => {
      if (order.length !== 0) {
        req.body.items.map(reqItem => {
          let modyFlag = order[0].items.some(item => {
            if (String(item._id) === reqItem._id) {
              item.itemCount = reqItem.itemCount;
              return true;
            } else {
              return false;
            }
          });

          if (!modyFlag) {
            order[0].items.push(reqItem);
          }
        });

        return Orders.findOneAndUpdateNew(branchCode, order[0]);
      } else {
        // 기존에 complete:false인 내역이 없을 경우 주문내역 추가
        return Orders.create(req.body);
      }
    })
    .then(() => {
      res.status(200).send({ success: '0000' });
    })
    .catch(err => {
      console.log(err);
      reponseError(res, 'EXISTED_ORDER');
    });
};

/**
 * POST /api/order/complete/:branchCode
 *
 * @author seonhyungjo
 * @summary 지점별 출고완료 처리하기
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 */
exports.setComplete = (req, res) => {
  const reqBranchCode = req.params.branchCode;
  const completeList = req.body;

  Stores.find({ branchCode: reqBranchCode })
    .then(storeInfo => {
      const completeOrder = {
        branchCode: reqBranchCode,
        branchName: storeInfo[0].branchName,
        items: completeList,
        complete: true
      };

      return completeOrder;
    })
    .then(completeOrder => {
      // 배송처리내역을 완전히 새로 만든다.
      // create
      return Orders.create(completeOrder).then(result => {
        console.log(result);
      });
    })
    .then(() => {
      // 기존의 내역을 가져와서 배송처리된 내용은 빼고 다시 저장한다.
      // findOneAndUpdateNew
      return Orders.findInCompleteOrderByBranchcode(reqBranchCode).then(
        result => {
          const prevItems = result[0].items;
          const compIds = completeList.map(compItem => compItem._id);
          const newItems = prevItems.filter(
            item => !compIds.includes(item._id.toString())
          );

          return newItems.map(newItem => {
            return {
              itemName: newItem.itemName,
              itemCount: newItem.itemCount,
              itemCost: newItem.itemCost,
              itemVolume: newItem.itemVolume,
              itemDepth: newItem.itemDepth
            };
          });
        }
      );
    })
    .then(newItems => {
      // update orderlist
      const items = { items: newItems };
      return newItems.length > 0
        ? Orders.findOneAndUpdateNew(reqBranchCode, items)
        : Orders.changeCompleteTrue(reqBranchCode);
    })
    .then(() => {
      res.status(200).send({ success: '0000' });
    })
    .catch(err => {
      console.log(err);
      reponseError(res, 'AREADY_COMPLETE');
    });

  // Orders.findInCompleteOrderByBranchcode(req.params.branchCode)
  //   .then(order => {
  //     if (order.length == 0) {
  //       console.log('Dont exit');
  //       reponseError(res, 'DONT_EXIT');
  //     }
  //     return Orders.changeCompleteTrue(req.params.branchCode);
  //   })
  //   .then(() => {
  //     res.status(200).send({ success: '0000' });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     reponseError(res, 'AREADY_COMPLETE');
  //   });
};

/**
 * DELETE /api/order/:_id
 *
 * @author seonhyungjo
 * @summary 해당 주문 삭제
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 */
exports.deleteOrderList = (req, res) => {
  Orders.deleteByBranchCode(req.params._id)
    .then(() => {
      res.status(200).send({ success: '0000' });
    })
    .catch(err => {
      console.log(err);
      reponseError(res, 'DELETE_ODER_ERROR');
    });
};

/**
 * POST /api/order/excel
 *
 * @author BKJang
 * @summary 거래내역 엑셀 저장
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 */
exports.downloadExcel = (req, res) => {
  const body = req.body;
  const startDate = body.startDate
    ? body.startDate
    : new Date().setDate(new Date().getDate() - 7);
  const endDate = body.endDate ? body.endDate : new Date();
  const branchCode = body.storeId;

  Orders.findOrderList(branchCode, startDate, endDate)
    .then(orderList => {
      orderExcel.getOrderExcel(orderList, startDate, endDate, res);
    })
    .catch(err => {
      console.log(err);
      reponseError(res, 'NOT_FIND_ODER');
    });
};
