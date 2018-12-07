import express from 'express';
const Users = require('../../models/users');
const reponseError = require('../common/responseError');
const authMiddleware = require('../../middlewares/auth');

export let router = express.Router();

router.use('/user/', function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
//router.use('/', authMiddleware);

/**
 * GET /api/user
 *
 * @author seonhyungjo
 * @summary 모든 유저 정보 가져오기
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns userList
 */
router.get('/user', function(req, res) {
    Users.findAll()
        .then(user => {
            if (!user) {
                throw new Error("Can't find users");
            }
            res.status(200).send(user);
        })
        .catch(err => {
            console.log(err);
            reponseError(res, 'NOT_FIND_USER');
        });
});

/**
 * GET /api/user/:_id
 *
 * @author seonhyungjo
 * @summary 특정 유저 정보 가져오기
 * @private
 * @memberof Admin
 * @param _id: 유저 시퀀스 아이디
 * @see None
 * @returns user
 */
router.get('/user/:_id', function(req, res) {
    Users.findOneById(req.params._id)
        .then(user => {
            if (!user) {
                throw new Error("Can't find user");
            }
            res.status(200).send(user);
        })
        .catch(err => {
            console.log(err);
            reponseError(res, 'NOT_FIND_USER');
        });
});

/**
 * GET /api/user/list/:branchCode
 *
 * @author seonhyungjo
 * @summary 지점관련 유저들 가져오기
 * @private
 * @memberof Admin
 * @param branchCode: 지점코드
 * @see None
 * @returns userList
 */
router.get('/user/list/:branchCode', function(req, res) {
    Users.findOneByBranchCode(req.params.branchCode)
        .then(user => {
            if (!user) {
                throw new Error("Can't find users");
            }
            res.status(200).send(user);
        })
        .catch(err => {
            console.log(err);
            reponseError(res, 'NOT_FIND_USER');
        });
});

/**
 * PUT /api/user/:_id
 *
 * @author seonhyungjo
 * @summary 유저 업데이트
 * @private
 * @memberof Admin
 * @param _id: 유저 시퀀스 아이디
 * @param body: {userInfo}
 * @see None
 * @returns
 */
router.put('/user/:_id', (req, res) => {
    Users.updateById(req.params._id, req.body)
        .then(user => {
            if (!user) throw new Error("Can't find _id");
            res.status(200).send({ success: '0000' });
        })
        .catch(err => {
            console.log(err);
            reponseError(res, 'UPDATE_USER_ERROR');
        });
});

/**
 * DELETE /api/user/:_id
 *
 * @author seonhyungjo
 * @summary 유저 삭제하기
 * @private
 * @memberof Admin
 * @param _id: 유저 시퀀스 아이디
 * @see None
 * @returns
 */
router.delete('/user/:_id', (req, res) => {
    Users.deleteById(req.params._id)
        .then(user => {
            if (!user) throw new Error("Can't find _id");
            res.status(200).send({ success: '0000' });
        })
        .catch(err => {
            console.log(err);
            reponseError(res, 'DELETE_USER_ERROR');
        });
});
