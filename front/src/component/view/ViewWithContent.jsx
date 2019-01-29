import React from 'react';
import styled from 'styled-components';

const ViewContentWrapper = styled.div`
  overflow: auto;
  padding: 0;
  border-right: none;
`;

const Table = styled.table`
  border-top: 2px solid #fe4c8d;
  border-bottom: 2px solid #fe4c8d;
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  color: #333;
  table-layout: fixed;
  border-spacing: 0;
  border-right: none;
  th {
    text-align: left;
    width: 9rem;
    border-right: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    background: #fafafa;
    height: 3rem;
    line-height: 18px;
    color: #666666;
    font-size: 13px;
    font-weight: bold;
    padding: 5px;
    padding-left: 1rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  td {
    border-right: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    padding: 5px;
    padding-left: 1rem;
    line-height: 22px;
    color: #666666;
    font-size: 0.8rem;
    font-weight: bold;
    height: 3rem;
    box-sizing: border-box;
    letter-spacing: -0.04em;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

const ViewWithContent = ({ title, children }) => (
  <ViewContentWrapper>
    <Table>
      <tbody>{children}</tbody>
    </Table>
  </ViewContentWrapper>
);

export default ViewWithContent;
