var express = require('express');
var router = express.Router();
var Users = require('../../models/users');

//router.use('/', authMiddleware);

router.get('/', function (req, res) {
    Users.find(function (err, users) {
        if (err) {
            return res.status(500).send({ error: 'database failure' });
        }
        res.json(users);
    });
});

router.post('/', (req, res) => {
    Users.create(req.body)
        .then(todo => res.send(todo))
        .catch(err => res.status(500).send(err));
});

// GET by branchCode
router.get('/user/:id', function (req, res) {
    Users.findOneById(req.params.id)
        .then((user) => {
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

module.exports = router;