import React, { Component } from 'react';
import styled from 'styled-components';
import Imhome from './Imhome';
import StoreProduct from './StoreProduct';

const Header = styled.div`
    color: black;
    padding: 10px;
    margin: 0px;
    font-size: 35px;
    font-wight: bold;
`;

class Product extends Component {
    render() {
        const { product } = this.props;
        let content, categories;
        if (this.props.companyCode === '001') {
            categories = product.items.filter(item => item.itemDepth === 0);
            content = <Imhome product={product} categories={categories} />;
        } else if (this.props.companyCode === '0') {
            categories = [];
            content = <Imhome product={product} categories={categories} />;
        } else {
            content = <StoreProduct product={product} />;
        }
        return (
            <div>
                <Header>Food Menu</Header>
                {content}
            </div>
        );
    }
}

export default Product;
