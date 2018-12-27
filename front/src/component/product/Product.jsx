import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Imhome from './Imhome';
import DefaultProduct from './DefaultProduct';
import * as ProductListActions from '../../redux/modules/productList';

const Header = styled.div`
    color: black;
    padding: 10px;
    margin: 0px;
    font-size: 35px;
    font-wight: bold;
`;

class Product extends Component {
    render() {
        const { form } = this.props;
        const product = form.toJS();
        const companyCode = product.companyCode;
        let content, categories, clickedCate;

        if (companyCode === '001') {
            categories = product.items.filter(item => item.itemDepth === 0);

            const first = categories[0];
            clickedCate = { index: 0, _id: first._id, itemName: first.itemName };

            content = <Imhome categories={categories} clickedCate={clickedCate} />;
        } else if (companyCode === '') {
            categories = [];
            content = <Imhome categories={categories} clickedCate={{ index: -1 }} />;
        } else {
            content = <DefaultProduct />;
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
        result: state.productList.get('result')
    }),
    dispatch => ({
        ProductListActions: bindActionCreators(ProductListActions, dispatch)
    })
)(Product);
