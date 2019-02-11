import React, { Component } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import IosAdd from 'react-ionicons/lib/IosAdd';
import IosRemove from 'react-ionicons/lib/IosRemove';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProductListActions from '../../redux/modules/productList';

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

class ProductTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _changeOrder = (type, item) => {
    const { ProductListActions, productOrder } = this.props;

    // itemCount는 {id: 주문할 갯수}
    // items는 {id: 실제 item 정보}
    const itemCount = productOrder.toJS().itemCount;
    let items = productOrder.toJS().items;

    // itemCount을 변경하는 로직
    // 1. plus를 눌렀을 때
    //   1. 이미 있으면(1 이상) +1
    //   2. 처음 누른거면 1
    // 2. minus를 눌렀을 때
    //   1. 이미 있을 때
    //      **** 이부분 수정 ****
    //      1. 1이라 0이 되는 상황이면 delete
    //      2. 1 이상이면 -1만 해준다.
    //   2. 처음 누른거면 아무것도 안함
    if (type === 'plus') {
      itemCount.hasOwnProperty(item._id)
        ? (itemCount[item._id] = itemCount[item._id] + 1)
        : (itemCount[item._id] = 1);
    } else if (type === 'minus') {
      if (itemCount.hasOwnProperty(item._id)) {
        itemCount[item._id] < 2
          ? delete itemCount[item._id]
          : (itemCount[item._id] = itemCount[item._id] - 1);
      }
    }

    // item을 변경하는 로직
    // itemCount에 처음 들어가는 경우 item정보를 추가.
    // itemCount에서 delete되었다면 같이 제거
    if (itemCount.hasOwnProperty(item._id) && itemCount[item._id] > 0) {
      item = {
        ...item,
        itemCount: `${itemCount[item._id]}`,
      };
      items = {
        ...items,
        [item._id]: item,
      };
    } else {
      delete items[item._id];
    }

    ProductListActions.changeOrder({
      itemCount,
      items,
      form: {
        items: [...Object.values(items)],
      },
    });
  };

  render() {
    const { form, productOrder } = this.props;
    const { clickedCate, items, companyCode } = form.toJS();
    const productOrderCount = productOrder.toJS().itemCount;
    const productOrderKeys = Object.keys(productOrderCount);
    const detailItem = companyCode === '001' ? items.filter(item => item.parentId === clickedCate._id) : items;
    return (
      <Table>
        <tbody>
          <tr>
            <th className={classNames('tableNameTd')}>품 목</th>
            <th>단 위</th>
            <th>가 격</th>
            <th className={classNames('tableOrderTd')}>주 문</th>
          </tr>
          {detailItem.map(
            item => (productOrderKeys.includes(item._id) ? (
              <tr key={item._id} className={classNames('itemOn')}>
                <td className={classNames('tableNameTd', 'tableAlignCenter')}>{item.itemName}</td>
                <td className={classNames('tableAlignCenter')}>{item.itemVolume}</td>
                <td className={classNames('tableAlignRight')}>{item.itemCost}</td>
                <td className={classNames('tableOrderTd', 'tableAlignCenter')}>
                  <IosRemove color="#ffffff" onClick={() => this._changeOrder('minus', item)} />
                  <input
                    className={classNames('orderInput')}
                    type="number"
                    value={productOrderCount[item._id]}
                    readOnly
                  />
                  <IosAdd color="#ffffff" onClick={() => this._changeOrder('plus', item)} />
                </td>
              </tr>
            ) : (
              <tr key={item._id}>
                <td className={classNames('tableNameTd', 'tableAlignCenter')}>{item.itemName}</td>
                <td className={classNames('tableAlignCenter')}>{item.itemVolume}</td>
                <td className={classNames('tableAlignRight')}>{item.itemCost}</td>
                <td className={classNames('tableOrderTd', 'tableAlignCenter')}>
                  <IosRemove onClick={() => this._changeOrder('minus', item)} />
                  <input className={classNames('orderInput')} type="number" value={0} readOnly />
                  <IosAdd onClick={() => this._changeOrder('plus', item)} />
                </td>
              </tr>
            )),
          )}
        </tbody>
      </Table>
    );
  }
}

export default connect(
  state => ({
    form: state.productList.getIn(['productList', 'form']),
    lists: state.productList.getIn(['productList', 'lists']),
    message: state.productList.getIn(['productList', 'message']),
    error: state.productList.getIn(['productList', 'error']),
    result: state.productList.get('result'),
    productOrder: state.productList.get('productOrder'),
  }),
  dispatch => ({
    ProductListActions: bindActionCreators(ProductListActions, dispatch),
  }),
)(ProductTable);
