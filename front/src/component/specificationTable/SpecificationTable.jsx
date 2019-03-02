import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import { SpecificationTableList, SpecificationTableTotal } from '.';
import { FormBtn } from '../common';
import { ReactToPrint } from '../external';

const ContentWrapper = styled.div`
  min-width: 35vw;
  height: 75vh;
  border: 1px solid black;
  padding: 10px;

  .dashedContainer {
    border: 1px dashed black;
    height: 100%;
  }

  .mainContainer {
    padding: 30px 20px 0px 20px;
    height: calc(100% - 100px);
  }

  .subContainer {
    height: 25px;
  }

  .buttonContainer {
    display: flex;
    padding: 10px 20px 10px 20px;
    height: 40px;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;
  }

  .leftSide {
    float: left;
  }
  .rightSide {
    float: right;
  }
`;

const Header = styled.h3`
  color: black;
  padding: 0;
  margin: 0;
`;

const BranchContainer = styled.div`
  border: 1px solid black;
  border-bottom: 2px solid black;
  margin: 0px 2px 20px 2px;

  .branchInfo {
    display: inline-block;
    background: rgba(0, 0, 0, 0.2);
    border-right: 1px solid black;

    font-weight: 700;

    text-align: center;
    width: 36%;
    padding: 15px 2px 0px;

    .branchInfo_bottomText {
      text-align: right;
      font-weight: 500;
      font-size: 12px;
      margin: 0px;
    }
  }

  .masterInfo {
    display: inline-block;
    text-align: left;
    width: 62%;
    padding: 0px;

    .masterInfo_mainText {
      font-weight: 500;
      margin: 2px 0px;
      text-decoration: underline;
    }

    .masterInfo_subText {
      font-size: 12px;
      margin: 0px;
    }
  }
`;

const ContentTable = styled.div`
  display: block;
  color: black;
  width: 100%;
  height: calc(100% - 180px);

  .thead {
    display: block;
    padding: 0px;
    width: calc(100% - 20px);
    height: 21px;
  }

  .theadTh {
    display: inline-block;
    text-align: left;
    font-weight: 500;

    :nth-of-type(1) {
      width: 30%;
    }

    :nth-of-type(2) {
      width: 15%;
    }

    :nth-of-type(3) {
      width: 15%;
    }
    :nth-of-type(4) {
      width: 25%;
    }
    :nth-of-type(5) {
      width: 15%;
    }
  }

  .tbody {
    display: block;
    width: calc(100% - 40px);
    height: calc(80% - 40px);
    padding: 10px 10px;
    font-size: 12px;
  }

  .tbodyTr {
    display: block;

    :nth-child(2n-1) {
      background: rgba(0, 0, 0, 0.2);
    }
  }

  .tbodyTd {
    display: inline-block;
    text-align: left;
    border-collapse: collapse;
    color: rgba(0, 0, 0, 0.8);

    :nth-of-type(1) {
      width: 30%;
    }

    :nth-of-type(2) {
      width: 15%;
    }

    :nth-of-type(3) {
      width: 15%;
    }
    :nth-of-type(4) {
      width: 25%;
    }
    :nth-of-type(5) {
      width: 15%;
    }
  }

  .footerTr {
    display: block;
    width: calc(100% - 20px);
    padding: 10px;
  }

  .footerTd {
    display: inline-block;

    font-size: 15px;
    font-weight: 700;
    border: 1px solid rgba(0, 0, 0, 0.2);

    padding: 2px;

    :nth-of-type(1) {
      text-align: right;
      width: 45%;
    }

    :nth-of-type(2) {
      text-align: left;
      background-color: #c2baba;
      width: 45%;
    }
  }

  .footer_subText {
    margin: 0px;
    font-size: 12px;
  }

  .underLineDash {
    border-bottom: 1px dashed black;
  }

  .text-center {
    text-align: center;
  }
`;

const Button = styled.button`
  color: black;
  background-color: #c2baba;
  border: 0px;
  border-radius: 3px;

  font-size: 18px;
  font-weight: 800;

  max-height: 40px;
  padding: 5px 15px;
  margin: 0 5px;
  cursor: pointer;
`;

class SpecificationTable extends React.Component {
  constructor() {
    super();
    this.componentRef = React.createRef();
  }

  render() {
    const {
      headerName,
      tradeDate = '2018년 05월 10일',
      orderList = [],
      buttonList = [],
      saveSpecify,
    } = this.props;

    return (
      <ContentWrapper ref={this.componentRef}>
        <div className="dashedContainer">
          <div className="mainContainer">
            <Header>거 래 명 세 표</Header>
            <div className="subContainer">
              <div className="leftSide">{tradeDate}</div>
              <div className="rightSide">공급받는자용</div>
            </div>
            <BranchContainer>
              <div className="branchInfo">
                <p>{`아임홈 ${headerName || '00점'} 귀하`}</p>
                <p className="branchInfo_bottomText">아래와 같이 계산합니다.</p>
              </div>
              <div className="masterInfo">
                <p className="masterInfo_mainText">공급자 : (주)아임홈 본사</p>
                <p className="masterInfo_subText">등록번호 : 222-222-22222</p>
                <p className="masterInfo_subText">업 태 : 제조/도 소매</p>
                <p className="masterInfo_subText">사업장 : 성남시 분당구 백현동 582-8번지 1층</p>
              </div>
            </BranchContainer>
            <ContentTable>
              <Thead />
              <SpecificationTableList orderList={orderList} />
              <SpecificationTableTotal totalCost={calTotalCost(orderList)} />
            </ContentTable>
          </div>
          <div className="buttonContainer">
            {buttonList.map(
              (button, index) => (index === 0 ? (
                <Buttons
                  key={`${button.name}_${index}`}
                  name={button.name}
                  clickComplete={() => saveSpecify()}
                />
              ) : (
                <ReactToPrint
                  key={`${button.name}_${index}_print`}
                  trigger={() => (
                    <FormBtn
                      key={`${button.name}_${index}_btn`}
                      style={{
                        color: 'black',
                        backgroundColor: '#c2baba',
                        border: '0px',
                        borderRadius: '3px',
                        fontSize: '18px',
                        fontHeight: '800',
                        maxHeight: '40px',
                        padding: '5px 15px',
                        margin: '0px 5px',
                        cursor: 'pointer',
                      }}
                    >
                      {button.name}
                    </FormBtn>
                  )}
                  content={() => this.componentRef.current}
                />
              )),
            )}
          </div>
        </div>
      </ContentWrapper>
    );
  }
}

/**
 * @summary 주문내역 총 가격 계산
 * @param orderList
 */
const calTotalCost = orderList => (orderList instanceof Array
  ? orderList.reduce(
    (total, order) => parseInt(order.itemCount, 10) * parseInt(order.itemCost, 10) + total,
    0,
  )
  : 0);

const Thead = () => (
  <div className={classNames('thead', 'underLineDash')}>
    <div className={classNames('theadTh')}>품목</div>
    <div className={classNames('theadTh', 'text-center')}>수량</div>
    <div className={classNames('theadTh', 'text-center')}>단가</div>
    <div className={classNames('theadTh', 'text-center')}>공급가액</div>
    <div className={classNames('theadTh', 'text-center')}>세액</div>
  </div>
);

const Buttons = ({ key, name, clickComplete }) => (
  <Button key={key} onClick={clickComplete}>
    {name}
  </Button>
);

export default SpecificationTable;
