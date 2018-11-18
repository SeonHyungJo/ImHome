import React from 'react';
import styled from 'styled-components';
import { TableWithScroll } from '../table';
import { Button } from '../common';

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 80vw;
    height: 75vh;
    background-color: white;
    padding: 10px;

    .footerContainer {
        padding: 0px 0px 10px 0px;
        width: 100%;
        display: flex;
        // border: solid 1px black;
    }

    .category {
        margin: 10px 10px 10px 0px;
        padding: 0px 0px 10px 0px;
        // border: solid 1px black;
    }

    .categoryDesc {
        display: flex;
        justify-content: space-between;
        // border: solid 1px black;
        height: 100px; // 수정필요
    }

    .categoryMain {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 70%;
        // border: solid 1px black;
    }

    .categoryMain > .name {
        font-weight: bold;
    }

    .categoryMain > .desc {
        color: #808080;
    }

    .categorySub {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30%;
        // border: solid 1px black;
    }

    .categorySub > .icon {
        height: 30px;
    }
`;

const MainContainer = styled.div`
    padding: 10px 0px 0px 10px;
    width: 40vw;
    height: 75vh;
    // border: solid 1px black;
`;

const ProductFormContainer = styled.div`
    width: 40vw;
    height: 75vh;
    background-color: white;
    padding: 10px;
`;

const Header = styled.div`
    color: black;
    padding: 10px;
    margin: 0px;
    font-size: 35px;
    font-wight: bold;
`;

const Product = ({ products, tableData, tableHeader, tableTitle }) => (
    <div>
        <Header>Food Menu</Header>
        <ContentWrapper>
            <MainContainer>
                <div className={'category'}>
                    {products.map((product, index) => (
                        <div className={'categoryDesc'} key={index}>
                            <div className={'categoryMain'}>
                                <div className={'name'}>{product.name}</div>
                                <div className={'desc'}>{product.desc}</div>
                            </div>
                            <div className={'categorySub'}>
                                <div className={'icon'}>⬇️</div>
                            </div>
                        </div>
                    ))}
                </div>
                <hr />
                <div className={'footerContainer'}>
                    <Button>메뉴추가</Button>
                    <Button>메뉴삭제</Button>
                </div>
            </MainContainer>
            <ProductFormContainer>
                <TableWithScroll
                    headerData={tableHeader}
                    data={tableData}
                    gridTitle={tableTitle + ' 상세'}
                    // clickRow={this.clickRow}
                />
                <hr />
                <div className={'footerContainer'}>
                    <Button>품목추가</Button>
                    <Button>품목삭제</Button>
                    <Button>변경사항 저장</Button>
                </div>
            </ProductFormContainer>
        </ContentWrapper>
    </div>
);

export default Product;
