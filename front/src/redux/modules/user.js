import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as userAPI from '../../lib/api/user';
import { Map } from 'immutable';

const CHANGE_INPUT = 'user/CHANGE_INPUT'; //input 값 변경
const INITIALIZE_FORM = 'user/INITIALIZE_FORM'; //form 초기화
const SET_ERROR = 'user/SET_ERROR'; // 오류 설정
const GET_STORE_LIST = 'user/GET_STORE_LIST'; // 매장 목록 가져오기
const GET_USER_LIST = 'user/GET_USER_LIST'; //해당 매장의 회원 목록 가져오기
const GET_USER_DATA = 'user/GET_USER_DATA'; //해당 회원의 상세 정보 가져오기
const GET_USER_UPDATE_DATA = 'user/GET_USER_UPDATE_DATA'; //해당 회원의 상세 정보 가져오기
const UPDATE_USER_DATA = 'user/UPDATE_USER_DATA'; //해당 회원의 정보 수정

export const changeInput = createAction(CHANGE_INPUT); // {form, name, value}
export const initializeForm = createAction(INITIALIZE_FORM); // form
export const setError = createAction(SET_ERROR); // { form, message }

export const getStoreList = createAction(GET_STORE_LIST, userAPI.getStoreList);
export const getUserList = createAction(GET_USER_LIST, userAPI.getUserList);
export const getUserData = createAction(GET_USER_DATA, userAPI.getUserData);
export const getUserUpdateData = createAction(GET_USER_UPDATE_DATA, userAPI.getUserUpdateData);
export const updateUserData = createAction(UPDATE_USER_DATA, userAPI.updateUserData);

// 초기값 설정
const initialState = Map({
    user: Map({
        form: Map({
            _id: '',
            branchCode: '',
            branchName: '',
            name: '',
            id: '',
            cName: '',
            bNumber: '',
            bAddress: '',
            email: '',
            pNumber: '',
        }),
        updateForm: Map({
            _id: '',
            branchCode: '',
            branchName: '',
            name: '',
            id: '',
            cName: '',
            bNumber: '',
            bAddress: '',
            email: '',
            pNumber: '',
        }),
        error: null,
        store: [],
        list: []
    }),
    result: Map({})
});

export default handleActions({
    [CHANGE_INPUT]: (state, action) => {
        const { form, name, value, targetForm } = action.payload;
        return state.setIn([form, targetForm ? targetForm : 'form', name], value);
    },
    [INITIALIZE_FORM]: (state, action) => {
        const initialForm = initialState.get(action.payload);
        return state.set(action.payload, initialForm);
    },
    [SET_ERROR]: (state, action) => {
        const { form, message } = action.payload;
        return state.setIn([form, 'error'], message);
    },
    ...pender({
        type: GET_STORE_LIST,
        onSuccess: (state, action) => state.setIn(['user', 'store'], action.payload.data)
    }),
    ...pender({
        type: GET_USER_LIST,
        onSuccess: (state, action) => state.setIn(['user', 'list'], action.payload.data)
    }),
    ...pender({
        type: GET_USER_DATA,
        onSuccess: (state, action) => state.setIn(['user', 'form'], Map(action.payload.data))
    }),
    ...pender({
        type: GET_USER_UPDATE_DATA,
        onSuccess: (state, action) => state.setIn(['user', 'updateForm'], Map(action.payload.data))
    }),
    ...pender({
        type: UPDATE_USER_DATA,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    }),
}, initialState);