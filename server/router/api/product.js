import express from 'express';
const Products = require('../../models/products');
const Companys = require('../../models/companys');
const reponseError = require('../common/responseError');

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
    Products.findByCompanyCode(req.body.companyCode)
        .then(product => {
            if (product.length === 0) {
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
    Products.findByCompanyCode(req.params.companyCode)
        .then(product => {
            if (!product) return res.status(404).send({ err: 'product not found' });
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

/**
 * @author jinseong
 * @summary product 생성
 * @param companyCode: 회사코드
 * @param body: 품목정보 { productName, productDesc }
 */
router.post('/product/:companyCode', function(req, res) {
    Companys.findCompanyByCompanyCode(req.params.companyCode)
        .then(company => {
            const productInfo = {
                companyCode: company.companyCode,
                companyName: company.companyName,
                ...req.body
            };
            Products.create(productInfo)
                .then(product => res.status(200).send({ success: '0000' }))
                .catch(err => {
                    console.log(err);
                    reponseError(res, 'CREATE_PRODUCT_ERROR');
                });
        })
        .catch(err => {
            console.log(err);
            reponseError(res, 'CANT_FIND_COMPANY');
        });
});

// Products.findById(req.params.companyCode).then(() =>
//     create(req.body)
//         .then(company => {
//             res.status(200).send({ success: '0000' });
//         })
//         .catch(err => {
//             console.log(err);
//             reponseError(res, 'CREATE_ODER_ERROR');
//         })
// );
