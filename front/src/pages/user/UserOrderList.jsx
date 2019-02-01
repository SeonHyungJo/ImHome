import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PageTemplate } from '../../component/template';
import { OrderListTable } from '../../component/orderList';
import { SpecificationTable } from '../../component/specificationTable';
import { AlertPopup } from '../../component/common';

import * as OrderListActions from '../../redux/modules/orderList';
import * as CommonUtil from '../../util/commonUtil';

class AdminOrderList extends Component {
  constructor(props) {
    super(props);

    const leftNavList = [
      {
        branchCode: '001',
        branchName: '아임홈',
      },
    ];

    this.state = {
      store: leftNavList,
      currentId: '001',
    };
  }

  async componentDidMount() {
    await this.getNavData();
  }

  // 리스트 클릭시 상세 주문내역 가져오기
  getNavData = async () => {
    try {
      const { OrderListActions } = this.props;

      OrderListActions.getOrderData();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { store, currentId } = this.state;
    const { currentOrder } = this.props;

    console.log(currentOrder);
    const orderListProps = {
      headerName: 'Your Order',
      orderList: currentOrder && currentOrder.items ? currentOrder.items : '',
    };

    console.log(orderListProps);

    return (
      <PageTemplate role="user" navData={store} id={currentId} clickNav={this.getNavData}>
        <OrderListTable {...orderListProps} />
      </PageTemplate>
    );
  }
}

export default connect(
  state => ({
    currentOrder: state.orderList.getIn(['orderList', 'currentOrder']),
    list: state.orderList.getIn(['orderList', 'list']),
    currentId: state.orderList.getIn(['orderList', 'currentId']),
    store: state.orderList.getIn(['orderList', 'store']),
    error: state.orderList.getIn(['orderList', 'error']),
    result: state.orderList.get('result'),
  }),
  dispatch => ({
    OrderListActions: bindActionCreators(OrderListActions, dispatch),
  }),
)(AdminOrderList);
