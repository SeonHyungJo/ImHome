import React from 'react';
import styled from 'styled-components';
import { Button } from '../common';

const ContentWrapper = styled.div`
    display: inline-block;
    width: 35vw;
    height: 75vh;
    background-color: white;
    padding: 10px;

    .mainContainer {
        padding: 10px 0px 0px 10px;
        // border: solid 1px black;
    }

    .footerContainer {
        padding: 0px 0px 10px 0px;
        width: 40%;
        display: flex;
        // border: solid 1px black;
        justify-content: space-between;
    }

    .category {
        margin: 10px 10px 10px 0px;
        padding: 0px 0px 10px 0px;
        // border: solid 1px black;
    }

    .categoryDesc {
        display: flex;
        justify-content: space-between;
        border: solid 1px black;
        height: 100px; // 수정필요
    }

    .categoryMain {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 70%;
        border: solid 1px black;
    }

    .categoryMain > .name {
        font-weight: bold;
    }

    .categoryMain > .desc {
    }

    .categorySub {
        display: flex;
        justify-content: center;
        align-content: center;
        width: 30%;
        border: solid 1px black;
    }
`;

const Header = styled.h1`
    color: black;
    padding: 0px 0px 0px 10px;
    margin: 0px;
`;

const Product = ({ products }) => (
    <ContentWrapper>
        <Header>Food Menu</Header>
        <div className={'mainContainer'}>
            <div className={'category'}>
                {products.map((product, index) => (
                    <div className={'categoryDesc'} key={index}>
                        <div className={'categoryMain'}>
                            <div className={'name'}>{product.name}</div>
                            <div className={'desc'}>{product.desc}</div>
                        </div>
                        <div className={'categorySub'}>
                            <div>">"</div>
                        </div>
                    </div>
                ))}
            </div>
            <hr />
            <div className={'footerContainer'}>
                <Button>메뉴추가</Button>
                <Button>메뉴삭제</Button>
            </div>
        </div>
    </ContentWrapper>
);

export default Product;
