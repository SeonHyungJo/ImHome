import { createAction, handleActions } from 'redux-actions'
import { pender } from 'redux-pender'
import * as navAPI from '../../lib/api/nav'
import { Map } from 'immutable'

const CHANGE_CURRENT_NAV = 'nav/CHANGE_CURRENT_NAV' // NAV 클릭시 변경

const GET_PRODUCT_LIST = 'nav/GET_PRODUCT_LIST' // 품목 리스트 가져오기
const GET_ORDER_LIST = 'nav/GET_ORDER_LIST' // 주문내역 가져오기
const GET_ALL_LIST = 'nav/GET_ALL_LIST' // 출고내역 및 회원 정보관련 NAV가져오기

export const changeCurrentNav = createAction(CHANGE_CURRENT_NAV) // {form, name, value}

export const getProductList = createAction(GET_PRODUCT_LIST, navAPI.getProductNav)
export const getOrderList = createAction(GET_ORDER_LIST, navAPI.getOrdertNav)
export const getAllList = createAction(GET_ALL_LIST, navAPI.getAllNav)

// 초기값 설정
const initialState = Map({
  currentNav: '',
  navList: [],
  result: Map({})
})

// reducer
export default handleActions(
  {
    [CHANGE_CURRENT_NAV]: (state, action) => {
      const { currentNav } = action.payload
      return state.set('currentNav', currentNav)
    },
    ...pender({
      type: GET_PRODUCT_LIST,
      onSuccess: (state, action) => {
        console.log('Get Product List')
        return state.set('navList', action.payload.data)
      }
    }),
    ...pender({
      type: GET_ORDER_LIST,
      onSuccess: (state, action) => {
        console.log('Get Order List')
        return state.set('navList', action.payload.data)
      }
    }),
    ...pender({
      type: GET_ALL_LIST,
      onSuccess: (state, action) => {
        console.log('Get All List')
        return state
          .set('navList', action.payload.data)
          .set('currentNav', action.payload.data[0].branchCode)
      }
    })
  },
  initialState
)
