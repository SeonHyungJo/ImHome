import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ViewWrapper, ViewWithContent } from './'
import * as UserActions from '../../redux/modules/user'

class ViewForUser extends Component {
  render () {
    const {
      branchName,
      name,
      id,
      cName,
      bNumber,
      bAddress,
      email,
      pNumber,
      bPhoneNumber
    } = this.props.form.toJS()
    console.log('회원정보 Render')
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
            <td>{name || '-'}</td>
            <th>아이디</th>
            <td>{id || '-'}</td>
          </tr>
          <tr>
            <th>회사명</th>
            <td>{cName || '-'}</td>
            <th>사업자 번호</th>
            <td>{bNumber || '-'}</td>
          </tr>
          <tr>
            <th>사업장 주소</th>
            <td>{bAddress || '-'}</td>
            <th>이메일 주소</th>
            <td>{email || '-'}</td>
          </tr>
          <tr>
            <th>사업장 연락처</th>
            <td>{pNumber || '-'}</td>
            <th>사업주 연락처</th>
            <td>{bPhoneNumber || '-'}</td>
          </tr>
        </ViewWithContent>
      </ViewWrapper>
    )
  }
}

export default connect(
  state => ({
    form: state.user.getIn(['user', 'form'])
  }),
  dispatch => ({
    UserActions: bindActionCreators(UserActions, dispatch)
  })
)(ViewForUser)
