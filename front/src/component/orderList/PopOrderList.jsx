import React from 'react';
import styled from 'styled-components';

import * as CommonUtil from '../../util/commonUtil';
import { OrderListTable } from '.';

const MaskingWrapper = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 1300;
  position: fixed;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const OrderListTablePopup = ({
  headerName,
  displayPop,
  buttonList = [],
  clickComplete,
  orderList,
  orderDate,
}) => (
  <MaskingWrapper style={{ display: !displayPop ? 'none' : '' }}>
    <OrderListTable
      headerName={headerName}
      orderList={orderList}
      buttonList={buttonList}
      clickComplete={clickComplete}
      releaseDate={CommonUtil.setHangleDateTime(orderDate)}
    />
  </MaskingWrapper>
);

export default OrderListTablePopup;
