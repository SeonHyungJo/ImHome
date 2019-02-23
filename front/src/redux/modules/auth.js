import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map } from 'immutable';
import * as AuthAPI from '../../lib/api/auth';

const CHANGE_INPUT = 'auth/CHANGE_INPUT'; // input 값 변경
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'; // form 초기화
const USER_REGISTER = 'auth/USER_REGISTER'; // 이메일 가입
const USER_LOGIN = 'auth/USER_LOGIN'; // 이메일 로그인
const LOGOUT = 'auth/LOGOUT'; // 로그아웃
const SET_MESSAGE = 'auth/SET_MESSAGE'; // 오류 설정
const CHECK_STATUS = 'auth/CHECK_STATUS';
const GET_STORE_LIST = 'auth/GET_STORE_LIST'; // 매장 목록 가져오기

export const changeInput = createAction(CHANGE_INPUT); // {form, name, value}
export const initializeForm = createAction(INITIALIZE_FORM); // form
export const userRegister = createAction(USER_REGISTER, AuthAPI.userRegister);
export const userLogin = createAction(USER_LOGIN, AuthAPI.userLogin); // { email, password }
export const logout = createAction(LOGOUT, AuthAPI.logout);
export const setMessage = createAction(SET_MESSAGE); // { form, message }
export const checkStatus = createAction(CHECK_STATUS, AuthAPI.checkStatus);
export const getStoreList = createAction(GET_STORE_LIST, AuthAPI.getStoreList);

const initialState = Map({
  register: Map({
    form: Map({
      id: '',
      password: '',
      passwordConfirm: '',
      name: '',
      bNumber: '',
      bAddress: '',
      cName: '',
      email: '',
      bPhoneNumber: '',
      branchCode: '',
      branchName: '',
    }),
    store: [],
    message: null,
  }),
  login: Map({
    form: Map({
      id: '',
      password: '',
    }),
    message: null,
  }),
  result: Map({}),
});

export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => {
      const { form, name, value } = action.payload;
      return state.setIn([form, 'form', name], value);
    },
    [INITIALIZE_FORM]: (state, action) => {
      const initialForm = initialState.get(action.payload);
      return state.set(action.payload, initialForm);
    },
    [SET_MESSAGE]: (state, action) => {
      const { form, message } = action.payload;
      return state.setIn([form, 'message'], message);
    },
    ...pender({
      type: GET_STORE_LIST,
      onSuccess: (state, action) => state.setIn(['register', 'store'], action.payload.data),
    }),
    ...pender({
      type: USER_LOGIN,
      onSuccess: (state, action) => state.set('result', Map(action.payload.data)),
    }),
    ...pender({
      type: USER_REGISTER,
      onSuccess: (state, action) => state.set('result', Map(action.payload.data)),
    }),
    ...pender({
      type: CHECK_STATUS,
      onSuccess: (state, action) => state.set('result', Map(action.payload.data)),
    }),
  },
  initialState,
);
