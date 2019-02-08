import React, { Component } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProductListActions from '../../redux/modules/productList';
import * as AuthActions from '../../redux/modules/auth';
import * as OrderListActions from '../../redux/modules/orderList';

import Category from './Category';
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
  padding: 0px 0px 0px 10px;
  width: 36vw;
  height: 75vh;
  overflow: hidden;

  .footerContainer {
    padding: 0px 0px 10px 0px;
    width: 100%;
    display: flex;
    // border: solid 1px black;
    position: static;
    bottom: 0;
    height: 10%;
  }
`;

const OrderContainer = styled.div`
  width: 39vw;
  height: 85%;
  background-color: white;
  padding: 10px 0px 0px 10px;
  overflow-y: auto;
`;

const Button = styled.button`
  margin-top: 1rem;
  margin-right: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  border: 2px solid #fe4c8d;
  border-radius: 3px;
  background: white;
  color: #fe4c8d;

  text-align: center;
  font-size: 0.8rem;
  width: 8rem;
  cursor: pointer;
  font-weight: bold;
`;

class Imhome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _clickCategory = (index, _id, itemName) => {
    const { ProductListActions } = this.props;
    ProductListActions.changeCate({
      index,
      _id,
      itemName,
    });
  };

  _order = () => {
    const { orderForm, auth, OrderListActions } = this.props;
    const branchCode = auth.toJS().info.branchCode;
    const data = {
      complete: false,
      branchCode,
      ...orderForm,
    };
    OrderListActions.createOrder(data);
  };

  render() {
    const { form, orderForm } = this.props;
    const { categories, clickedCate } = form.toJS();
    const items = orderForm.items;

    return (
      <ContentWrapper>
        <MainContainer>
          <Category
            categories={categories}
            clickedCate={clickedCate}
            _clickCategory={this._clickCategory}
          />
          {!!categories.length > 0 ? (
            <div className="footerContainer">
              <Button onClick={() => console.log('h')}>메뉴 전체보기</Button>
            </div>
          ) : (
            <div />
          )}
        </MainContainer>
        <OrderContainer>
          <OrderListTable
            headerName="YourOrder"
            orderList={items}
            buttonList={[{ name: '주문저장' }, { name: '주문하기' }]}
            clickComplete={this._order}
          />
        </OrderContainer>
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
    result: state.productList.get('result'),
    orderForm: state.productList.getIn(['productOrder', 'form']),
    auth: state.auth.get('result'),
  }),
  dispatch => ({
    ProductListActions: bindActionCreators(ProductListActions, dispatch),
    AuthActions: bindActionCreators(AuthActions, dispatch),
    OrderListActions: bindActionCreators(OrderListActions, dispatch),
  }),
)(Imhome);
