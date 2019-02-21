import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map } from 'immutable';
import * as userAPI from '../../lib/api/user';

const CHANGE_INPUT = 'user/CHANGE_INPUT'; // input 값 변경
const INITIALIZE_FORM = 'user/INITIALIZE_FORM'; // form 초기화
const SET_MESSAGE = 'user/SET_MESSAGE'; // 오류 설정
const SET_RESULT_DATA = 'user/SET_RESULT_DATA'; // resultData form에 설정
const SET_FORM_DATA = 'user/SET_FORM_DATA'; // resultData form에 설정

const GET_FIRST_LIST = 'user/GET_FIRST_LIST'; // 첫번째 항목의 storeId와 userId를 가져옴
const GET_STORE_LIST = 'user/GET_STORE_LIST'; // 매장 목록 가져오기
const GET_USER_LIST = 'user/GET_USER_LIST'; // 해당 매장의 회원 목록 가져오기
const GET_USER_DATA = 'user/GET_USER_DATA'; // 해당 회원의 상세 정보 가져오기
const GET_USER_UPDATE_DATA = 'user/GET_USER_UPDATE_DATA'; // 해당 회원의 상세 정보 가져오기
const UPDATE_USER_DATA = 'user/UPDATE_USER_DATA'; // 해당 회원의 정보 수정
const DELETE_USER_DATA = 'user/DELETE_USER_DATA';

export const changeInput = createAction(CHANGE_INPUT); // {form, name, value}
export const initializeForm = createAction(INITIALIZE_FORM); // form
export const setMessage = createAction(SET_MESSAGE); // { form, message }
export const setResultData = createAction(SET_RESULT_DATA); // { form, data }
export const setFormData = createAction(SET_FORM_DATA); // { form, data }

export const getFirstList = createAction(GET_FIRST_LIST, userAPI.getFirstList);
export const getStoreList = createAction(GET_STORE_LIST, userAPI.getStoreList);
export const getUserList = createAction(GET_USER_LIST, userAPI.getUserList);
export const getUserData = createAction(GET_USER_DATA, userAPI.getUserData);
export const getUserUpdateData = createAction(GET_USER_UPDATE_DATA, userAPI.getUserUpdateData);
export const updateUserData = createAction(UPDATE_USER_DATA, userAPI.updateUserData);
export const deleteUserData = createAction(DELETE_USER_DATA, userAPI.deleteUserData);

// 초기값 설정
const initialState = Map({
  user: Map({
    firstList: '',
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
      bPhoneNumber: '',
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
      bPhoneNumber: '',
    }),
    message: null,
    store: [],
    list: '',
    currentStoreId: '',
    currentUserId: '',
  }),
  result: Map({}),
});

export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => {
      const {
        form, name, value, targetForm,
      } = action.payload;
      return state.setIn([form, targetForm || 'form', name], value);
    },
    [INITIALIZE_FORM]: (state, action) => {
      console.log(state, action)
      const initialForm = initialState.get(action.payload);
      return state.set(action.payload, initialForm);
    },
    [SET_MESSAGE]: (state, action) => {
      const { form, message } = action.payload;
      return state.setIn([form, 'message'], message);
    },
    [SET_RESULT_DATA]: (state, action) => {
      const { form, result, target } = action.payload;
      return state.setIn([form, target], result);
    },
    [SET_FORM_DATA]: (state, action) => {
      const { result } = action.payload;
      return state.setIn(['user', 'form'], Map(result)).setIn(['user', 'updateForm'], Map(result));
    },
    ...pender({
      type: GET_FIRST_LIST,
      onSuccess: (state, action) => state.setIn(['user', 'firstList'], action.payload.data),
    }),
    ...pender({
      type: GET_STORE_LIST,
      onSuccess: (state, action) => state.setIn(['user', 'store'], action.payload.data),
    }),
    ...pender({
      type: GET_USER_LIST,
      onSuccess: (state, action) => state.set('result', Map(action.payload.data)),
    }),
    ...pender({
      type: GET_USER_DATA,
      onSuccess: (state, action) => state
        .setIn(['user', 'form'], Map(action.payload.data))
        .setIn(['user', 'updateForm'], Map(action.payload.data)),
    }),
    ...pender({
      type: GET_USER_UPDATE_DATA,
      onSuccess: (state, action) => state.setIn(['user', 'updateForm'], Map(action.payload.data)),
    }),
    ...pender({
      type: UPDATE_USER_DATA,
      onSuccess: (state, action) => state.set('result', Map(action.payload.data)),
    }),
    ...pender({
      type: DELETE_USER_DATA,
      onSuccess: (state, action) => state.set('result', Map(action.payload.data)),
    }),
  },
  initialState,
);
