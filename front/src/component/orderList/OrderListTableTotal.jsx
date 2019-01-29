import React from 'react';
import * as CommonUtil from '../../util/commonUtil';

const OrderListTableTotal = ({ totalCost }) => (
  <div className="footerTr">
    <div className="footerTd"> ORDER TOTAL </div>
    <div className="footerTd">
      {' '}
      {`: $ ${CommonUtil.setCostFormat(totalCost)}`}
      {' '}
    </div>
  </div>
);

export default OrderListTableTotal;
