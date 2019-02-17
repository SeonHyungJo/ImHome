import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List } from 'immutable';
import * as tempOrderAPI from '../../lib/api/tempOrder';

const CHANGE_CURRENTID = 'orderList/CHANGE_CURRENTID'; // Nav 위치 변경

const GET_STORE_LIST = 'orderList/GET_STORE_LIST'; // 매장 목록 가져오기
const GET_ORDER_DATA = 'orderList/GET_ORDER_DATA'; // 주문내역 가져오기
const UPDATE_ORDER_COMPLETE = 'orderList/UPDATE_ORDER_COMPLETE'; // 배송 완료 처리하기
const DELETE_ORDER = 'orderList/DELETE_ORDER'; // 주문내역 취소하기

const CREATE_TEMP_ORDER = 'orderList/CREATE_TEMP_ORDER'; // 주문하기

export const updateCurrentId = createAction(CHANGE_CURRENTID);

export const getStoreList = createAction(GET_STORE_LIST, tempOrderAPI.getStoreList);
export const getOrderData = createAction(GET_ORDER_DATA, tempOrderAPI.getOrderData);

export const updateComplete = createAction(UPDATE_ORDER_COMPLETE, tempOrderAPI.updateComplete);
export const deleteOrderData = createAction(DELETE_ORDER, tempOrderAPI.deleteOrderData);

export const createTempOrder = createAction(CREATE_TEMP_ORDER, tempOrderAPI.createTempOrder);

// 초기값 설정
const initialState = Map({
  tempOrderList: Map({
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
    ...pender({
      type: GET_STORE_LIST,
      onSuccess: (state, action) => state
        .setIn(['orderList', 'store'], action.payload.data)
        .setIn(['orderList', 'currentId'], action.payload.data[0].branchCode),
    }),
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
      type: CREATE_TEMP_ORDER,
      onSuccess: (state, action) => {
        console.log(action.payload.data);
        return state.setIn(['result'], Map(action.payload.data));
      },
    }),
  },
  initialState,
);
