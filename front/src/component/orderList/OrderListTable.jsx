import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import { OrderListTableList, OrderListTableTotal } from '.';
import * as CommonUtil from '../../util/commonUtil';

const ContentWrapper = styled.div`
  width: 35vw;
  height: 75vh;
  background-color: #fe4c8d;
  padding: 10px;

  .dashedContainer {
    border: 1px dashed white;
    height: 100%;
  }

  .mainContainer {
    padding: 30px 60px 0px 60px;
    height: calc(100% - 100px);
  }

  .buttonContainer {
    display: flex;
    padding: 0px 40px 30px 40px;
    height: 60px;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-around;
  }
`;

const Header = styled.h3`
  color: white;
  padding: 0px 0px 0px 10px;
  margin: 0px;
`;

const OrderTable = styled.div`
  color: white;
  width: 100%;
  height: calc(100% - 50px);

  .thead {
    display: block;
    padding: 10px;
    width: calc(100% - 20px);
    height: 21px;
  }

  .theadTh {
    display: inline-block;
    text-align: left;
    font-weight: 700;

    :nth-of-type(1) {
      width: 50%;
    }

    :nth-of-type(2) {
      width: 20%;
    }

    :nth-of-type(3) {
      width: 30%;
    }
  }

  .tbody {
    display: block;
    width: calc(100% - 20px);
    height: calc(80% - 20px);
    padding: 10px;
  }

  .tbodyTr {
    display: block;
  }

  .tbodyTd {
    display: inline-block;
    text-align: left;
    border-collapse: collapse;
    color: rgba(255, 255, 255, 0.6);

    :nth-of-type(1) {
      width: 50%;
    }

    :nth-of-type(2) {
      width: 20%;
    }

    :nth-of-type(3) {
      width: 30%;
    }
  }

  .footerTr {
    display: block;
    width: calc(100% - 20px);
    padding: 10px;
  }

  .footerTd {
    display: inline-block;
    text-align: left;
    font-size: 18px;
    font-weight: 500;

    :nth-of-type(1) {
      width: 65%;
    }

    :nth-of-type(2) {
      width: 35%;
    }
  }

  .underLineDash {
    border-bottom: 1px dashed white;
  }

  .text-center {
    text-align: center;
  }
`;

const Button = styled.button`
  color: #fe4c8d;
  background-color: white;
  border: 0px;
  border-radius: 3px;
  font-size: 18px;
  font-weight: 800;
  max-height: 40px;
  padding: 5px 15px;
  cursor: pointer;
`;

const RightSpan = styled.span`
  float: right;
  text-align: right;
`;

const OrderListTable = ({
  headerName,
  orderList = [],
  buttonList = [],
  clickComplete,
  style = {},
  addReleaseList,
  releaseDate = '',
}) => (
  <ContentWrapper style={style}>
    <div className="dashedContainer">
      <div className="mainContainer">
        <Header>
          {headerName}
          <RightSpan>{releaseDate}</RightSpan>
        </Header>
        <OrderTable>
          <Thead />
          <OrderListTableList orderList={orderList} addReleaseList={addReleaseList} />
          <OrderListTableTotal totalCost={CommonUtil.getTotalCost(orderList)} />
        </OrderTable>
      </div>
      <Buttons buttonList={buttonList} clickComplete={clickComplete} />
    </div>
  </ContentWrapper>
);

const Thead = () => (
  <div className={classNames('thead', 'underLineDash')}>
    <div className={classNames('theadTh')}>PRODUCT</div>
    <div className={classNames('theadTh', 'text-center')}>수량</div>
    <div className={classNames('theadTh')}>단가</div>
  </div>
);

const Buttons = ({ buttonList, clickComplete }) => (
  <div className="buttonContainer">
    {buttonList.map((button, index) => (
      <Button key={`${button.name}_${index}`} onClick={() => clickComplete(button.event)}>
        {`${button.name}`}
      </Button>
    ))}
  </div>
);

export default OrderListTable;
