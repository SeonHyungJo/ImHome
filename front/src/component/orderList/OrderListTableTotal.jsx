import React from 'react'

const OrderListTableTotal = ({ totalCost }) => (
    <div className={'footerTr'}>
        <div className={'footerTd'}> ORDER TOTAL </div>
        <div className={'footerTd'}> {`: $ ${totalCost}`} </div>
    </div>
)

export default OrderListTableTotal
