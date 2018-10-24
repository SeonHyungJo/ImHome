import { createAction, handleActions} from 'redux-actions';
import { pender } from 'redux-pender';
import * as AuthAPI from '../../lib/api/auth';
import { Map } from 'immutable';

const CHANGE_INPUT = 'auth/CHANGE_INPUT'; //input 값 변경
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'; //form 초기화
const USER_REGISTER = 'auth/USER_REGISTER'; // 이메일 가입
const USER_LOGIN = 'auth/USER_LOGIN'; // 이메일 로그인
const LOGOUT = 'auth/LOGOUT'; // 로그아웃
const SET_ERROR = 'auth/SET_ERROR'; // 오류 설정

export const changeInput = createAction(CHANGE_INPUT); // {form, name, value}
export const initializeForm = createAction(INITIALIZE_FORM); // form
export const userRegister = createAction(USER_REGISTER, AuthAPI.userRegister); // { email, password }
export const userLogin = createAction(USER_LOGIN, AuthAPI.userLogin); // { email, password }
export const logout = createAction(LOGOUT, AuthAPI.logout);
export const setError = createAction(SET_ERROR); // { form, message }

// 초기값 설정 @TODO 필드 추가 필요
const initialState = Map({
    register: Map({
        form: Map({
            custId: '',
            custPasswd: '',
            custPasswdConfirm: '',
        }),
        error: null
    }),
    login: Map({
        form: Map({
            custNo : null,
            custId: '',
            custPasswd: '',
        }),
        error: null
    }),
    result: Map({})
});

export default handleActions({
    [CHANGE_INPUT] : (state, action) => {
        const { form, name, value } = action.payload;
        return state.setIn([form, 'form', name], value);
    },
    [INITIALIZE_FORM] : (state, action) => {
        const initialForm = initialState.get(action.payload);
        return state.set(action.payload, initialForm);
    },
    [SET_ERROR]: (state, action) => {
        const { form, message } = action.payload;
        return state.setIn([form, 'error'], message);
    }, 
    ...pender({
        type: USER_LOGIN,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    }),
    ...pender({
        type: USER_REGISTER,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    }),
}, initialState);