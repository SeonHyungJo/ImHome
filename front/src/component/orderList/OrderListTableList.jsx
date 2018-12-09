import React from 'react';
import classNames from 'classnames';

const OrderListTableList = ({ orderList }) => (
    <div className={classNames('tbody', 'underLineDash')}>
        {orderList instanceof Array &&
            orderList.map(order => (
                <div key={order.itemCode} className={'tbodyTr'}>
                    <div className={classNames('tbodyTd')}>{order.itemName}</div>
                    <div className={classNames('tbodyTd', 'text-center')}>{order.itemCount}</div>
                    <div className={classNames('tbodyTd')}>{`: $ ${order.itemCost}`}</div>
                </div>
            ))}
    </div>
);

export default OrderListTableList;
