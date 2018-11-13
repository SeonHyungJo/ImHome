import React from 'react';
import styled from 'styled-components';

const Tbody = styled.tbody`
    td {
        color: rgba(255, 255, 255, 0.5);
    }
`

const OrderListTableList = ({ orderList }) => (
    <Tbody>
        {orderList.map(order => <Order pName={order.name} pCount={order.count} pCost={order.cost}/>)}
    </Tbody>
);

const Order = ({pName, pCount, pCost}) => (
    <tr>
        <td>
            {pName}
        </td>
        <td>
            {pCount}
        </td>
        <td>
            {pCost}
        </td>
    </tr>
)

export default OrderListTableList;