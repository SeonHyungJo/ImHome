import express from 'express';
const Users = require('../../models/users');
const Stores = require('../../models/stores');
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
            if (!store) return res.status(404).send({ err: 'user not found' });
            console.log(store);

            res.json(store);
        })
        .catch(err => res.status(500).send(err));
});

router.post('/store/list', function(req, res) {
    Stores.create(req.body)
        .then(store => {
            if (!store) return res.status(404).send({ err: 'user not found' });
            console.log(store);

            res.json(store);
        })
        .catch(err => res.status(500).send(err));
});

router.get('/store/list2', function(req, res) {
    Users.getAllBranches()
        .then(user => {
            if (!user) return res.status(404).send({ err: 'user not found' });
            console.log(user);

            res.json(user);
        })
        .catch(err => res.status(500).send(err));
});
