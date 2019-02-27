import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import IosAdd from 'react-ionicons/lib/IosAdd';
import IosRemove from 'react-ionicons/lib/IosRemove';

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
    width: 33%;
  }
  .tableOrderTd {
    width: 25%;
  }

  input.orderInput {
    width: 30%;
    border: 0px;
    vertical-align: super;
    text-align: end;
    margin-left: 3px;
    margin-right: 3px;
  }
  input.orderInput::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const ProductTable = ({
  itemCount, tempOrderKeys, detailItem, _changeCount,
}) => (
  <Table>
    <tbody>
      <tr>
        <th className={classNames('tableNameTd')}>품 목</th>
        <th>단 위</th>
        <th>가 격</th>
        <th className={classNames('tableOrderTd')}>주 문</th>
      </tr>
      {detailItem.map(
        item => (tempOrderKeys.includes(item._id) ? (
          <tr key={item._id} className={classNames('itemOn')}>
            <td className={classNames('tableNameTd', 'tableAlignCenter')}>{item.itemName}</td>
            <td className={classNames('tableAlignCenter')}>{item.itemVolume}</td>
            <td className={classNames('tableAlignRight')}>{item.itemCost}</td>
            <td className={classNames('tableOrderTd', 'tableAlignCenter')}>
              <IosRemove color="#ffffff" onClick={() => _changeCount('minus', item)} />
              <input
                className={classNames('orderInput')}
                type="number"
                value={itemCount[item._id]}
                readOnly
              />
              <IosAdd color="#ffffff" onClick={() => _changeCount('plus', item)} />
            </td>
          </tr>
        ) : (
          <tr key={item._id}>
            <td className={classNames('tableNameTd', 'tableAlignCenter')}>{item.itemName}</td>
            <td className={classNames('tableAlignCenter')}>{item.itemVolume}</td>
            <td className={classNames('tableAlignRight')}>{item.itemCost}</td>
            <td className={classNames('tableOrderTd', 'tableAlignCenter')}>
              <IosRemove onClick={() => _changeCount('minus', item)} />
              <input className={classNames('orderInput')} type="number" value={0} readOnly />
              <IosAdd onClick={() => _changeCount('plus', item)} />
            </td>
          </tr>
        )),
      )}
    </tbody>
  </Table>
);

export default ProductTable;
