import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List } from 'immutable';
import * as productList from '../../lib/api/productList';

const CHANGE_INPUT = 'productList/CHANGE_INPUT'; // input 값 변경
const INITIALIZE_FORM = 'productList/INITIALIZE_FORM'; // form 초기화
const GET_COMPANY_LIST = 'productList/GET_COMPANY_LIST'; // 회사 목록 가져오기 => deprecated
const CHANGE_CATE = 'productList/CHANGE_CATE'; // 카테고리 변경
const SET_MESSAGE = 'user/SET_MESSAGE';

const GET_PRODUCTS = 'productList/GET_PRODUCTS'; // 품목 가져오기
const GET_PRODUCT_DATA = 'productList/GET_PRODUCT_DATA'; // 품목의 상세 정보 가져오기

const CREATE_ITEM = 'productList/CREATE_ITEM'; // 아이템 생성
const DELETE_ITEM = 'productList/DELETE_ITEM'; // 아이템 삭제
const UPDATE_ITEM = 'productList/UPDATE_ITEM'; // 아이템 삭제

export const changeInput = createAction(CHANGE_INPUT); // {form, name, value}
export const initializeForm = createAction(INITIALIZE_FORM); // form
export const changeCate = createAction(CHANGE_CATE);
export const getCompanyList = createAction(GET_COMPANY_LIST, productList.getCompanyList);
export const setMessage = createAction(SET_MESSAGE); // { form, message }

export const getProducts = createAction(GET_PRODUCTS, productList.getProducts);
export const getProductData = createAction(GET_PRODUCT_DATA, productList.getProductData);

export const createItem = createAction(CREATE_ITEM, productList.createItem);
export const deleteItem = createAction(DELETE_ITEM, productList.deleteItem);
export const updateItem = createAction(UPDATE_ITEM, productList.updateItem);

// 카테고리를 세팅하는 함수
// state값과 payload.data, 삭제여부를 파라미터로 받음
const setClickedCate = (state, data, del) => {
  const products = data;

  // 카테고리 추출 및 삽입
  const categories = products.items.filter(item => item.itemDepth === 0);
  products.categories = categories;

  // 기존 state에 이미 클릭된 데이터를 가져온다.
  const originClickedCate = state.toJS().productList.form.clickedCate;

  // 초기화면이거나 삭제의 경우 맨처음으로 세팅하고 그 외의 경우 유지한다.
  if (originClickedCate.index === undefined || del === true) {
    products.clickedCate = {
      index: 0,
      _id: categories[0]._id,
      itemName: categories[0].itemName,
    };
  } else {
    products.clickedCate = {
      index: originClickedCate.index,
      _id: originClickedCate._id,
      itemName: originClickedCate.itemName,
    };
  }

  return products;
};

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
          parentId: '',
        }),
      ]),
      categories: [],
      clickedCate: {},
      createdAt: '',
      updatedAt: '',
    }),
    message: null,
    error: null,
    lists: [],
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
      const initialForm = initialState.get(action.payload);
      return state.set(action.payload, initialForm);
    },
    [CHANGE_CATE]: (state, action) => {
      const { index, _id, itemName } = action.payload;
      return state.setIn(['productList', 'form', 'clickedCate'], { index, _id, itemName });
    },
    [SET_MESSAGE]: (state, action) => {
      const { form, message } = action.payload;
      return state.setIn([form, 'message'], message);
    },
    ...pender({
      type: GET_COMPANY_LIST,
      onSuccess: (state, action) => state.setIn(['productList', 'companys'], action.payload.data),
    }),
    ...pender({
      type: GET_PRODUCTS,
      onSuccess: (state, action) => state.setIn(['productList', 'lists'], action.payload.data),
    }),
    ...pender({
      type: GET_PRODUCT_DATA,
      onSuccess: (state, action) => state.setIn(
        ['productList', 'form'],
        Map(setClickedCate(state, action.payload.data, false)),
      ),
    }),
    ...pender({
      type: DELETE_ITEM,
      onSuccess: (state, action) => state.setIn(
        ['productList', 'form'],
        Map(setClickedCate(state, action.payload.data, action.payload.del)),
      ),
    }),
    ...pender({
      type: CREATE_ITEM,
      onSuccess: (state, action) => state.setIn(
        ['productList', 'form'],
        Map(setClickedCate(state, action.payload.data, false)),
      ),
    }),
    ...pender({
      type: UPDATE_ITEM,
      onSuccess: (state, action) => state.setIn(
        ['productList', 'form'],
        Map(setClickedCate(state, action.payload.data, false)),
      ),
    }),
  },
  initialState,
);
