import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HeaderContainer from '../header/HeaderContainer';
import { NavTemplate } from '../nav';
import Content from '../content/ContentContainer';
import ContentTwoDivContainer from '../content/ContentTwoDivContainer';
import * as UserActions from '../../redux/modules/user';
import * as OrderListActions from '../../redux/modules/orderList';
import * as ProductListActions from '../../redux/modules/releaseList';
import * as ReleaseActions from '../../redux/modules/productList';
import * as TempOrderActions from '../../redux/modules/tempOrder';

class PageTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: this.props.role,
      isLogin: true,

      // 관리자 헤더 리스트
      adminHeaderList: [
        {
          id: 'admin_header_users',
          pathName: '회원정보',
          path: '/admin/users',
        },
        {
          id: 'admin_header_releaselist',
          pathName: '출고내역조회',
          path: '/admin/releaselist',
        },
        {
          id: 'admin_header_orderlist',
          pathName: '주문내역조회',
          path: '/admin/orderlist',
        },
        {
          id: 'admin_header_product',
          pathName: '품목관리',
          path: '/admin/product',
        },
      ],

      // 사용자 헤더 리스트
      userHeaderList: [
        {
          id: 'user_header_releaselist',
          pathName: '주문내역조회',
          path: '/releaselist',
        },
        {
          id: 'user_header_orderlist',
          pathName: '주문내역확인',
          path: '/orderlist',
        },
        {
          id: 'user_header_product',
          pathName: '주문재고관리',
          path: '/product',
        },
      ],
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.setState({ isLogin: false });
    }
  }

  /**
   * @author
   * @description 로그아웃
   */
  logout = async () => {
    try {
      await this.initializeForm();
      await this.removeStorageData();
    } catch (e) {
      console.log(e);
    }
  };

  removeStorageData = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('checkAdmin');
    localStorage.removeItem('branchName');

    this.setState({ isLogin: false });
  }

  initializeForm = () => {
    const { UserActions, OrderListActions,
      ProductListActions, ReleaseActions, TempOrderActions } = this.props;

    UserActions.initializeForm('user');
    OrderListActions.initializeForm('orderList');
    ProductListActions.initializeForm('releaseList');
    ReleaseActions.initializeForm('productList');
    TempOrderActions.initializeForm('tempOrder');
  }

  render() {
    const { adminHeaderList, userHeaderList, role } = this.state;
    const headerList = role === 'admin' ? adminHeaderList : userHeaderList;
    const caption = role === 'admin' ? 'admin' : localStorage.getItem('branchName');

    if (!this.state.isLogin) {
      return <Redirect to="/login" push />;
    }
    return (
      // Fragments로 전환 (by seonhyungjo)
      <>
      <HeaderContainer caption={caption}>
        {/* role에 따른 다른 헤더 출력하기 */}
        <li>
          <button onClick={this.logout}>로그아웃</button>
        </li>
        {/*
            id: 리스트 아이디,
            pathName: 리스트 명,
            path: 리스트 주소,
          */}
        {headerList.map(({ id, pathName, path }) => (
          <li key={id}>
            <NavLink to={path} activeClassName="on">
              {pathName}
            </NavLink>
          </li>
        ))}
      </HeaderContainer>

      <NavTemplate
        navData={this.props.navData}
        id={this.props.id}
        clickNav={this.props.clickNav}
      />

      {/* Main영역에 있어 1개인 경우와 2개인 경우를 나눔 */}
      {!!this.props.children[0] === true && this.props.children[0].type === 'header' ? (
        <ContentTwoDivContainer>{this.props.children}</ContentTwoDivContainer>
      ) : (
          <Content>{this.props.children}</Content>
        )}
      </>
    );
  }
}

export default connect(
  state => ({
    form: state.user.getIn(['user', 'form']),
    list: state.orderList.getIn(['orderList', 'list']),
    lists: state.productList.getIn(['productList', 'lists']),
    forms: state.releaseList.getIn(['releaseList', 'form']),
    currentOrder: state.tempOrder.getIn(['tempOrder', 'currentOrder']),
  }),
  dispatch => ({
    UserActions: bindActionCreators(UserActions, dispatch),
    OrderListActions: bindActionCreators(OrderListActions, dispatch),
    ProductListActions: bindActionCreators(ProductListActions, dispatch),
    ReleaseActions: bindActionCreators(ReleaseActions, dispatch),
    TempOrderActions: bindActionCreators(TempOrderActions, dispatch),
  }),
)(PageTemplate);