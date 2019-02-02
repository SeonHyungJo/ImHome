let routers = [];

// module을 불러와 routers에 푸쉬한다.
import { router as product } from './product';
import { router as company } from './company';

routers.push(product);
routers.push(company);

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

// module.exports = routers;
// default로 export하는 경우 let || var 를 함께 못쓴다 따라서 아래와 같이 코딩한다.
export default routers;
