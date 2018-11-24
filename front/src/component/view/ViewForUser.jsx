import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ViewWrapper, ViewWithContent } from './';
import * as UserActions from '../../redux/modules/user';

class ViewForUser extends React.Component {

    render() {
        const { storeName, custName, custId, companyName, businessNum,
            storeAddress, custEmail, storePhone, custPhone } = this.props.form.toJS();

        return (
            <ViewWrapper title={this.props.viewTitle}>
                <ViewWithContent>
                    <tr>
                        <th>지점명</th>
                        <td>{storeName}</td>
                        <th></th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>대표자</th>
                        <td>{custName}</td>
                        <th>아이디</th>
                        <td>{custId}</td>
                    </tr>
                    <tr>
                        <th>회사명</th>
                        <td>{companyName}</td>
                        <th>사업자 번호</th>
                        <td>{businessNum}</td>
                    </tr>
                    <tr>
                        <th>사업장 주소</th>
                        <td>{storeAddress}</td>
                        <th>이메일 주소</th>
                        <td>{custEmail}</td>
                    </tr>
                    <tr>
                        <th>사업장 연락처</th>
                        <td>{storePhone}</td>
                        <th>사업주 연락처</th>
                        <td>{custPhone}</td>
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