import express from 'express';
const Users = require('../../models/users');
const reponseError = require('../common/responseError');
const authMiddleware = require('../../middlewares/auth');

export let router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
//router.use('/', authMiddleware);

// GET All User List
router.get('/user', function(req, res) {
    Users.findAll()
        .then(user => {
            if (!user) {
                return reponseError(res, 'NOT_FIND_USER');
            }
            res.status(200).send(user);
        })
        .catch(err => reponseError(res, 'NOT_FIND_USER'));
});

// GET by branchCode
router.get('/user/:_id', function(req, res) {
    Users.findOneById(req.params._id)
        .then(user => {
            if (!user) {
                return reponseError(res, 'NOT_FIND_USER');
            }
            res.status(200).send(user);
        })
        .catch(err => reponseError(res, 'NOT_FIND_USER'));
});

// GET User List by branchCode
router.get('/user/list/:branchCode', function(req, res) {
    Users.findOneByBranchCode(req.params.branchCode)
        .then(user => {
            if (!user) {
                return reponseError(res, 'NOT_FIND_USER');
            }
            res.status(200).send(user);
        })
        .catch(err => reponseError(res, 'NOT_FIND_USER'));
});

// Update by _id
router.put('/user/:_id', (req, res) => {
    Users.updateById(req.params._id, req.body)
        .then(user => res.status(200).send({ success: '0000' }))
        .catch(err => {
            console.log(err);
            reponseError(res, 'UPDATE_USER_ERROR');
        });
});

// Delete by _id
router.delete('/user/:_id', (req, res) => {
    Users.deleteById(req.params._id)
        .then(() => res.status(200).send({ success: '0000' }))
        .catch(err => {
            console.log(err);
            reponseError(res, 'DELETE_USER_ERROR');
        });
});
