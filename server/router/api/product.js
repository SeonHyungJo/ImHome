var express = require('express');
var router = express.Router();
var Products = require('../../models/Products');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/product', function (req, res) {
    Products.find(function (err, productList) {
        if (err) {
            return res.status(500).send({ error: 'database failure' });
        }
        res.json(productList);
    });
});

router.post('/product', (req, res) => {
    Products.create(req.body)
        .then(todo => res.send(todo))
        .catch(err => res.status(500).send(err));
});

// GET by branchCode
router.get('/product/:id', function (req, res) {
    Products.findOneById(req.params.id)
        .then((user) => {
            if (!user) return res.status(404).send({ err: 'user not found' });
            console.log(user);
            res.json(user);
        })
        .catch(err => res.status(500).send(err));
});

// Update by branchCode
router.put('/product/:id', (req, res) => {
    Products.updateById(req.params.id, req.body)
        .then(user => res.send(user))
        .catch(err => res.status(500).send(err));
});

// Delete by branchCode
router.delete('/product/:id', (req, res) => {
    Products.deleteById(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});

module.exports = router;