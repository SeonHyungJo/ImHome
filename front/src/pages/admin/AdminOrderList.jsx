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

    // 버튼 Setting
    const buttons = [
      { name: '주문저장', event: 'SAVE_ORDER' },
      { name: '배송처리', event: 'DELIVER_OK' },
      { name: '주문서 취소', event: 'CANCLE_ORDER' },
    ];

    this.state = {
      buttons,
      displayAlert: false,
      alertMessage: '출고완료 처리 되었습니다.',
    };
  }

  async componentDidMount() {
    const { OrderListActions } = this.props;

    // 주문내역 브랜치 리스트 가져오기
    await OrderListActions.getStoreList();
    await this.getNavData();
  }

  // 리스트 클릭시 상세 주문내역 가져오기
  getNavData = async (changeId) => {
    try {
      const { OrderListActions, currentId } = this.props;
      if (changeId) OrderListActions.updateCurrentId(changeId);
      // 선택한 지점 주문내역 불러오기
      OrderListActions.getOrderData(changeId || currentId);
    } catch (e) {
      console.log(e);
    }
  };

  // 출고완료처리하기
  setComplete = async () => {
    try {
      const { OrderListActions, currentOrder } = this.props;
      // 선택한 지점 출고처리하기
      const result = await OrderListActions.updateComplete(currentOrder.branchCode);

      if (result.data.success === '0000') {
        // 주문내역 브랜치 리스트 가져오기
        const storeList = await OrderListActions.getStoreList();
        await this.getNavData(storeList.data[0].branchCode);
      }
      this.setState({ displayAlert: true });
    } catch (e) {
      console.log(e);
    }
  };

  completeRelease = () => {
    this.setState({ displayAlert: false });
  };

  render() {
    const { store, currentOrder, currentId } = this.props;
    return (
      <PageTemplate navData={store} id={currentId} clickNav={this.getNavData}>
        <header>
          주문일자 :
          {CommonUtil.setHangleDateTime(
            currentOrder.updatedAt === undefined ? new Date() : currentOrder.updatedAt,
          )}
        </header>
        <AlertPopup
          title={this.state.alertMessage}
          buttonName="확인"
          displayAlertPop={this.state.displayAlert}
          clickEvent={this.completeRelease}
        />
        <OrderListTable
          headerName={currentOrder.branchName}
          orderList={currentOrder.items}
          buttonList={this.state.buttons}
          clickComplete={this.setComplete}
        />
        <SpecificationTable
          branchName={`${this.state.storeId} 주문내역`}
          orderList={this.state.orders}
          buttonList={this.state.buttons}
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
