import React, { Component } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProductListActions from '../../redux/modules/productList';
import * as AuthActions from '../../redux/modules/auth';
import * as OrderListActions from '../../redux/modules/orderList';
import * as TempOrderActions from '../../redux/modules/tempOrder';
import { AlertPopup } from '../common';

import Category from './Category';
import ProductTable from './ProductTable';
import { OrderListTable } from '../orderList';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 75vw;
  height: 75vh;
  background-color: white;
  padding: 10px;
`;

const MainContainer = styled.div`
  padding: 10px 10px 10px 10px;
  width: 36vw;
  height: 75vh;
  overflow: auto;
`;

const OrderContainer = styled.div`
  width: 39vw;
  height: 100%;
  background-color: white;
  padding: 10px 0px 0px 10px;
  overflow-y: hidden;
`;

const buttonList = [
  { name: '주문저장', event: 'TEMP_ORDER' },
  { name: '바로주문하기', event: 'CREATE_ORDER' },
];

class Imhome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAlertPop: false,
    };
  }

  _closeAlertPop = () => this.setState({ displayAlertPop: false });

  setMessage = (message) => {
    const { ProductListActions } = this.props;
    ProductListActions.setMessage({
      form: 'productList',
      message,
    });
    return false;
  };

  _clickCategory = (index, _id, itemName) => {
    const { ProductListActions } = this.props;
    ProductListActions.changeCate({
      index,
      _id,
      itemName,
    });
  };

  _orderFunc = (eventName) => {
    const {
      tempOrder, TempOrderActions, OrderListActions,
    } = this.props;
    // const branchCode = auth.toJS().info.branchCode;
    // const branchCode = '002';
    let data = {
      complete: false,
      ...tempOrder.toJS(),
    };
    
    // 주문 완료 후 임시 주문 삭제를 위해 id를 저장한다.
    // 실제 주문시 tempOrdre의 id는 필요하지 않으므로 data에서 제거
    const tempOrderid = data._id;
    delete data['_id'];
    
    try {
      eventName === 'TEMP_ORDER'
        ? TempOrderActions.createTempOrder(data).then((result) => {
          this.setMessage('주문저장 되었습니다');
          this.setState({ displayAlertPop: true });
          TempOrderActions.getOrderData();
        })
        : OrderListActions.createOrder(data).then((result) => {
          // console.log(data)
          if (result.data.fail === '3015') {
            this.setMessage('출고처리되지 않은 주문이 있습니다.');
            this.setState({ displayAlertPop: true });
          } else if (result.data.success === '0000') {
            
            // 임시 주문 삭제
            TempOrderActions.deleteTempOrder(tempOrderid).then(result => {
              if (result.data.fail === '3016') {
                this.setMessage('주문 되었습니다. (임시주문 미삭제)');
                this.setState({ displayAlertPop: true });
              } else if (result.data.success === '0000') {
                this.setMessage('주문 되었습니다.');
                this.setState({ displayAlertPop: true });
                TempOrderActions.initializeForm()
              }
            })
          }
        });
    } catch (e) {
      console.log(e);
      this.setMessage('실패하였습니다. 관리자에게 문의해주세요. f_order');
      this.setState({ displayAlertPop: true });
    }
  };

  render() {
    const { form, message, tempOrder } = this.props;
    const { categories, clickedCate, companyCode } = form.toJS();
    const items = tempOrder.toJS().items;

    return (
      <ContentWrapper>
        <MainContainer>
          {companyCode === '001' ? (
            <Category
              categories={categories}
              clickedCate={clickedCate}
              _clickCategory={this._clickCategory}
            />
          ) : (
            <ProductTable />
          )}
        </MainContainer>
        <OrderContainer>
          <OrderListTable
            headerName="YourOrder"
            orderList={items}
            buttonList={buttonList}
            clickComplete={this._orderFunc}
            style={{ height: '96%' }}
          />
        </OrderContainer>
        <AlertPopup
          title={message}
          clickEvent={this._closeAlertPop}
          buttonName="확인"
          displayAlertPop={this.state.displayAlertPop}
        />
      </ContentWrapper>
    );
  }
}

export default connect(
  state => ({
    form: state.productList.getIn(['productList', 'form']),
    lists: state.productList.getIn(['productList', 'lists']),
    message: state.productList.getIn(['productList', 'message']),
    error: state.productList.getIn(['productList', 'error']),
    tempResult: state.tempOrder.get('result'),
    orderResult: state.orderList.get('result'),
    orderForm: state.productList.getIn(['productOrder', 'form']),
    tempOrder: state.tempOrder.getIn(['tempOrder', 'currentOrder']),
    auth: state.auth.get('result'),
  }),
  dispatch => ({
    ProductListActions: bindActionCreators(ProductListActions, dispatch),
    AuthActions: bindActionCreators(AuthActions, dispatch),
    OrderListActions: bindActionCreators(OrderListActions, dispatch),
    TempOrderActions: bindActionCreators(TempOrderActions, dispatch),
  }),
)(Imhome);
