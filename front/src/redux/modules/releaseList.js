import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as releaseAPI from '../../lib/api/releaseList';
import { Map, List } from 'immutable';

const GET_STORE_LIST = 'release/GET_STORE_LIST'; // 매장 목록 가져오기
const GET_ORDER_LIST = 'release/GET_ORDER_LIST'; // 해당 매장의 전체 주문 목록 가져오기
const GET_ORDER_DATA = 'release/GET_ORDER_DATA'; // 해당 매장의 주문 상세 정보 가져오기
const DELETE_ORDER_DATA = 'release/DELETE_ORDER_DATA';

export const getStoreList = createAction(GET_STORE_LIST, releaseAPI.getStoreList);
export const getOrderList = createAction(GET_ORDER_LIST, releaseAPI.getOrderList);
export const getOrderData = createAction(GET_ORDER_DATA, releaseAPI.getOrderData);
export const deleteOrderData = createAction(DELETE_ORDER_DATA, releaseAPI.deleteOrderData);

// 초기값 설정
const initialState = Map({
    releaseList: Map({
        init: Map({
            _id: '',
            branchCode: '',
            branchName: '',
            name: '',
            id: '',
            cName: '',
            bNumber: '',
            bAddress: '',
            email: '',
            pNumber: ''
        }),
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
            pNumber: ''
        }),
        error: null,
        store: [],
        list: List([
            Map({
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
            })
        ])
    }),
    result: Map({})
});

export default handleActions(
    {
        ...pender({
            type: GET_STORE_LIST,
            onSuccess: (state, action) => {
                return state.setIn(['releaseList', 'store'], action.payload.data);
            }
        }),
        ...pender({
            type: GET_ORDER_LIST,
            onSuccess: (state, action) => state.setIn(['releaseList', 'list'], action.payload.data)
        }),
        ...pender({
            type: GET_ORDER_DATA,
            onSuccess: (state, action) =>
                state.setIn(['releaseList', 'form'], Map(action.payload.data))
        }),
        ...pender({
            type: DELETE_ORDER_DATA,
            onSuccess: (state, action) => state.set('result', Map(action.payload.data))
        })
    },
    initialState
);
