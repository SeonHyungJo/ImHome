const Products = require('../../models/products');
const reponseError = require('../common/responseError');

// exports.use('/product', function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

exports.getAllProducts = (req, res) => {
  Products.findAll()
    .then(products => {
      res.json(products);
    })
    .catch(err => {
      console.log(err);
      reponseError(res, 'CANT_FIND_PRODUCT');
    });
};

exports.getProduct = (req, res) => {
  Products.findByCompanyCode(req.params.companyCode)
    .then(product => {
      if (!product) return res.status(404).send({ err: 'product not found' });
      res.json(product);
    })
    .catch(err => res.status(500).send(err));
};

exports.deleteProduct = (req, res) => {
  Products.deleteById(req.params.productId)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
};

/**
 * @author jinseong
 * @summary product 생성
 * @param body: 품목정보 { companyCode, companyName, order }
 */
exports.createProduct = (req, res) => {
  Products.create(req.body)
    .then(product => res.status(200).send({ success: '0000' }))
    .catch(err => {
      console.log(err);
      reponseError(res, 'CREATE_PRODUCT_ERROR');
    });
};

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
exports.createItem = (req, res) => {
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
};

/**
 * @author jinseong
 * @summary item 제거
 * @param companyCode
 * @param body: {
                _id : item id
            }
 */
exports.deleteItem = (req, res) => {
  req.params.itemId === undefined &&
  req.params.itemId === '' &&
  req.params.companyCode === undefined
    ? reponseError(res, 'DELETE_ITEM_ERROR')
    : Products.findOneAndUpdateDelete(req.params.companyCode, req.params.itemId)
        .then(product => {
          if (!product) {
            reponseError(res, 'CANT_FIND_PRODUCT');
          }
          res.json(product);
        })
        .catch(err => {
          console.log(err);
          reponseError(res, 'DELETE_ITEM_ERROR');
        });
};

/**
 * @author jinseong
 * @summary item 변경
 * @param companyCode
 * @param body: {
                _id : item id
            }
 */
exports.updateItem = (req, res) => {
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
};
