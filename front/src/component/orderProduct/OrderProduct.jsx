import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Imhome from './Imhome';
// import DefaultProduct from './DefaultProduct';
import * as ProductListActions from '../../redux/modules/productList';

const Header = styled.div`
  color: black;
  padding: 10px 10px 0px 10px;
  margin: 10px 0px 0px 10px;
  font-size: 1.5rem;
  font-wight: bold;
`;

class OrderProduct extends Component {
  render() {
    const { form } = this.props;
    const companyCode = form.toJS().companyCode;
    let content;

    if (companyCode === '001') {
      content = <Imhome />;
    } else if (companyCode === '') {
      content = <Imhome />;
    } else {
      // content = <DefaultProduct />;
      content = 1;
    }
    return (
      <div>
        <Header>{form.toJS().companyName}</Header>
        {content}
      </div>
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
)(OrderProduct);
