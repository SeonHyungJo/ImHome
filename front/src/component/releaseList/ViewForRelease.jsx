import React, { Component } from 'react';

import { ViewWrapper, ViewWithContent } from '../view';
import { WhiteBtn, DefaultRadio, MonthPicker } from '../../component/common';

class ViewForUser extends Component {
    render() {
        return (
            <ViewWrapper title={this.props.viewTitle} subTitle={this.props.viewSubTitle}>
                {(this.props.type === '' || this.props.type === 'normal') && (
                    <ViewWithContent>
                        <tr>
                            <th>거래합계(건수)</th>
                            <td />
                            <td colSpan="2" style={{ textAlign: 'right' }} />
                        </tr>
                    </ViewWithContent>
                )}
                {this.props.type === 'date' && (
                    <ViewWithContent>
                        <tr>
                            <th>조회기간</th>
                            <td>
                                <div>
                                    <WhiteBtn>1주일</WhiteBtn>
                                    <WhiteBtn>15일</WhiteBtn>
                                    <WhiteBtn>1개월</WhiteBtn>
                                    <WhiteBtn>3개월</WhiteBtn>
                                </div>
                                <div>
                                    <MonthPicker />
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
                                <DefaultRadio name="searchType" value="all">
                                    전체선택
                                </DefaultRadio>
                                <DefaultRadio name="searchType" value="any">
                                    선택내역
                                </DefaultRadio>
                                <DefaultRadio name="searchType" value="bill">
                                    세금계산서
                                </DefaultRadio>
                                <DefaultRadio name="searchType" value="bill2">
                                    거래명세서
                                </DefaultRadio>
                            </td>
                        </tr>
                        <tr>
                            <th colSpan="2" style={{ textAlign: 'center' }}>
                                {this.props.children}
                            </th>
                        </tr>
                    </ViewWithContent>
                )}
            </ViewWrapper>
        );
    }
}

export default ViewForUser;
