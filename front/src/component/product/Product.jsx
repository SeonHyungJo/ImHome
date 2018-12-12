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
        console.log(this.props);
        const content =
            this.props.companyCode === '001' ? (
                <Imhome lists={this.props.lists} />
            ) : (
                <StoreProduct product={this.props.lists[0]} />
            );

        return (
            <div>
                <Header>Food Menu</Header>
                {content}
            </div>
        );
    }
}

export default Product;
