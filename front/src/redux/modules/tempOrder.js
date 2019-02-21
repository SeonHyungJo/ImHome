import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List, fromJS } from 'immutable';
import * as tempOrderAPI from '../../lib/api/tempOrder';

const CHANGE_CURRENTID = 'tempOrder/CHANGE_CURRENTID'; // Nav 위치 변경

const GET_STORE_LIST = 'tempOrder/GET_STORE_LIST'; // 매장 목록 가져오기
const GET_ORDER_DATA = 'tempOrder/GET_ORDER_DATA'; // 주문내역 가져오기
const UPDATE_ORDER_COMPLETE = 'tempOrder/UPDATE_ORDER_COMPLETE'; // 배송 완료 처리하기
const DELETE_ORDER = 'tempOrder/DELETE_ORDER'; // 주문내역 취소하기
const INITIALIZE_FORM = 'tempOrder/INITIALIZE_FORM'; // form 초기화

const CREATE_TEMP_ORDER = 'tempOrder/CREATE_TEMP_ORDER'; // 주문하기
const CHANGE_TEMP_ITEM = 'tempOrder/CHANGE_TEMP_ITEM';
const CHAGNE_TEMP_COUNT = 'tempOrder/CHAGNE_TEMP_COUNT';

export const updateCurrentId = createAction(CHANGE_CURRENTID);
export const initializeForm = createAction(INITIALIZE_FORM); // form

export const getStoreList = createAction(GET_STORE_LIST, tempOrderAPI.getStoreList);
export const getOrderData = createAction(GET_ORDER_DATA, tempOrderAPI.getOrderData);

export const updateComplete = createAction(UPDATE_ORDER_COMPLETE, tempOrderAPI.updateComplete);
export const deleteOrderData = createAction(DELETE_ORDER, tempOrderAPI.deleteOrderData);

export const createTempOrder = createAction(CREATE_TEMP_ORDER, tempOrderAPI.createTempOrder);
export const changeTempItem = createAction(CHANGE_TEMP_ITEM);
export const changeTempCount = createAction(CHAGNE_TEMP_COUNT);

const initialState = Map({
  tempOrder: Map({
    initialForm: Map({
      complete: false,
      branchCode: '',
      items: {},
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
    itemCount: Map({}),
    error: null,
  }),
  result: Map({}),
});

export default handleActions(
  {
    [CHANGE_CURRENTID]: (state, action) => state.setIn(['tempOrder', 'currentId'], action.payload),
    [CHANGE_TEMP_ITEM]: (state, action) => state.setIn(['tempOrder', 'currentOrder', 'items'], fromJS(action.payload)),
    [CHAGNE_TEMP_COUNT]: (state, action) => state.setIn(['tempOrder', 'itemCount'], Map(action.payload)),
    [INITIALIZE_FORM]: (state, action) => {
      const initialForm = initialState.get(action.payload);
      return state.set(action.payload, initialForm);
    },
    ...pender({
      type: GET_STORE_LIST,
      onSuccess: (state, action) => state
        .setIn(['tempOrder', 'store'], action.payload.data)
        .setIn(['tempOrder', 'currentId'], action.payload.data[0].branchCode),
    }),
    ...pender({
      type: GET_ORDER_DATA,
      onSuccess: (state, action) => state.setIn(['tempOrder', 'currentOrder'], Map(action.payload.data[0])),
    }),
    ...pender({
      type: UPDATE_ORDER_COMPLETE,
      onSuccess: (state, action) => state.setIn(['tempOrder', 'form'], Map(action.payload.data)),
    }),
    ...pender({
      type: DELETE_ORDER,
      onSuccess: (state, action) => state.setIn(['tempOrder', 'form'], Map(action.payload.data)),
    }),
    ...pender({
      type: CREATE_TEMP_ORDER,
      onSuccess: (state, action) => state.setIn(['result'], Map(action.payload.data)),
    }),
  },
  initialState,
);
