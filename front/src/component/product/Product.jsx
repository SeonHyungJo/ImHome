import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Imhome from './Imhome';
import DefaultProduct from './DefaultProduct';
import * as ProductListActions from '../../redux/modules/productList';

const Header = styled.div`
  color: black;
  padding: 10px 10px 0px 10px;
  margin: 10px 0px 0px 10px;
  font-size: 1.5rem;
  font-weight: 800;
`;

class Product extends Component {
  render() {
    const { form } = this.props;
    // #7 const { companyCode, companyName } = form.toJS();
    const companyCode = form.toJS().companyCode;
    // #6 let to const / let으로 할 필요가 없는듯
    // const content = companyCode === '001' || companyCode === '' ? <Imhome /> : <DefaultProduct />;

    let content;

    if (companyCode === '001') {
      content = <Imhome />;
    } else if (companyCode === '') {
      content = <Imhome />;
    } else {
      content = <DefaultProduct />;
    }
    return (
      <div>
        {/* #7 form.toJS().companyName 위에서 같이 처리 가능 */}
        <Header>{form.toJS().companyName}</Header>
        {content}
      </div>
    );
  }
}

export default connect(
  state => ({
    form: state.productList.getIn(['productList', 'form']),
    // error: state.productList.getIn(['productList', 'error']),
    // result: state.productList.get('result'),
  }),
  dispatch => ({
    ProductListActions: bindActionCreators(ProductListActions, dispatch),
  }),
)(Product);
