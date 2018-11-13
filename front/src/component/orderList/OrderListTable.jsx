import React from 'react';
import styled from 'styled-components';
import { OrderListTableList } from './';

const ContentWrapper = styled.div`
    display: inline-block;
    width: 35vw;
    height: 75vh;
    background-color: #fe4c8d;
    padding: 10px;

    .dashedContainer {
        border: 1px dashed white;
        height: 100%;        
    }

    .mainContainer {
        padding: 0px 60px;
        height: 100%; 
    }
`

const Header = styled.h2`
    font-size: 24px;
    color: white;
    padding-left: 15px;
    margin: 0px;
    margin-top: 30px;
`

const OrderTable = styled.table`
    width: 100%;
    color: white;
    padding-left: 15px;
    padding-bottom: 5px;
    
    .underLineDash{
        border-bottom: 1px dashed white;
    }

    th {
        text-align: left;
    }
`

const OrderListTable = ({ branchName, orderList }) => (
    <ContentWrapper>
        <div className={"dashedContainer"}>
            <div className={"mainContainer"}>
                <Header>
                    {branchName} 주문내역
                </Header>
                <OrderTable>
                    <Thead/>
                    <OrderListTableList orderList={orderList}/>
                </OrderTable>
            </div>
        </div>
    </ContentWrapper>
);

const Thead = () => (
    <thead className={"underLineDash"}>
        <tr>
            <th>
                PRODUCT
        </th>
            <th>
                수량
        </th>
            <th>
                단가
        </th>
        </tr>
    </thead>
)

export default OrderListTable;