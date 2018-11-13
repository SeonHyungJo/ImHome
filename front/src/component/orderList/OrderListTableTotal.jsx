import React from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
    display: inline-block;
    width: 35vw;
    height: 75vh;
    background-color: #fe4c8d;
    border: 2px solid white;
    padding: 15px;

    div {
        border: 2px dashed white;
        height: 100%;
    }
`

const Table = styled.table`
    border-top: none;
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    color: #333;
    table-layout: fixed;
    border-spacing: 0;
    width: 100%;
    th {
        text-align: center;
        border-right: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        background: #fafafa;
        height: 35px;
        line-height: 18px;
        color: #666666;
        font-size: 13px;
        padding: 5px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    };
    td {
        border-right: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        padding: 5px;
        line-height: 22px;
        color: #666666;
        font-size: 13px;
        height: 30px;
        box-sizing: border-box;
        letter-spacing: -0.04em;
    };
`

const OrderListTableTotal = ({ orderList }) => (
    <ContentWrapper>
        <div>
         test{/* {orderList.map((obj)=> obj.name)} */}
        </div>
    </ContentWrapper>
);

export default OrderListTableTotal;