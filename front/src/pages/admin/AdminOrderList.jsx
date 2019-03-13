import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PageTemplate } from '../../component/template';
import { OrderListTable } from '../../component/orderList';
import { SpecificationTable } from '../../component/specificationTable';
import { AlertPopup } from '../../component/common';

import * as OrderListActions from '../../redux/modules/orderList';
import * as CommonUtil from '../../util/commonUtil';

class AdminOrderList extends PureComponent {
  constructor() {
    super();

    const buttons = [
      { name: '배송처리', event: 'DELIVER_OK' },
      { name: '주문서 취소', event: 'CANCLE_ORDER' },
    ];

    const specificationBtns = [
      { name: '명세표 저장', event: 'SAVE_SPECIFICATION' },
      { name: '명세표 출력', event: 'PRINT_SPECIFICATION' },
    ];

    this.state = {
      buttons,
      specificationBtns,
      deliveryAlert: false,
      cancelAlert: false,
      specificationItems: [],
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
      const setId = changeId || currentId;

      this.setState(prevState => ({
        ...prevState,
        specificationItems: [],
      }));
      await OrderListActions.updateCurrentId(setId);
      await OrderListActions.getOrderData(setId);
    } catch (e) {
      console.error(e);
    }
  };

  // 배송처리
  setComplete = async (eventName) => {
    try {
      const { OrderListActions, currentOrder } = this.props;

      // 배송처리 && 주문서 취소
      eventName === 'DELIVER_OK'
        ? this.state.specificationItems.length > 0
          && OrderListActions.updateComplete(
            currentOrder.branchCode,
            this.state.specificationItems,
          ).then((result) => {
            if (result.data.success === '0000') {
              this.setStoreList();
              this.setPopup('deliveryAlert', true);
              this.setState(prevState => ({
                specificationItems: [],
              }));
            }
          })
        : OrderListActions.deleteOrderData(currentOrder._id).then((result) => {
          if (result.data.success === '0000') {
            this.setStoreList();
            this.setPopup('cancelAlert', true);
            this.setState(prevState => ({
              specificationItems: [],
            }));
          }
        });
    } catch (e) {
      console.error(e);
    }
  };

  // 명세표 저장
  saveSpecify = () => {
    try {
      const { OrderListActions, currentOrder } = this.props;
      const now = new Date();
      const requestData = {
        date: CommonUtil.setHangleDate(now),
        branchName: currentOrder.branchName,
        specificationItems: this.state.specificationItems,
      };

      OrderListActions.saveSpecify(
        requestData,
        `${currentOrder.branchName}_${now.getDate()}월_거래명세표`,
      );
    } catch (e) {
      console.error(e);
    }
  };

  // 브랜치 리스트 & 세부항목 초기화
  setStoreList = async () => {
    const { OrderListActions } = this.props;

    OrderListActions.getStoreList().then(
      result => result.data[0] && result.data[0].branchCode && this.getNavData(result.data[0].branchCode),
    );
  };

  setPopup = (alertName, setBoolean) => {
    this.setState({ [alertName]: setBoolean });
  };

  // 거래명세표 추가
  addReleaseList = (payload) => {
    const { OrderListActions, currentOrder } = this.props;
    const newItems = currentOrder.items;
    let currentId = -1;

    for (let i = 0; i < newItems.length; i++) {
      if (newItems[i]._id === payload._id) {
        currentId = i;
      }
    }

    currentId !== -1 && newItems.splice(currentId, 1) && OrderListActions.removeItemList(newItems);

    this.setState(prevState => ({
      specificationItems: [...prevState.specificationItems, payload],
    }));
  };

  // 거래명세표 삭제(미구현)
  delReleaseList = (payload) => {
    const { OrderListActions, currentOrder } = this.props;
    const newItems = currentOrder.items;
    let currentId = -1;

    for (let i = 0; i < newItems.length; i++) {
      if (newItems[i]._id === payload._id) {
        currentId = i;
      }
    }

    currentId !== -1 && newItems.splice(currentId, 1) && OrderListActions.removeItemList(newItems);

    this.setState(prevState => ({
      specificationItems: [...prevState.specificationItems, payload],
    }));
  };

  render() {
    const { store, currentOrder = '', currentId } = this.props;
    const {
      deliveryAlert,
      cancelAlert,
      buttons,
      storeId,
      specificationBtns,
      specificationItems,
    } = this.state;

    const updateAt = currentOrder.updatedAt || new Date();
    const role = 'admin';

    return (
      <>
        <AlertPopup
          title="출고완료 처리 되었습니다."
          buttonName="확인"
          displayAlertPop={deliveryAlert}
          clickEvent={() => this.setPopup('deliveryAlert', false)}
        />
        <AlertPopup
          title="주문서 취소 되었습니다."
          buttonName="확인"
          displayAlertPop={cancelAlert}
          clickEvent={() => this.setPopup('cancelAlert', false)}
        />
        <PageTemplate role={role} navData={store} id={currentId} clickNav={this.getNavData}>
          <header>{`주문일자 :${CommonUtil.setHangleDateTime(updateAt)}`}</header>
          <OrderListTable
            headerName={currentOrder.branchName}
            orderList={currentOrder.items}
            buttonList={buttons}
            clickComplete={this.setComplete}
            addReleaseList={this.addReleaseList}
          />
          <SpecificationTable
            headerName={currentOrder.branchName}
            tradeDate={CommonUtil.setHangleDate(updateAt)}
            branchName={`${storeId} 주문내역`}
            orderList={specificationItems}
            buttonList={specificationBtns}
            saveSpecify={this.saveSpecify}
          />
        </PageTemplate>
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
  }),
  dispatch => ({
    OrderListActions: bindActionCreators(OrderListActions, dispatch),
  }),
)(AdminOrderList);
