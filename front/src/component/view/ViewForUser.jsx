import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ViewWrapper, ViewWithContent } from '.';
import * as UserActions from '../../redux/modules/user';

class ViewForUser extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    let returnVal = true;

    if (nextProps.form === this.props.form) returnVal = false;

    return returnVal;
  }

  render() {
    const {
      branchName,
      name,
      id,
      cName,
      bNumber,
      bAddress,
      email,
      pNumber,
      bPhoneNumber,
    } = this.props.form.toJS();

    return (
      <ViewWrapper title={this.props.viewTitle}>
        <ViewWithContent>
          <tr>
            <th>지점명</th>
            <td>{branchName || '-'}</td>
            <th />
            <td />
          </tr>
          <tr>
            <th>대표자</th>
            <th>{name || '-'}</th>
            <th>아이디</th>
            <th>{id || '-'}</th>
          </tr>
          <tr>
            <th>회사명</th>
            <td>{cName || '-'}</td>
            <th>사업자 번호</th>
            <td>{bNumber || '-'}</td>
          </tr>
          <tr>
            <th>사업장 주소</th>
            <th>{bAddress || '-'}</th>
            <th>이메일 주소</th>
            <th>{email || '-'}</th>
          </tr>
          <tr>
            <th>사업장 연락처</th>
            <td>{pNumber || '-'}</td>
            <th>사업주 연락처</th>
            <td>{bPhoneNumber || '-'}</td>
          </tr>
        </ViewWithContent>
      </ViewWrapper>
    );
  }
}

export default connect(
  state => ({
    form: state.user.getIn(['user', 'form']),
    list: state.user.getIn(['user', 'list']),
    store: state.user.getIn(['user', 'store']),
    error: state.user.getIn(['user', 'error']),
    result: state.user.get('result'),
  }),
  dispatch => ({
    UserActions: bindActionCreators(UserActions, dispatch),
  }),
)(ViewForUser);
