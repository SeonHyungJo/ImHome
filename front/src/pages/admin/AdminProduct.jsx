import React, { Component } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PageTemplate } from '../../component/template';
import { Imhome, DefaultProduct } from '../../component/product';
import * as ProductListActions from '../../redux/modules/productList';

const Header = styled.div`
  color: black;
  padding: 10px 10px 0px 10px;
  margin: 10px 0px 0px 10px;
  font-size: 1.5rem;
  font-weight: 800;
`;

class AdminProduct extends Component {
  constructor() {
    super();

    this.state = {
      productCode: '001',
    };
  }

  async componentDidMount() {
    const { ProductListActions } = this.props;
    const { productCode } = this.state;

    await ProductListActions.getProducts(); // 프로덕트 리스트 모두 가져오기
    await this.getNavData(productCode);
  }

  /*
    getNavData: 프로덕트 데이터 가져오기
    params:
      productCode : product의 고유코드
  */
  getNavData = async (productCode) => {
    const { ProductListActions } = this.props;

    try {
      await ProductListActions.getProductData(productCode);
    } catch (e) {
      console.error(e);
    }

    this.setState({ productCode });
  };

  render() {
    const { lists, form } = this.props;
    const role = 'admin';
    const { companyName, companyCode } = form.toJS();

    return (
      <PageTemplate
        role={role}
        navData={lists}
        id={this.state.productCode}
        clickNav={this.getNavData}
      >
        <div>
          <Header>{companyName}</Header>
          {companyCode === '001' || companyCode === '' ? <Imhome /> : <DefaultProduct />}
        </div>
      </PageTemplate>
    );
  }
}

export default connect(
  state => ({
    form: state.productList.getIn(['productList', 'form']),
    lists: state.productList.getIn(['productList', 'lists']),
    error: state.productList.getIn(['productList', 'error']),
    result: state.productList.get('result'),
  }),
  dispatch => ({
    ProductListActions: bindActionCreators(ProductListActions, dispatch),
  }),
)(AdminProduct);
