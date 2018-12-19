import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { PageTemplate } from '../../component/template'
import { TableWithScroll } from '../../component/table'
import { ViewForUser, PopUserInfo } from '../../component/view'
import { TableBtn, FormBtn } from '../../component/common'
import * as UserActions from '../../redux/modules/user'
import * as NavActions from '../../redux/modules/nav'
import * as CommonUtil from '../../util/commonUtil'

class AdminUser extends Component {
  constructor () {
    super()
    const headerData = [
      {
        id: 'createdAt',
        numeric: false,
        disablePadding: true,
        label: '등록일자',
        formatter: function (data) {
          return CommonUtil.setDate(data)
        }
      },
      { id: 'branchName', numeric: false, disablePadding: true, label: '지점명' },
      { id: 'name', numeric: false, disablePadding: true, label: '대표자' },
      { id: 'id', numeric: false, disablePadding: true, label: '아이디' },
      { id: 'bNumber', numeric: false, disablePadding: true, label: '사업자번호' },
      { id: '__v', numeric: true, disablePadding: true, label: '총 거래금액(원)' }
    ]
    this.state = {
      storeId: 1,
      custNo: 1,
      headerData: headerData,
      displayPop: false
    }
  }

  async componentDidMount () {
    const { UserActions, NavActions, storeId } = this.props

    // await UserActions.getStoreList();
    await NavActions.getAllList()
    console.log('componentDidMount : ', storeId)
    await UserActions.getUserList(storeId)
    await UserActions.getUserData(storeId)
    // await this.getStoreList()
    // await this.getNavData()
    // await this.getRowData();
  }

  componentWillUnmount () {
    const { UserActions } = this.props
    // UserActions.initializeForm('user')
  }

  // 최초 로드시 매장 정보를 가져와 redux form에 store 정보 저장
  getStoreList = async () => {
    const { UserActions } = this.props
    try {
      // if (store) {
      //     await UserActions.changeInput({
      //         form: 'user',
      //         value: store[0].branchCode,
      //         name: 'branchCode'
      //     });
      // }
    } catch (e) {
      console.log(e)
    }
  }

  getNavData = async id => {
    const { UserActions, form, storeId, custNo } = this.props

    // let storeId = id || form.toJS().branchCode

    // this.setState({ storeId: storeId })

    try {
      await UserActions.getUserList(id)

      // await UserActions.changeInput({
      //   form: 'user',
      //   value: this.props.list.length > 0 ? this.props.list[0]._id : '0',
      //   name: '_id'
      // })
      await this.getRowData()
    } catch (e) {
      console.log(e)
    }
  }

  getRowData = async id => {
    const { UserActions, form, custNo } = this.props

    // let custNo = id || form.toJS()._id

    // this.setState({ custNo: custNo })
    console.log(custNo)
    try {
      if (custNo) {
        await UserActions.getUserData(custNo)
        // await UserActions.getUserUpdateData(custNo)
      }
    } catch (e) {
      console.log(e)
    }
  }

  deleteData = async () => {
    const { UserActions, form } = this.props
    const { _id } = form.toJS()

    try {
      await UserActions.deleteUserData(_id)

      const loggedInfo = this.props.result.toJS()

      if (loggedInfo.success === '0000') {
        this.getNavData(this.state.storeId)
        alert('회원 정보가 삭제되었습니다.')
      }
    } catch (e) {
      console.log(e)
    }
  }

  popUpdateForm = () => {
    this.setState({ displayPop: true })
  }

  closePop = () => {
    const { UserActions } = this.props

    this.setState({ displayPop: false })
    UserActions.getUserUpdateData(this.state.custNo)
  }

  render () {
    const { custNo } = this.props
    // const { _id } = this.props.form.toJS()
    console.log('AnminUser Render')
    return (
      <PageTemplate clickNav={this.getNavData}>
        <ViewForUser viewTitle='회원정보 조회' />
        {custNo && custNo !== '0' ? (
          <div style={{ textAlign: 'right', marginRight: '1rem' }}>
            <FormBtn onClick={this.popUpdateForm}>회원정보수정</FormBtn>
          </div>
        ) : (
          <div />
        )}
        <TableWithScroll
          headerData={this.state.headerData}
          // data={list}
          gridTitle='회원목록 및 정보'
          clickRow={this.getRowData}
          // id={this.props.custNo}
          button={
            custNo && custNo !== '0' ? (
              <TableBtn onClick={this.deleteData}>회원삭제</TableBtn>
            ) : null
          }
        />
        <PopUserInfo displayPop={this.state.displayPop} closePop={this.closePop} />
      </PageTemplate>
    )
  }
}

export default connect(
  state => ({
    custNo: state.user.getIn(['user', 'custNo']),
    store: state.user.getIn(['user', 'store']),
    error: state.user.getIn(['user', 'error']),
    storeId: state.nav.get('currentNav'),
    result: state.user.get('result')
  }),
  dispatch => ({
    UserActions: bindActionCreators(UserActions, dispatch),
    NavActions: bindActionCreators(NavActions, dispatch)
  })
)(AdminUser)
