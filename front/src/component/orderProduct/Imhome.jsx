import React, { Component } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProductListActions from '../../redux/modules/productList';
import Category from './Category';
import { OrderListTable } from '../orderList';
// import { AlertPopup } from '../../component/common';
// import PopDeleteConfirm from './PopDeleteConfirm';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 75vw;
  height: 75vh;
  background-color: white;
  padding: 10px;

  .category {
    display: flex;
    justify-content: space-between;
    margin: 10px 10px 0px 0px;
    padding: 0px 0px 0px 0px;
    height: 6rem;
    .categoryMain {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 70%;
      margin-left: 1rem;
      .name {
        font-weight: bold;
        margin-bottom: 0.5rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .desc {
        color: #7e8387;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    .categorySub {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30%;
      cursor: pointer;
    }

    .categorySubButton {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 30%;
    }
  }

  .clicked {
    background-color: #363636;
    color: #ffffff;
  }
`;

const MainContainer = styled.div`
  padding: 10px 0px 0px 10px;
  width: 37.5vw;
  height: 75vh;
  overflow: hidden;

  .footerContainer {
    padding: 0px 0px 10px 0px;
    width: 100%;
    display: flex;
    // border: solid 1px black;
    position: static;
    bottom: 0;
    height: 10%;
  }

  .productComponent {
    overflow-y: auto;
    height: 85%;
  }
`;

const ProductFormContainer = styled.div`
  width: 37.5vw;
  height: 75vh;
  background-color: white;
  padding: 10px;
  overflow: hidden;
  .tableTitle {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }

  .itemFooterContainer {
    padding: 0px 0px 10px 0px;
    width: 100%;
    display: flex;
    // border: solid 1px black;
    position: static;
    bottom: 0;
    height: 10%;
  }

  .itemContainer {
    overflow-y: auto;
    height: 77%;
  }
`;

const Button = styled.button`
  margin-top: 1rem;
  margin-right: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  border: 2px solid #fe4c8d;
  border-radius: 3px;
  background: white;
  color: #fe4c8d;

  text-align: center;
  font-size: 0.8rem;
  width: 8rem;
  cursor: pointer;
  font-weight: bold;
`;


class Imhome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _clickCategory = (index, _id, itemName) => {
    const { ProductListActions } = this.props;

    ProductListActions.changeCate({
      index,
      _id,
      itemName,
    });
  };

  _handleChange = (stateName, e) => this.setState({
    [stateName]: { ...this.state[stateName], [e.target.name]: e.target.value },
  });

  render() {
    const { form } = this.props;
    const { categories, clickedCate } = form.toJS();

    return (
      <ContentWrapper>
        <MainContainer>
          <Category
            categories={categories}
            clickedCate={clickedCate}
            _clickCategory={this._clickCategory}
          />
          <hr />
          {!!categories.length > 0 ? (
            <div className="footerContainer">
              <Button onClick={() => console.log('h')}>메뉴 전체보기</Button>
            </div>
          ) : (
            <div />
          )}
        </MainContainer>
        <ProductFormContainer>
          <OrderListTable />
        </ProductFormContainer>
      </ContentWrapper>
    );
  }
}

export default connect(
  state => ({
    form: state.productList.getIn(['productList', 'form']),
    lists: state.productList.getIn(['productList', 'lists']),
    message: state.productList.getIn(['productList', 'message']),
    error: state.productList.getIn(['productList', 'error']),
    result: state.productList.get('result'),
  }),
  dispatch => ({
    ProductListActions: bindActionCreators(ProductListActions, dispatch),
  }),
)(Imhome);
