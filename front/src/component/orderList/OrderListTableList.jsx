import React from 'react'
import classNames from 'classnames'

const OrderListTableList = ({ orderList }) => (
    <div className={classNames('tbody', 'underLineDash')}>
        {orderList.map(order => (
            <div className={'tbodyTr'}>
                <div className={classNames('tbodyTd')}>{order.name}</div>
                <div className={classNames('tbodyTd', 'text-center')}>{order.count}</div>
                <div className={classNames('tbodyTd')}>{`: $ ${order.cost}`}</div>
            </div>
        ))}
    </div>
)

export default OrderListTableList
