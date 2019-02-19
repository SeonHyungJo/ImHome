import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';

import auth from './auth';
import user from './user';
import orderList from './orderList';
import releaseList from './releaseList';
import productList from './productList';
import tempOrder from './tempOrder';

export default combineReducers({
  auth,
  user,
  orderList,
  productList,
  releaseList,
  tempOrder,
  pender: penderReducer,
});
