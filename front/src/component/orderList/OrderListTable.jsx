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
    color: white;
    padding: 10px 20px 0px 20px;
`

const OrderTable = styled.table`
    width: 100%;

    th {
        color: red;
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
                    <tr>
                        <th>
                            test
                        </th>
                        <th>
                            test
                        </th>
                        <th>
                            test
                        </th>
                        <th>
                            test
                        </th>
                    </tr>
                </OrderTable>
            </div>
        </div>
    </ContentWrapper>
);

export default OrderListTable;