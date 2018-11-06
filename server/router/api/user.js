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
router.get('/user/:branchCode', function(req, res) {
    Users.findOneById(req.params.branchCode)
        .then(user => {
            if (!user) return res.status(404).send({ err: 'user not found' });
            console.log(user);
            res.json(user);
        })
        .catch(err => res.status(500).send(err));
});

// Update by branchCode
router.put('/user/:branchCode', (req, res) => {
    Users.updateById(req.params.branchCode, req.body)
        .then(user => res.send(user))
        .catch(err => res.status(500).send(err));
});

// Delete by branchCode
router.delete('/user/:branchCode', (req, res) => {
    Users.deleteById(req.params.branchCode)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});
