import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as productList from '../../lib/api/productList';
import { Map, List } from 'immutable';

const GET_STORE_LIST = 'productList/GET_STORE_LIST'; // 매장 목록 가져오기
const GET_COMPANY_LIST = 'productList/GET_COMPANY_LIST'; // 매장 목록 가져오기
// const GET_ORDER_DATA = 'orderList/GET_ORDER_DATA'; //해당 회원의 상세 정보 가져오기
// const UPDATE_ORDER_COMPLETE = 'orderList/UPDATE_ORDER_COMPLETE'; //해당 회원의 상세 정보 가져오기

export const getStoreList = createAction(GET_STORE_LIST, productList.getStoreList);
export const getCompanyList = createAction(GET_COMPANY_LIST, productList.getCompanyList);

// 초기값 설정
const initialState = Map({
    productList: Map({
        initialForm: Map({
            _id: '',
            companyName: '',
            companyCode: '',
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
            createdAt: '',
            updatedAt: ''
        }),
        error: null,
        store: [],
        company: [],
        list: []
    }),
    result: Map({})
});

export default handleActions(
    {
        ...pender({
            type: GET_STORE_LIST,
            onSuccess: (state, action) => state.setIn(['productList', 'store'], action.payload.data)
        }),
        ...pender({
            type: GET_COMPANY_LIST,
            onSuccess: (state, action) =>
                state.setIn(['productList', 'company'], action.payload.data)
        })
    },
    initialState
);
