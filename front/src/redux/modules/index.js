import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';

import auth from './auth';
import nav from './nav';
import user from './user';
import orderList from './orderList';
import releaseList from './releaseList';
import productList from './productList';

export default combineReducers({
    auth,
    nav,
    user,
    orderList,
    productList,
    releaseList,
    pender: penderReducer
});
