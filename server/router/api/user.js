import express from 'express';
const Users = require('../../models/users');
const authMiddleware = require('../../middlewares/auth');

export let router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
//router.use('/', authMiddleware);

router.get('/user', function(req, res) {
    Users.find(function(err, users) {
        if (err) {
            return res.status(500).send({ error: 'database failure' });
        }
        res.json(users);
    });
});

// GET by branchCode
router.get('/user/:id', function(req, res) {
    Users.findOneById(req.params.id)
        .then(user => {
            if (!user) return res.status(404).send({ err: 'user not found' });
            console.log(user);
            res.json(user);
        })
        .catch(err => res.status(500).send(err));
});

router.get('/user/list/:branchCode', function(req, res) {
    Users.findOneByBranchCode(req.params.branchCode)
        .then(user => {
            if (!user) return res.status(404).send({ err: 'user not found' });
            console.log(user);
            res.json(user);
        })
        .catch(err => res.status(500).send(err));
});

// Update by branchCode
router.put('/user/:id', (req, res) => {
    Users.updateById(req.params.id, req.body)
        .then(user => res.send(user))
        .catch(err => res.status(500).send(err));
});

// Delete by branchCode
router.delete('/user/:id', (req, res) => {
    Users.deleteById(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});
