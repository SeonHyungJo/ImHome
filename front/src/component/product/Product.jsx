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
        let content, categories;

        if (companyCode === '001') {
            categories = product.items.filter(item => item.itemDepth === 0);
            content = <Imhome product={product} categories={categories} />;
        } else if (companyCode === '') {
            categories = [];
            content = <Imhome product={product} categories={categories} />;
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
