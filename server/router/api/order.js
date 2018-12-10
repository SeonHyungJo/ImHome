import express from 'express';
const Orders = require('../../models/orders');
const Stores = require('../../models/stores');
const reponseError = require('../common/responseError');
const authMiddleware = require('../../middlewares/auth');

export let router = express.Router();

router.use('/order', function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.use('/order', authMiddleware);

/**
 * GET /api/order
 *
 * @author seonhyungjo
 * @summary 모든 주문내역 조회
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 */
router.get('/order', function(req, res) {
    Orders.findAllOrder()
        .then(orderList => {
            if (!orderList) throw new Error('order not found');
            res.status(200).send(orderList);
        })
        .catch(err => {
            console.log(err);
            reponseError(res, 'NOT_FIND_ODER');
        });
});

/**
 * GET /api/order/list/:branchCode
 *
 * @author seonhyungjo
 * @summary 모든 주문내역 조회
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 */
router.get('/order/list/:branchCode', function(req, res) {
    Orders.findOrderList(req.params.branchCode)
        .then(orderList => {
            if (!orderList) throw new Error('order not found');
            res.status(200).send(orderList);
        })
        .catch(err => {
            console.log(err);
            reponseError(res, 'NOT_FIND_ODER');
        });
});

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
router.get('/order/branch/incomplete', function(req, res) {
    Orders.findInCompleteBranches()
        .then(branchList => {
            if (!branchList) throw new Error('branch not found');
            res.status(200).send(branchList);
        })
        .catch(err => {
            console.log(err);
            reponseError(res, 'NOT_FIND_BRANCH');
        });
});

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
router.get('/order/branch/complete', function(req, res) {
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
});

/**
 * GET /api/order/:branchCode
 *
 * @author seonhyungjo
 * @summary 출고되지 않은 해당 지점 주문내역 조회
 * @private
 * @memberof Admin, User
 * @param
 * @see None
 * @returns «Query»
 */
router.get('/order/:branchCode', function(req, res) {
    Stores.find({ branchCode: req.params.branchCode })
        .then(store => {
            if (store.length == 0) {
                throw new Error('Dont exit branchCode');
            }

            return Orders.findInCompleteOrderByBranchcode(req.params.branchCode);
        })
        .then(order => {
            if (!order) throw new Error('order not found');
            res.status(200).send(order);
        })
        .catch(err => {
            console.log(err);
            reponseError(res, 'NOT_FIND_ODER');
        });
});

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
router.post('/order', (req, res) => {
    Stores.findStoreByBranchcode(req.body.branchCode)
        .then(store => {
            // branchName을 잘못 넣을 것을 대비해서 만듬
            req.body.branchName = store.branchName;
            return Orders.findInCompleteOrderByBranchcode(store.branchCode);
        })
        .then(order => {
            if (order.length !== 0) {
                //기존에 complete:false인 내역이 있을 경우 수정진행
                console.log('Modified');
                const modifiedOrder = Object.assign({}, order, req.body);

                return Orders.findOneAndUpdateNew(req.body.branchCode, modifiedOrder);
                //throw new Error('Already exit');
            }
            // 기존에 complete:false인 내역이 없을 경우 주문내역 추가
            return Orders.create(req.body);
        })
        .then(() => {
            res.status(200).send({ success: '0000' });
        })
        .catch(err => {
            console.log(err);
            reponseError(res, 'CREATE_ODER_ERROR');
        });
});

/**
 * PUT /api/order/complete/:branchCode
 *
 * @author seonhyungjo
 * @summary 지점별 출고완료 처리하기
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 */
router.put('/order/complete/:branchCode', (req, res) => {
    Orders.findInCompleteOrderByBranchcode(req.params.branchCode)
        .then(order => {
            if (order.length == 0) {
                console.log('Dont exit');
                reponseError(res, 'DONT_EXIT');
            }
            return Orders.changeCompleteTrue(req.params.branchCode);
        })
        .then(() => {
            res.status(200).send({ success: '0000' });
        })
        .catch(err => {
            console.log(err);
            reponseError(res, 'AREADY_COMPLETE');
        });
});

/**
 * DELETE /api/order/:_id
 *
 * @author seonhyungjo
 * @summary 지점별 출고완료 처리하기
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns «Query»
 */
router.delete('/order/:_id', (req, res) => {
    Orders.deleteByBranchCode(req.params._id)
        .then(() => {
            res.status(200).send({ success: '0000' });
        })
        .catch(err => {
            console.log(err);
            reponseError(res, 'DELETE_ODER_ERROR');
        });
});
