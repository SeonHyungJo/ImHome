import React, { Component } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PageTemplate } from '../../component/template';
import { AlertPopup } from '../../component/common';
import { Category, ProductTable } from '../../component/orderProduct';
import { OrderListTable } from '../../component/orderList';

import * as ProductListActions from '../../redux/modules/productList';
import * as TempOrderActions from '../../redux/modules/tempOrder';
import * as OrderListActions from '../../redux/modules/orderList';

const Header = styled.div`
  color: black;
  padding: 10px 10px 0px 10px;
  margin: 10px 0px 0px 10px;
  font-size: 1.5rem;
  font-weight: 800;
`;

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

// 주문서에 들어가는 button list
const buttonList_imhome = [
  { name: '주문저장', event: 'TEMP_ORDER' },
  { name: '바로주문하기', event: 'CREATE_ORDER' },
];

const buttonList_default = [{ name: '주문저장', event: 'TEMP_ORDER' }];

class UserProduct extends Component {
  constructor() {
    super();

    this.state = {
      companyCode: '001', // 좌측 nav product 초기값
      displayAlertPop: false, // 알림 팝업
    };
  }

  async componentDidMount() {
    const { ProductListActions } = this.props;
    const { companyCode } = this.state;

    await ProductListActions.getProducts(); // 프로덕트 리스트 모두 가져오기
    await this.getNavData(companyCode);
  }

  /*
    getNavData: 프로덕트 데이터 가져오기
    params:
      companyCode : product의 고유코드
  */
  getNavData = async (companyCode) => {
    const { ProductListActions } = this.props;
    this.setState({ companyCode });

    try {
      await ProductListActions.getProductData(companyCode);
      await this.getTempOrder(companyCode);
    } catch (e) {
      console.error(e);
    }

    // setstate
  };

  /*
    getTempOrder: 임시 주문 저장 가져오기
  */
  getTempOrder = async (companyCode) => {
    const { TempOrderActions } = this.props;

    /*
      2019. 2. 26 Jinseong
      branchCode -> server decoded로 변경

      console.log(auth.toJS());
      const branchCode = auth.toJS().info.branchCode;
      const branchCode = '002';
    */
    /*
      2019. 3. 5 Jinseong
      tempOrder의 데이터가 branchCode 기준이었다면
      branchCode와 companyCode가 필요하게 바뀜.
    */

    try {
      await TempOrderActions.getOrderData(companyCode);
      await this.setItemCount();
    } catch (e) {
      console.error(e);
    }
  };

  /*
    setItemCount: 임시 주문을 가져온 뒤 itemCount 만들기
  */
  setItemCount = async () => {
    const { currentOrder, TempOrderActions } = this.props;
    const reducer = (acc, cur) => {
      acc[cur._id] = Number(cur.itemCount);
      return acc;
    };

    const count = Object.keys(currentOrder.toJS()).length !== 0
      ? currentOrder.toJS().items.reduce(reducer, {})
      : {};
    try {
      TempOrderActions.changeTempCount(count);
    } catch (e) {
      console.error(e);
    }
  };

  /*
    _closeAlertPop: 알림 팝업을 닫는 메서드
  */
  _closeAlertPop = () => this.setState({ displayAlertPop: false });

  /*
    setMessage: 알림 팝업에 들어가는 메세지 set
  */
  setMessage = (message) => {
    const { ProductListActions } = this.props;
    ProductListActions.setMessage({
      form: 'productList',
      message,
    });
    return false;
  };

  /*
    _clickCategory: 카테고리 클릭 시 실행되는 메서드
    params:
      _id : 클릭한 카테고리의 id
  */
  _clickCategory = (_id) => {
    const { ProductListActions } = this.props;
    const categories = this.props.clickedCategories.toJS();
    const modifiedCate = !categories.includes(_id)
      ? categories.concat(_id)
      : categories.filter(val => val !== _id);

    ProductListActions.changeCategories(modifiedCate);
  };

  /*
    _orderFunc: 주문서의 버튼을 눌렀을 때 발생하는 메서드
    params:
      eventName : 클릭한 버튼의 eventName (TEMP_ORDER, CREATE_ORDER)
  */
  _orderFunc = (eventName) => {
    const { tempOrder, TempOrderActions, OrderListActions } = this.props;
    const { companyCode } = this.state;

    // 알림창을 세팅하는 메서드
    const setAlert = (message) => {
      this.setMessage(message);
      this.setState({ displayAlertPop: true });
    };
    /*
      2019. 2. 26 Jinseong
      branchCode -> server decoded로 변경

      const branchCode = auth.toJS().info.branchCode;
      const branchCode = '002';
    */
    const data = {
      companyCode,
      complete: false,
      ...tempOrder.toJS(),
    };

    // 주문 완료 후의 임시 주문 삭제를 위해 id를 저장한다.
    // 실제 주문시 tempOrder의 id는 필요하지 않으므로 data에서 제거한다.
    const tempOrderid = data._id;
    delete data._id;

    try {
      eventName === 'TEMP_ORDER'
        ? TempOrderActions.createTempOrder(data).then(() => {
          setAlert('주문저장 되었습니다');
          TempOrderActions.getOrderData();
        })
        : OrderListActions.createOrder(data).then((result) => {
          if (result.data.fail === '3015') {
            setAlert('출고처리되지 않은 주문이 있습니다.');
          } else if (result.data.success === '0000') {
            // 임시 주문 삭제
            TempOrderActions.deleteTempOrder(tempOrderid).then((result) => {
              if (result.data.fail === '3016') {
                setAlert('주문 되었습니다. (임시주문 미삭제)');
              } else if (result.data.success === '0000') {
                setAlert('주문 되었습니다.');
                TempOrderActions.initializeForm();
              }
            });
          }
        });
    } catch (e) {
      console.error(e);
      setAlert('실패하였습니다. 관리자에게 문의해주세요. f_order');
      this.setState({ displayAlertPop: true });
    }
  };

  /*
    _changeCount: item의 갯수를 변경하는 메서드
    params:
      type : 클릭한 버튼의 타입(plus, minus)
      item : + 혹은 -를 클릭한 item
  */
  _changeCount = (type, item) => {
    const { tempOrder, TempOrderActions } = this.props;

    // itemCount {id: 주문할 갯수}
    // items {id: 실제 item 정보}
    const itemCount = this.props.itemCount.toJS();
    let items = tempOrder.toJS().items === undefined ? [] : tempOrder.toJS().items;

    // itemCount을 변경하는 로직, 경우의 수는 순서대로 총 5가지다.
    // 1) 0 => 1
    // 2) 1 => 2
    // 3) 2 => 1
    // 4) 1 => 0
    // 5) 0 => 0 은 아무일도 일어나지 않는다.
    type === 'plus'
      ? !itemCount.hasOwnProperty(item._id)
        ? (itemCount[item._id] = 1) // 1)
        : (itemCount[item._id] = itemCount[item._id] + 1) // 2)
      : itemCount.hasOwnProperty(item._id) && itemCount[item._id] !== 1
        ? (itemCount[item._id] = itemCount[item._id] - 1) // 3)
        : delete itemCount[item._id]; // 4)

    item = {
      ...item,
      itemCount: `${itemCount[item._id]}`,
    };

    // item을 변경하는 로직, 경우의 수는 총 4가지다.
    // 1) 0 => 1
    // 2) 1 => 2
    // 3) 2 => 1
    // 4) 1 => 0
    type === 'plus'
      ? itemCount[item._id] < 2
        ? items.push(item) // 1)
        : items.forEach((i) => {
          if (i._id === item._id) i.itemCount = itemCount[item._id]; // 2)
        })
      : !itemCount.hasOwnProperty(item._id)
        ? (items = items.filter(i => item._id !== i._id)) // 3)
        : items.forEach((i) => {
          if (i._id === item._id) i.itemCount = itemCount[item._id]; // 4)
        });

    TempOrderActions.changeTempCount(itemCount);
    TempOrderActions.changeTempItem(items);
  };

  render() {
    const {
      lists, form, message, tempOrder, clickedCategories, itemCount,
    } = this.props;
    // const {companyCode} = this.state;
    const role = 'user';
    const { categories, companyCode, items } = form.toJS();
    const tempOrderItems = tempOrder.toJS().items;
    const itemCounts = itemCount.toJS();
    const tempOrderKeys = Object.keys(itemCounts);

    return (
      <PageTemplate
        role={role}
        navData={lists}
        id={this.state.companyCode}
        clickNav={this.getNavData}
      >
        <Header>{`${form.toJS().companyName} Order`}</Header>
        <ContentWrapper>
          <MainContainer>
            {companyCode === '001' ? (
              <Category
                categories={categories}
                clickedCate={clickedCategories}
                _clickCategory={this._clickCategory}
                itemCount={itemCounts}
                tempOrderKeys={tempOrderKeys}
                items={items}
                _changeCount={this._changeCount}
              />
            ) : (
              <ProductTable
                itemCount={itemCounts}
                tempOrderKeys={tempOrderKeys}
                detailItem={items}
                _changeCount={this._changeCount}
              />
            )}
          </MainContainer>
          <OrderContainer>
            <OrderListTable
              headerName="YourOrder"
              orderList={tempOrderItems}
              buttonList={companyCode === '001' ? buttonList_imhome : buttonList_default}
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
      </PageTemplate>
    );
  }
}

export default connect(
  state => ({
    form: state.productList.getIn(['productList', 'form']),
    lists: state.productList.getIn(['productList', 'lists']),
    clickedCategories: state.productList.getIn(['productList', 'clickedCategories']),
    message: state.productList.getIn(['productList', 'message']),
    orderResult: state.orderList.get('result'),
    currentOrder: state.tempOrder.getIn(['tempOrder', 'currentOrder']),
    tempOrder: state.tempOrder.getIn(['tempOrder', 'currentOrder']),
    itemCount: state.tempOrder.getIn(['tempOrder', 'itemCount']),
    tempResult: state.tempOrder.get('result'),
  }),
  dispatch => ({
    ProductListActions: bindActionCreators(ProductListActions, dispatch),
    TempOrderActions: bindActionCreators(TempOrderActions, dispatch),
    OrderListActions: bindActionCreators(OrderListActions, dispatch),
  }),
)(UserProduct);
