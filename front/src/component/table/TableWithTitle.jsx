import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
    overflow-y: auto;
`

const Table = styled.table`
    border-top: 2px solid #fe4c8d;
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
        text-overflow:ellipsis; overflow:hidden; white-space:nowrap;
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
        text-overflow:ellipsis; overflow:hidden; white-space:nowrap;
    };
`

const TableWithTitle = ({ title, children }) => (
    <HeaderWrapper>
        <Table>
            <tbody>
                {children}
            </tbody>
        </Table>
    </HeaderWrapper>
);

export default TableWithTitle;