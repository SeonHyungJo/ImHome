import React, { Component } from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { UserMain, UserRegister } from './pages/user';
import { AdminMain, AdminUser } from './pages/admin';
import { OrderList } from './pages/orderList';
import { ReleaseList } from './pages/releaseList';
import { Product } from './pages/product';
import { Login } from './pages/common';
import * as AuthActions from './redux/modules/auth';


class App extends Component {

    initializeUserInfo = async () => {
        const loggedInfo = localStorage.getItem('accessToken'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
        if (!loggedInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.

        const { AuthActions } = this.props;

        try {
            await AuthActions.checkStatus();
            const loggedInfo = this.props.result.toJS();

            if (loggedInfo.success && loggedInfo.success !== '0000') {
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
            }
        } catch (e) {
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
        }
    }

    componentDidMount() {
        this.initializeUserInfo();
    }

    render() {
        const PATH = '/admin';
        const { store } = this.props;

        return (
            <Provider store={store}>
                <div>
                    <BrowserRouter>
                        <div>
                            {/* Admin router : 관리자 라우터*/}
                            <Route exact={true} component={AdminMain} path={PATH} />
                            <Route exact={true} component={AdminUser} path={PATH + '/users'} />
                            <Route exact={true} component={OrderList} path={PATH + '/orderlist'} />
                            <Route
                                exact={true}
                                component={ReleaseList}
                                path={PATH + '/releaselist'}
                            />
                            <Route exact={true} component={Product} path={PATH + '/product'} />
                            {/* User router : 사용자 라우터*/}
                            <Route exact={true} component={UserMain} path="/" />
                            <Route exact={true} component={UserRegister} path="/register" />
                            {/* Common router : 관리자와 사용자 공통 라우터*/}
                            <Route component={Login} path="/login" />
                        </div>
                    </BrowserRouter>
                </div>
            </Provider>
        );
    }
}

export default connect(
    (state) => ({
        result: state.user.get('result')
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(AuthActions, dispatch),
    })
)(App);
