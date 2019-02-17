import React, { Component } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProductListActions from '../../redux/modules/productList';
import * as AuthActions from '../../redux/modules/auth';
import * as OrderListActions from '../../redux/modules/orderList';
import * as TempOrderActions from '../../redux/modules/tempOrder';

import Category from './Category';
import ProductTable from './ProductTable';
import { OrderListTable } from '../orderList';
import { FormBtn } from '../common';

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
  overflow: auto;
`;

const OrderContainer = styled.div`
  width: 39vw;
  height: 100%;
  background-color: white;
  padding: 10px 0px 0px 10px;
  overflow-y: hidden;
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

  _tempOrder = () => {
    const { orderForm, auth, TempOrderActions } = this.props;
    const branchCode = auth.toJS().info.branchCode;
    const data = {
      complete: false,
      branchCode,
      ...orderForm,
    };
    TempOrderActions.createTempOrder(data);
  };

  render() {
    const { form, orderForm } = this.props;
    const { categories, clickedCate, companyCode } = form.toJS();
    const items = orderForm.items;

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
            buttonList={[{ name: '주문저장' }, { name: '바로주문하기' }]}
            clickComplete={this._tempOrder}
            style={{ height: '100%' }}
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
    TempOrderActions: bindActionCreators(TempOrderActions, dispatch),
  }),
)(Imhome);
