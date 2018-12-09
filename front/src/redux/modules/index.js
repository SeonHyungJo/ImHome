import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';

import auth from './auth';
import user from './user';
import orderList from './orderList';

export default combineReducers({
    auth,
    user,
    orderList,
    pender: penderReducer
});
