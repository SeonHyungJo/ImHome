import express from 'express';
const Products = require('../../models/products');
const reponseError = require('../common/responseError');

export let router = express.Router();

router.use('/product', function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/products', function(req, res) {
    Products.findAll()
        .then(products => {
            res.json(products);
        })
        .catch(err => {
            console.log(err);
            reponseError(res, 'CANT_FIND_PRODUCT');
        });
});

router.get('/product/:companyCode', function(req, res) {
    Products.findByCompanyCode(req.params.companyCode)
        .then(product => {
            if (!product) return res.status(404).send({ err: 'product not found' });
            res.json(product);
        })
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
 * @param body: 품목정보 { companyCode, companyName, order }
 */
router.post('/product', function(req, res) {
    Products.create(req.body)
        .then(product => res.status(200).send({ success: '0000' }))
        .catch(err => {
            console.log(err);
            reponseError(res, 'CREATE_PRODUCT_ERROR');
        });
});

/**
 * @author jinseong
 * @summary item 생성
 * @param companyCode
 * @param body: {
                itemName: 이름,
                itemCount: 수량,
                itemCost: 가격,
                itemVolume: 단위,
                itemDepth: depth: 0 || 1,
                parentId: 카테고리(부모뎁스),
                itemDesc: 카테고리 설명
            }
 */
router.post('/product/:companyCode/item', function(req, res) {
    // req.body.parentId가 0이 아닌지에 따라 카테고리인지 분기
    if (req.body.parentId === '0') {
        // category를 만든다.
        Products.findOneAndUpdateNew(req.params.companyCode, req.body)
            .then(product => {
                if (!product) {
                    reponseError(res, 'CANT_FIND_PRODUCT');
                }
                res.json(product);
            })
            .catch(err => {
                console.log(err);
                reponseError(res, 'UPDATE_ITEM_ERROR');
            });
    } else {
        // item을 만든다
        // paentId처리를 어떻게 할것인지 추후 결정
        Products.findOneAndUpdateNew(req.params.companyCode, req.body)
            .then(product => {
                if (!product) {
                    reponseError(res, 'CANT_FIND_PRODUCT');
                }
                res.json(product);
            })
            .catch(err => {
                console.log(err);
                reponseError(res, 'UPDATE_ITEM_ERROR');
            });
    }
});

/**
 * @author jinseong
 * @summary item 제거
 * @param companyCode
 * @param body: {
                _id : item id
            }
 */
router.delete('/product/:companyCode/item', function(req, res) {
    Products.findOneAndUpdateDelete(req.params.companyCode, req.body)
        .then(product => {
            if (!product) {
                reponseError(res, 'CANT_FIND_PRODUCT');
            }
            res.json(product);
        })
        .catch(err => {
            console.log(err);
            reponseError(res, 'UPDATE_ITEM_ERROR');
        });
});

/**
 * @author jinseong
 * @summary item 변경
 * @param companyCode
 * @param body: {
                _id : item id
            }
 */
router.put('/product/:companyCode/item', function(req, res) {
    Products.findOneAndUpdateItem(req.params.companyCode, req.body)
        .then(product => {
            if (!product) {
                reponseError(res, 'CANT_FIND_PRODUCT');
            }
            res.json(product);
        })
        .catch(err => {
            console.log(err);
            reponseError(res, 'UPDATE_ITEM_ERROR');
        });
});
