import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PageTemplate } from '../../component/template';
import { OrderListTable } from '../../component/orderList';
import { AlertPopup } from '../../component/common';

import * as OrderListActions from '../../redux/modules/orderList';

const buttonList = [{ name: '주문취소', event: 'DELETE_ORDER' }];

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
      displayAlertPop: false,
    };
  }

  _closeAlertPop = () => this.setState({ displayAlertPop: false });

  setMessage = (message) => {
    const { OrderListActions } = this.props;
    OrderListActions.setMessage({
      form: 'productList',
      message,
    });
    return false;
  };

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

  _deleteOrder = () => {
    const { currentOrder, OrderListActions } = this.props;
    const orderId = currentOrder !== undefined ? currentOrder._id : '';
    if (orderId !== '') {
      try {
        OrderListActions.deleteOrderData(orderId).then((result) => {
          if (result.data.fail === '3004') {
            this.setMessage('주문이 취소되지 않았습니다.');
            this.setState({ displayAlertPop: true });
          } else if (result.data.success === '0000') {
            this.setMessage('주문이 취소되었습니다.');
            this.setState({ displayAlertPop: true });
            OrderListActions.initializeForm();
          }
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      this.setMessage('현재 주문이 없습니다.');
      this.setState({ displayAlertPop: true });
    }
  };

  render() {
    const { store, currentId } = this.state;
    const { currentOrder, message } = this.props;
    const orderListProps = {
      headerName: 'Your Order',
      orderList: currentOrder && currentOrder.items ? currentOrder.items : '',
      buttonList,
      clickComplete: this._deleteOrder,
    };
    const role = 'user';

    return (
      <>
        <PageTemplate role={role} navData={store} id={currentId} clickNav={this.getNavData}>
          <OrderListTable {...orderListProps} />
          {/* <FormBtn>주문취소</FormBtn> */}
        </PageTemplate>
        <AlertPopup
          title={message}
          clickEvent={this._closeAlertPop}
          buttonName="확인"
          displayAlertPop={this.state.displayAlertPop}
        />
      </>
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
    message: state.orderList.getIn(['orderList', 'message']),
  }),
  dispatch => ({
    OrderListActions: bindActionCreators(OrderListActions, dispatch),
  }),
)(AdminOrderList);
