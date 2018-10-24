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
    Products.findOneByCompanyCode(req.body.companyCode)
        .then((product) => {
            console.log(product.length);
            if(product.length == 0){
                Products.create(req.body)
                    .then(result => res.send(result))
                    .catch(err => res.status(500).send(err));
            }else{
                res.status(404).send({ err: 'already exit' });
            }
        })
        .catch(err => res.status(500).send(err));
});

// GET by branchCode
router.get('/product/:companyCode', function (req, res) {
    Products.findOneById(req.params.companyCode)
        .then((user) => {
            if (!user) return res.status(404).send({ err: 'user not found' });
            console.log(user);
            res.json(user);
        })
        .catch(err => res.status(500).send(err));
});

// Update by branchCode
router.put('/product/:companyCode', (req, res) => {
    Products.updateById(req.params.companyCode, req.body)
        .then(user => res.send(user))
        .catch(err => res.status(500).send(err));
});

// Delete by branchCode
router.delete('/product/:companyCode', (req, res) => {
    Products.deleteById(req.params.companyCode)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});

module.exports = router;