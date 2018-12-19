import React, { Component } from 'react'
import { NavContainer } from './'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as NavAction from '../../redux/modules/nav'

class NavTemplate extends Component {
  async componentDidMount () {
    const { NavAction } = this.props
    console.log('nav mount')
    // NavAction.getAllList();
  }

  clickNavItem (companyCode) {
    const { clickNav, NavAction } = this.props

    console.log('Click Nav!!!')
    // Nav 컴포넌트 내부적으로 위치 설정 하기
    NavAction.changeCurrentNav({ currentNav: companyCode })
    // 상위에서 받은 이벤트 처리도 해주기
    clickNav(companyCode)
  }

  render () {
    const { currentNav, navList } = this.props
    const isCompany =
      !!(navList && navList[0] && navList[0].hasOwnProperty('companyCode'))
    console.log('NavList render')
    return (
      <>
        <NavContainer>
          {/* 1-2 */}
          {navList && isCompany
            ? navList.map((data, index) => {
              return data.companyCode === currentNav ? (
                <li
                  className='on'
                  key={index}
                  id={data.companyCode}
                  onClick={() => this.props.clickNav && this.clickNavItem(data.companyCode)}
                >
                  {data.companyName}
                </li>
              ) : (
                <li
                  key={index}
                  id={data.id}
                  onClick={() => this.props.clickNav && this.clickNavItem(data.companyCode)}
                >
                  {data.companyName}
                </li>
              )
            })
            : navList.map((data, index) => {
              return data.branchCode === currentNav ? (
                <li
                  className='on'
                  key={index}
                  id={data.branchCode}
                  onClick={() => this.props.clickNav && this.clickNavItem(data.branchCode)}
                >
                  {data.branchName}
                </li>
              ) : (
                <li
                  key={index}
                  id={data.id}
                  onClick={() => this.props.clickNav && this.clickNavItem(data.branchCode)}
                >
                  {data.branchName}
                </li>
              )
            })}
        </NavContainer>
      </>
    )
  }
}

export default connect(
  state => ({
    currentNav: state.nav.get('currentNav'),
    navList: state.nav.get('navList')
  }),
  dispatch => ({
    NavAction: bindActionCreators(NavAction, dispatch)
  })
)(NavTemplate)
