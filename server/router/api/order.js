const express = require('express');
const Orders = require('../../models/orders');
const mongoose = require('mongoose');
const Users = mongoose.model('users');

let router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/order', function(req, res) {
    Orders.find(function(err, orderList) {
        if (err) {
            return res.status(500).send({ error: 'database failure' });
        }
        res.json(orderList);
    });
});

router.post('/order', (req, res) => {
    Orders.findOneByBranchCode(req.body.branchCode)
        .then(order => {
            if (order.length == 0) {
                Orders.create(req.body)
                    .then(result => res.send(result))
                    .catch(err => res.status(500).send(err));
            } else {
                res.status(404).send({ err: 'already exit' });
            }
        })
        .catch(err => res.status(500).send(err));
});

router.get('/order/:branchCode', function(req, res) {
    Users.find({ branchCode: req.params.branchCode })
        .then(user => {
            console.log(user);
            if (user.length !== 0) {
                Orders.findOneByBranchCode(req.params.branchCode)
                    .then(order => {
                        if (!order)
                            return res
                                .status(404)
                                .send({ err: 'order not found' });
                        res.json(order);
                    })
                    .catch(err => res.status(500).send(err));
            } else {
                res.status(500).send(err);
            }
        })
        .catch(err => res.status(500).send(err));
});

router.put('/order', (req, res) => {
    Orders.findOneAndUpdateNew(req.body.branchCode, req.body)
        .then(order => res.send(order))
        .catch(err => res.status(500).send(err));
});

router.delete('/order/:branchCode', (req, res) => {
    Orders.deleteByBranchCode(req.params.branchCode)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});

module.exports = router;
