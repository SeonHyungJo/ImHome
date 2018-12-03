import express from 'express';
const Stores = require('../../models/stores');
const reponseError = require('../common/responseError');
const authMiddleware = require('../../middlewares/auth');

export let router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
//router.use('/', authMiddleware);

router.get('/store/list', function(req, res) {
    Stores.findAll()
        .then(store => {
            if (!store) return reponseError(res, 'NOT_FIND_ODER');
            res.status(200).send(store);
        })
        .catch(err => {
            console.log(err);
            reponseError(res, 'NOT_FIND_ODER');
        });
});

router.post('/store/list', function(req, res) {
    Stores.create(req.body)
        .then(store => {
            res.status(200).send({ success: '0000' });
        })
        .catch(err => {
            console.log(err);
            reponseError(res, 'NOT_FIND_ODER');
        });
});
