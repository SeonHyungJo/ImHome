import express from 'express';
const Products = require('../../models/products');

export let router = express.Router();

router.use('/product', function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/products', function(req, res) {
    Products.find(function(err, products) {
        if (err) {
            return res.status(500).send({ error: 'database failure' });
        }
        res.json(products);
    });
});

router.post('/product', (req, res) => {
    Products.findOneByCompanyCode(req.body.companyCode)
        .then(product => {
            if (product.length == 0) {
                Products.create(req.body)
                    .then(result => res.send(result))
                    .catch(err => res.status(500).send(err));
            } else {
                res.status(404).send({ err: 'already exit' });
            }
        })
        .catch(err => res.status(500).send(err));
});

router.get('/product/:companyCode', function(req, res) {
    Products.findOneByCompanyCode(req.params.companyCode)
        .then(product => {
            if (!product) return res.status(404).send({ err: 'product not found' });
            console.log(product);
            res.json(product);
        })
        .catch(err => res.status(500).send(err));
});

router.put('/product', (req, res) => {
    console.log('test');
    Products.findOneAndUpdateNew(req.body.companyCode, req.body)
        .then(product => res.send(product))
        .catch(err => res.status(500).send(err));
});

router.delete('/product/:productId', (req, res) => {
    Products.deleteById(req.params.productId)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});
