import { combineReducers } from 'redux';
import auth from './auth';
import { penderReducer } from 'redux-pender';

export default combineReducers({
    auth,
    pender: penderReducer
});
