import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as productList from '../../lib/api/productList';
import { Map, List } from 'immutable';

const CHANGE_INPUT = 'productList/CHANGE_INPUT'; //input 값 변경
const INITIALIZE_FORM = 'productList/INITIALIZE_FORM'; //form 초기화
const GET_COMPANY_LIST = 'productList/GET_COMPANY_LIST'; // 회사 목록 가져오기
const GET_PRODUCTS = 'productList/GET_PRODUCTS'; // 품목 가져오기
const GET_PRODUCT_DATA = 'productList/GET_PRODUCT_DATA'; // 품목의 상세 정보 가져오기
const CREATE_CATEGORY = 'productList/CREATE_CATEGORY';

export const changeInput = createAction(CHANGE_INPUT); // {form, name, value}
export const initializeForm = createAction(INITIALIZE_FORM); // form

export const getCompanyList = createAction(GET_COMPANY_LIST, productList.getCompanyList);
export const getProducts = createAction(GET_PRODUCTS, productList.getProducts);
export const getProductData = createAction(GET_PRODUCT_DATA, productList.getProductData);
export const createCategory = createAction(CREATE_CATEGORY, productList.createCategory);

// 초기값 설정
const initialState = Map({
    productList: Map({
        form: Map({
            _id: '',
            companyName: '',
            companyCode: '',
            items: List([
                Map({
                    itemName: '',
                    itemCount: '',
                    itemCost: '',
                    itemVolume: '',
                    itemDepth: '',
                    parentId: ''
                })
            ]),
            createdAt: '',
            updatedAt: ''
        }),
        error: null,
        lists: []
    }),
    result: Map({})
});

export default handleActions(
    {
        [CHANGE_INPUT]: (state, action) => {
            const { form, name, value, targetForm } = action.payload;
            return state.setIn([form, targetForm ? targetForm : 'form', name], value);
        },
        [INITIALIZE_FORM]: (state, action) => {
            const initialForm = initialState.get(action.payload);
            return state.set(action.payload, initialForm);
        },
        ...pender({
            type: GET_COMPANY_LIST,
            onSuccess: (state, action) =>
                state.setIn(['productList', 'companys'], action.payload.data)
        }),
        ...pender({
            type: GET_PRODUCTS,
            onSuccess: (state, action) => state.setIn(['productList', 'lists'], action.payload.data)
        }),
        ...pender({
            type: GET_PRODUCT_DATA,
            onSuccess: (state, action) =>
                state.setIn(['productList', 'form'], Map(action.payload.data))
        }),
        ...pender({
            type: CREATE_CATEGORY,
            onSuccess: (state, action) =>
                state.setIn(['productList', 'form'], Map(action.payload.data))
        })
    },
    initialState
);
