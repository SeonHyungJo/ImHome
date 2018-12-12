import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as productList from '../../lib/api/productList';
import { Map, List } from 'immutable';

const GET_STORE_LIST = 'productList/GET_STORE_LIST'; // 매장 목록 가져오기 (deprecated)
const GET_COMPANY_LIST = 'productList/GET_COMPANY_LIST'; // 회사 목록 가져오기
const GET_PRODUCTS = 'productList/GET_PRODUCTS'; // 품목 가져오기

export const getStoreList = createAction(GET_STORE_LIST, productList.getStoreList);
export const getCompanyList = createAction(GET_COMPANY_LIST, productList.getCompanyList);
export const getProducts = createAction(GET_PRODUCTS, productList.getProducts);

// 초기값 설정
const initialState = Map({
    productList: Map({
        initialForm: Map({
            _id: '',
            companyName: '',
            companyCode: '',
            productName: '',
            productCode: '',
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
        companys: [],
        lists: []
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
                state.setIn(['productList', 'companys'], action.payload.data)
        }),
        ...pender({
            type: GET_PRODUCTS,
            onSuccess: (state, action) => state.setIn(['productList', 'lists'], action.payload.data)
        })
    },
    initialState
);
