import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PageTemplate } from '../../component/template';
import { OrderProduct } from '../../component/orderProduct';
import { OrderListTable } from '../../component/orderList';
import * as ProductListActions from '../../redux/modules/productList';

class UserProduct extends Component {
  constructor() {
    super();

    this.state = {
      companyCode: '0',
    };
  }

  async componentDidMount() {
    const { ProductListActions } = this.props;

    await ProductListActions.getProducts();
    await this.getCompanyList();
  }

  getCompanyList = async () => {
    const { ProductListActions, lists } = this.props;
    try {
      if (lists) {
        await ProductListActions.getProductData('001');
        this.setState({ companyCode: '001' });
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
    this.setState({ companyCode: id });
  };

  render() {
    const { lists } = this.props;

    return (
      <PageTemplate
        role="user"
        navData={lists}
        id={this.state.companyCode}
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
  }),
  dispatch => ({
    ProductListActions: bindActionCreators(ProductListActions, dispatch),
  }),
)(UserProduct);
