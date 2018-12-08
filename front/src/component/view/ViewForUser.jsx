import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FormBtn } from '../common';
import { ViewWrapper, ViewWithContent, PopUserInfo } from './';
import * as UserActions from '../../redux/modules/user';

class ViewForUser extends Component {
    render() {
        const { branchName, name, id, cName, bNumber, bAddress, email, pNumber } = this.props.form.toJS();

        return (
            <ViewWrapper title={this.props.viewTitle}>
                <ViewWithContent>
                    <tr>
                        <th>지점명</th>
                        <td>{branchName ? branchName : '-'}</td>
                        <th></th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>대표자</th>
                        <td>{name ? name : '-'}</td>
                        <th>아이디</th>
                        <td>{id ? id : '-'}</td>
                    </tr>
                    <tr>
                        <th>회사명</th>
                        <td>{cName ? cName : '-'}</td>
                        <th>사업자 번호</th>
                        <td>{bNumber ? bNumber : '-'}</td>
                    </tr>
                    <tr>
                        <th>사업장 주소</th>
                        <td>{bAddress ? bAddress : '-'}</td>
                        <th>이메일 주소</th>
                        <td>{email ? email : '-'}</td>
                    </tr>
                    <tr>
                        <th>사업장 연락처</th>
                        <td>{pNumber ? pNumber : '-'}</td>
                        <th>사업주 연락처</th>
                        <td>{pNumber ? pNumber : '-'}</td>
                    </tr>
                </ViewWithContent>
            </ViewWrapper>
        );
    }
}

export default connect(
    (state) => ({
        form: state.user.getIn(['user', 'form']),
        list: state.user.getIn(['user', 'list']),
        store: state.user.getIn(['user', 'store']),
        error: state.user.getIn(['user', 'error']),
        result: state.user.get('result')
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(UserActions, dispatch),
    })
)(ViewForUser);