import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

const Table = styled.table`
  // border-top: 2px solid #fe4c8d;
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  color: #333;
  table-layout: fixed;
  border-spacing: 0;
  margin: 0px 10px 0px 0px;
  padding: 0px 0px 0px 0px;
  th {
    text-align: center;
    border-right: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    background: #fafafa;
    height: 35px;
    line-height: 18px;
    color: #666666;
    font-size: 1rem;
    padding: 5px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  td {
    border-right: 0px solid #fffff;
    border-bottom: 1px solid #e0e0e0;
    padding: 5px;
    line-height: 22px;
    color: #666666;
    font-size: 0.9rem;
    height: 30px;
    box-sizing: border-box;
    letter-spacing: -0.04em;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .itemOn {
    background-color: #fe4c8d;
  }
  .itemOn > td {
    color: #ffffff;
  }
  .checkboxTd {
    width: 7%;
  }
  .tableAlignCenter {
    text-align: center;
  }
  .tableAlignRight {
    text-align: right;
  }
  .tableNameTd {
    width: 35%;
  }
  .tableOrderTd {
    width: 20%;
  }
`;

const ProductTable = ({ list }) => (
  <Table>
    <tbody>
      <tr>
        <th className={classNames('tableNameTd')}>품목</th>
        <th>단위</th>
        <th>가격</th>
        <th>재고량</th>
        <th className={classNames('tableOrderTd')}>주문</th>
      </tr>
      <tr>
        <td className={classNames('tableNameTd', 'tableAlignCenter')}>
          밀크 아이스크림sfsdadfadfsasafasdfafadfasdfasdfadfasfd
        </td>
        <td className={classNames('tableAlignCenter')}>box/3kg</td>
        <td className={classNames('tableAlignRight')}>32500</td>
        <td className={classNames('tableAlignCenter')}>5/10</td>
        <td className={classNames('tableOrderTd', 'tableAlignCenter')}>- | 001 | +</td>
      </tr>
      <tr>
        <td className={classNames('tableNameTd', 'tableAlignCenter')}>밀크 아이스크림</td>
        <td className={classNames('tableAlignCenter')}>box/3kg</td>
        <td className={classNames('tableAlignRight')}>32500</td>
        <td className={classNames('tableAlignCenter')}>5/10</td>
        <td className={classNames('tableOrderTd', 'tableAlignCenter')}>- | 001 | +</td>
      </tr>
    </tbody>
  </Table>
);

export default ProductTable;
