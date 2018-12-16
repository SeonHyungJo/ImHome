import React, { Component } from 'react';

import { ViewWrapper, ViewWithContent } from '../view';
import { WhiteBtn, DefaultRadio, MonthPicker } from '../../component/common';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class ViewForUser extends Component {
    render() {
        const {
            viewTitle,
            viewSubTitle,
            type,
            searchingData,
            radioBtnSetting,
            radioClick,
            children
        } = this.props;

        return (
            <ViewWrapper title={viewTitle} subTitle={viewSubTitle}>
                {(type == '' || type == 'normal') && (
                    <ViewWithContent>
                        <tr>
                            <th>거래합계(건수)</th>
                            <td />
                            <td colSpan="2" style={{ textAlign: 'right' }} />
                        </tr>
                    </ViewWithContent>
                )}
                {type == 'date' && (
                    <ViewWithContent>
                        <tr>
                            <th>조회기간</th>
                            <td>
                                <div>
                                    {/* https://reactdatepicker.com/ */}
                                    <DatePicker dateFormat="yyyy.MM.dd" selected={new Date()} />
                                    <input type="date" />
                                    <WhiteBtn>1주일</WhiteBtn>
                                    <WhiteBtn>15일</WhiteBtn>
                                    <WhiteBtn>1개월</WhiteBtn>
                                    <WhiteBtn>3개월</WhiteBtn>
                                </div>
                                <div>
                                    <MonthPicker type={'year'} />
                                    <MonthPicker type={'month'} />
                                    <WhiteBtn>월별선택</WhiteBtn>
                                </div>
                                <div>
                                    ※조회내역은 본 시스템을 사용한 시점부터 조회가 가능합니다.
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>조회내용</th>
                            <td>
                                {radioBtnSetting.value.map((value, index) => {
                                    return (
                                        <DefaultRadio
                                            key={index}
                                            name={radioBtnSetting.name}
                                            value={value}
                                            onClick={radioClick}
                                            checked={searchingData.term == value}
                                        >
                                            {radioBtnSetting.text[index]}
                                        </DefaultRadio>
                                    );
                                })}
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
