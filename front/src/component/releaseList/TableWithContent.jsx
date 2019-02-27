import React from 'react';
import styled from 'styled-components';

const TableContentWrapper = styled.div`
  overflow-y: auto;
  min-height: 17vh;
  max-height: 17vh;
  padding: 0;
`;

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
    height: 3.5rem;
    line-height: 2.5rem;
    color: #666666;
    font-size: 13px;
    font-weight: bold;
    padding: 5px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  td {
    border-right: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    padding: 5px;
    line-height: 22px;
    color: #666666;
    font-size: 13px;
    font-weight: bold;
    height: 2.5rem;
    box-sizing: border-box;
    letter-spacing: -0.04em;
    cursor: pointer;
  }

  .on {
    background-color: #fe4c8d;
    td {
      color: black;
    }
  }
`;

const TableWithContent = ({ title, children }) => (
  <TableContentWrapper>
    <Table>
      <tbody>{children}</tbody>
    </Table>
  </TableContentWrapper>
);

export default TableWithContent;
