import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List } from 'immutable';

import * as orderListAPI from '../../lib/api/orderList';

const CHANGE_CURRENTID = 'orderList/CHANGE_CURRENTID'; // Nav 위치 변경
const REMOVE_ITEM_LIST = 'orderList/REMOVE_ITEM_LIST'; // ITEMS 내역에서 제거
const INITIALIZE_FORM = 'orderList/INITIALIZE_FORM'; // form 초기화

const GET_STORE_LIST = 'orderList/GET_STORE_LIST'; // 매장 목록 가져오기
const GET_ORDER_DATA = 'orderList/GET_ORDER_DATA'; // 주문내역 가져오기
const UPDATE_ORDER_COMPLETE = 'orderList/UPDATE_ORDER_COMPLETE'; // 배송 완료 처리하기
const DELETE_ORDER = 'orderList/DELETE_ORDER'; // 주문내역 취소하기

const CREATE_ORDER = 'orderList/CREATE_ORDER'; // 주문하기

export const updateCurrentId = createAction(CHANGE_CURRENTID);
export const removeItemList = createAction(REMOVE_ITEM_LIST);
export const initializeForm = createAction(INITIALIZE_FORM); // form

export const getStoreList = createAction(GET_STORE_LIST, orderListAPI.getStoreList);
export const getOrderData = createAction(GET_ORDER_DATA, orderListAPI.getOrderData);

export const updateComplete = createAction(UPDATE_ORDER_COMPLETE, orderListAPI.updateComplete);
export const deleteOrderData = createAction(DELETE_ORDER, orderListAPI.deleteOrderData);

export const createOrder = createAction(CREATE_ORDER, orderListAPI.createOrder);

// 초기값 설정
const initialState = Map({
  orderList: Map({
    initialForm: Map({
      _id: '',
      branchCode: '',
      branchName: '',
      items: '',
      updatedAt: '',
    }),
    currentOrder: Map({
      _id: '',
      branchCode: '',
      branchName: '',
      items: List([
        Map({
          itemName: '',
          itemCount: '',
          itemCost: '',
          itemVolume: '',
          itemDepth: '',
        }),
      ]),
      updatedAt: '',
    }),
    error: null,
    store: [],
    currentId: [],
    list: [],
  }),
  result: Map({}),
});

export default handleActions(
  {
    [CHANGE_CURRENTID]: (state, action) => state.setIn(['orderList', 'currentId'], action.payload),
    [REMOVE_ITEM_LIST]: (state, action) => state.set(['orderList', 'currentOrder', 'items'], List(action.payload)),
    ...pender({
      type: GET_STORE_LIST,
      onSuccess: (state, action) => state
        .setIn(['orderList', 'store'], action.payload.data)
        .setIn(['orderList', 'currentId'], action.payload.data[0].branchCode),
    }),
    [INITIALIZE_FORM]: (state, action) => {
      const initialForm = initialState.get(action.payload);
      return state.set(action.payload, initialForm);
    },
    ...pender({
      type: GET_ORDER_DATA,
      onSuccess: (state, action) => state.setIn(['orderList', 'currentOrder'], action.payload.data[0]),
    }),
    ...pender({
      type: UPDATE_ORDER_COMPLETE,
      onSuccess: (state, action) => state.setIn(['orderList', 'form'], Map(action.payload.data)),
    }),
    ...pender({
      type: DELETE_ORDER,
      onSuccess: (state, action) => state.setIn(['orderList', 'form'], Map(action.payload.data)),
    }),
    ...pender({
      type: CREATE_ORDER,
      onSuccess: (state, action) => state.setIn(['result'], Map(action.payload.data)),
      onFailure: (state, action) => state.setIn(['result'], action.payload),
    }),
  },
  initialState,
);
