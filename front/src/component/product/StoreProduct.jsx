import React, { Component } from 'react';
import styled from 'styled-components';
// import classNames from 'classnames';
import { Button } from '../common';
import { TableWithScroll } from '../table';

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
`;

const MainContainer = styled.div`
    padding: 10px 0px 0px 10px;
    width: 40vw;
    height: 75vh;
    overflow: auto;
    // border: solid 1px black;
`;

const ProductFormContainer = styled.div`
    width: 40vw;
    height: 75vh;
    background-color: white;
    padding: 10px;
    overflow: auto;z
`;

const InputInt = styled.input`
    width: 50%;
    // border: 1px;
    font-size: 1rem;
`;

class StoreProduct extends Component {
    constructor() {
        super();
        const headerData = [
            {
                id: 'p_name',
                numeric: false,
                disablePadding: true,
                label: '품목'
            },
            {
                id: 'p_unit',
                numeric: false,
                disablePadding: true,
                label: '단위'
            },
            {
                id: 'p_cost',
                numeric: true,
                disablePadding: true,
                label: '가격'
            },
            {
                // 추가함
                id: 'p_quan',
                numeric: true,
                disablePadding: true,
                label: '수량'
            },
            {
                id: 'p_edit',
                numeric: false,
                disablePadding: true,
                label: '주문'
            }
        ];
        this.state = {
            clickedCate: -1,
            headerData: headerData,
            data: [
                {
                    p_name: '밀크 아이스크림',
                    p_unit: 'box 3kg',
                    p_cost: '32,500',
                    p_quan: '1',
                    p_edit: '1'
                },
                {
                    p_name: '말차 아이스크림',
                    p_unit: 'box 3kg',
                    p_cost: '32,500',
                    p_quan: '1'
                },
                {
                    p_name: '코코넛 아이스크림',
                    p_unit: 'box 3kg',
                    p_cost: '27,500',
                    p_quan: '2'
                },
                {
                    p_name: '레몬 아이스크림',
                    p_unit: 'box 3kg',
                    p_cost: '31,500',
                    p_quan: '3'
                }
            ]
        };
    }

    render() {
        return (
            <ContentWrapper>
                <MainContainer>
                    <TableWithScroll
                        headerData={this.state.headerData}
                        data={this.state.data}
                        gridTitle={this.props.product.companyName + 'Order'}
                    />
                    <hr />
                    <div className={'footerContainer'}>
                        <Button>주문수정</Button>
                    </div>
                </MainContainer>
                <ProductFormContainer>
                    <InputInt type="number" defaultValue="1" min="0" />
                </ProductFormContainer>
            </ContentWrapper>
        );
    }
}

export default StoreProduct;
