import express from 'express';
import mongoose from 'mongoose';
const Orders = require('../../models/orders');
const Stores = require('../../models/stores');
const Users = mongoose.model('users');
const reponseError = require('../common/responseError');
//const Orders = mongoose.model('orders');
//const Stores = mongoose.model('stores');

export let router = express.Router();

router.use('/order', function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

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
    Orders.find()
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

            return Orders.findInCompleteOrder(req.params.branchCode);
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
    Orders.findInCompleteOrder(req.body.branchCode)
        .then(order => {
            if (order.length !== 0) {
                //기존에 complete:false인 내역이 있을 경우 수정진행
                console.log('Modified');
                return Orders.findOneAndUpdateNew(req.body.branchCode, req.body);
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
    Orders.findInCompleteOrder(req.params.branchCode)
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

router.delete('/order/:branchCode', (req, res) => {
    Orders.deleteByBranchCode(req.params.branchCode)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});
