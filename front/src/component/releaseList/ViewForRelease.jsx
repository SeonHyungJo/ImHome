import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ViewWrapper, ViewWithContent } from '../view';

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
                            <td />
                        </tr>
                        <tr>
                            <th>조회내용</th>
                            <td />
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
