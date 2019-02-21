import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PageTemplate } from '../../component/template';
import { OrderProduct } from '../../component/orderProduct';
import * as ProductListActions from '../../redux/modules/productList';
import * as TempOrderActions from '../../redux/modules/tempOrder';

class UserProduct extends Component {
  constructor() {
    super();

    this.state = {
      productCode: '001',
    };
  }

  async componentDidMount() {
    const { ProductListActions } = this.props;

    await ProductListActions.getProducts();
    await this.getProductList();
    await this.getTempOrder();
    await this.setItemCount();
  }

  getProductList = async () => {
    const { ProductListActions, lists } = this.props;
    try {
      if (lists) {
        await ProductListActions.getProductData('001');
        this.setState({ productCode: '001' });
      }
    } catch (e) {
      console.log(e);
    }
  };

  getNavData = async (id) => {
    const { ProductListActions } = this.props;

    try {
      await ProductListActions.getProductData(id);
    } catch (e) {
      console.log(e);
    }

    // setstate
    this.setState({ productCode: id });
  };

  getTempOrder = async () => {
    const { TempOrderActions } = this.props;

    try {
      await TempOrderActions.getOrderData('002');
    } catch (e) {
      console.log(e);
    }
  };

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
      console.log(e);
    }
  };

  render() {
    const { lists } = this.props;
    const role = 'user';

    return (
      <PageTemplate
        role={role}
        navData={lists}
        id={this.state.productCode}
        clickNav={this.getNavData}
      >
        <OrderProduct />
      </PageTemplate>
    );
  }
}

export default connect(
  state => ({
    lists: state.productList.getIn(['productList', 'lists']),
    currentOrder: state.tempOrder.getIn(['tempOrder', 'currentOrder']),
  }),
  dispatch => ({
    ProductListActions: bindActionCreators(ProductListActions, dispatch),
    TempOrderActions: bindActionCreators(TempOrderActions, dispatch),
  }),
)(UserProduct);
