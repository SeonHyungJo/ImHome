import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import { ViewWrapper, ViewWithContent } from '../view';
import { WhiteBtn, DefaultRadio } from '../common';
import { InlineDatePicker } from '../inlineDatePicker';
import { setCostFormat } from '../../util/commonUtil';

import './react-datepicker.css';

class ViewForUser extends Component {
  render() {
    const {
      viewTitle,
      viewSubTitle,
      type,
      searchingData,
      radioBtnSetting,
      radioClick,
      children,
      totalList,
      totalCost,
      handleChangeStartDate,
      handleChangeEndDate,
      startDate,
      endDate,
      setStartDate,
      selectMonthDate,
      setMonthlyDate,
      setMonthly,
      setMode = true,
    } = this.props;

    return (
      <ViewWrapper title={viewTitle} subTitle={viewSubTitle}>
        {(type === '' || type === 'normal') && (
          <ViewWithContent>
            <tr>
              <th>거래합계(건수)</th>
              <td colSpan="2" style={{ textAlign: 'right', color: '#fe4c8d' }}>
                {`${setCostFormat(totalCost)} 원(${totalList}건)`}
              </td>
              <td colSpan="3" style={{ textAlign: 'right' }}>
                {children}
              </td>
            </tr>
          </ViewWithContent>
        )}
        {type === 'date' && (
          <ViewWithContent>
            <tr>
              <th>조회기간</th>
              <td>
                <div style={{ margin: '1.5px 0px' }}>
                  {/* https://reactdatepicker.com/ */}
                  <DatePicker
                    dateFormat="yyyy.MM.dd"
                    selected={startDate}
                    onChange={handleChangeStartDate}
                    disabled={!setMode}
                  />
                  ~
                  <DatePicker
                    dateFormat="yyyy.MM.dd"
                    selected={endDate}
                    onChange={handleChangeEndDate}
                    disabled={!setMode}
                  />
                  <WhiteBtn onClick={() => setStartDate(7)} disabled={!setMode}>
                    1주일
                  </WhiteBtn>
                  <WhiteBtn onClick={() => setStartDate(15)} disabled={!setMode}>
                    15일
                  </WhiteBtn>
                  <WhiteBtn onClick={() => setStartDate(30)} disabled={!setMode}>
                    1개월
                  </WhiteBtn>
                  <WhiteBtn onClick={() => setStartDate(90)} disabled={!setMode}>
                    3개월
                  </WhiteBtn>
                </div>
                <div>
                  <InlineDatePicker
                    type="year"
                    year={selectMonthDate.year}
                    onClick={setMonthlyDate}
                  />
                  <InlineDatePicker
                    type="month"
                    month={selectMonthDate.month}
                    onClick={setMonthlyDate}
                  />
                  <WhiteBtn onClick={setMonthly}>월별선택</WhiteBtn>
                </div>
                <div>
                  <p style={{ margin: '1.5px 0px', color: 'orange' }}>
                    ※조회내역은 본 시스템을 사용한 시점부터 조회가 가능합니다.
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <th>조회내용</th>
              <td>
                {radioBtnSetting.value.map((value, index) => (
                  <DefaultRadio
                    key={index}
                    name={radioBtnSetting.name}
                    value={value}
                    onClick={radioClick}
                    checked={searchingData.term === value}
                  >
                    {radioBtnSetting.text[index]}
                  </DefaultRadio>
                ))}
              </td>
            </tr>
            <tr>
              <th colSpan="2" style={{ textAlign: 'center' }}>
                {children}
              </th>
            </tr>
          </ViewWithContent>
        )}
      </ViewWrapper>
    );
  }
}

export default ViewForUser;
