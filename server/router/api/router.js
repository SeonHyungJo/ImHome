let routers = [];

// require로 추가한 뒤 routers에 푸쉬한다.
const user = require('./user');
const product = require('./product');
const order = require('./order');

routers.push(user);
routers.push(product);
routers.push(order);

// 추후 이런방식으로 가고싶은데 에러남 => Schema hasn't been registered for model "users"가 order.js에서 에러
// fs.readdirSync(__dirname)
//     .filter(file => {
//         return (
//             file.indexOf('.') !== 0 &&
//             file !== basename &&
//             file.slice(-3) === '.js'
//         );
//     })
//     .map(file => {
//         let router = require('./' + file.slice(0, -3));
//         routers.push(router);
//     });

module.exports = routers;
