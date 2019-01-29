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
  constructor() {
    super();
  }

  async componentDidMount() {}

  render() {
    const { store, currentOrder, currentId } = this.props;
    return (
      <PageTemplate role="user" navData={store} id={currentId} clickNav={this.getNavData}>
        <OrderListTable
          headerName="Your Order"
          orderList={currentOrder.items}
          clickComplete={this.setComplete}
        />
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
