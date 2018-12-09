import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as orderListAPI from '../../lib/api/orderList';
import { Map, List } from 'immutable';

const GET_STORE_LIST = 'orderList/GET_STORE_LIST'; // 매장 목록 가져오기
const GET_ORDER_DATA = 'orderList/GET_ORDER_DATA'; //해당 회원의 상세 정보 가져오기
const UPDATE_ORDER_COMPLETE = 'orderList/UPDATE_ORDER_COMPLETE'; //해당 회원의 상세 정보 가져오기

export const getStoreList = createAction(GET_STORE_LIST, orderListAPI.getStoreList);
export const getOrderData = createAction(GET_ORDER_DATA, orderListAPI.getOrderData);

export const updateComplete = createAction(UPDATE_ORDER_COMPLETE, orderListAPI.updateComplete);

// 초기값 설정
const initialState = Map({
    orderList: Map({
        initialForm: Map({
            _id: '',
            branchCode: '',
            branchName: '',
            items: '',
            updateAt: ''
        }),
        currentOrder: Map({
            _id: '',
            branchCode: '',
            branchName: '',
            items: List([
                Map({
                    itemCode: '',
                    itemName: '',
                    itemCount: '',
                    itemCost: '',
                    itemVolume: '',
                    itemDepth: ''
                })
            ]),
            updateAt: ''
        }),
        error: null,
        store: [],
        list: []
    }),
    result: Map({})
});

export default handleActions(
    {
        ...pender({
            type: GET_STORE_LIST,
            onSuccess: (state, action) => state.setIn(['orderList', 'store'], action.payload.data)
        }),
        ...pender({
            type: GET_ORDER_DATA,
            onSuccess: (state, action) =>
                state.setIn(['orderList', 'currentOrder'], action.payload.data[0])
        }),
        ...pender({
            type: UPDATE_ORDER_COMPLETE,
            onSuccess: (state, action) =>
                state.setIn(['orderList', 'form'], Map(action.payload.data))
        })
    },
    initialState
);
