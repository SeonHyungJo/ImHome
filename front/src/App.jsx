import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    UserRegister, UserOrderList, UserProduct, UserReleaseList,
} from './pages/user';
import {
    AdminUser,
    AdminOrderList,
    AdminReleaseList,
    AdminProduct,
} from './pages/admin';
import { Login } from './pages/common';
import * as AuthActions from './redux/modules/auth';

import './App.scss';

class App extends PureComponent {
    // transform-class-properties 적용
    state = {
        admin: null,
        routeList: null,
    };

    initializeUserInfo = async () => {
        const { history } = this.props;
        const loggedInfo = localStorage.getItem('accessToken'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
        if (!loggedInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.

        const { AuthActions } = this.props;

        try {
            await AuthActions.checkStatus();
            const loggedInfo = this.props.result.toJS();

            if (loggedInfo.success && loggedInfo.success === false) {
                localStorage.removeItem('accessToken');
                history.push('/login');
            }
        } catch (e) {
            localStorage.removeItem('accessToken');
            console.log(e);

            // history.push('/login');
        }
    };

    componentDidUpdate(prevProps) {
        const result = this.props.result.toJS();

        result.checkAdmin || (result.info && result.info.admin)
            ? this.setState({ admin: true })
            : this.setState({ admin: false });
    }

    componentDidMount() {
        this.initializeUserInfo();
    }

    render() {
        const ADMIN_PATH = '/admin';
        const { store } = this.props;

        return (
            <Provider store={store}>
                <BrowserRouter>
                    <>
                        {
                            this.state.admin !== null ?
                                this.state.admin ? (
                                    <>
                                        {/* Admin router : 관리자 라우터 */}
                                        <Route exact component={AdminUser} path={`${ADMIN_PATH}/users`} />
                                        <Route exact component={AdminOrderList} path={`${ADMIN_PATH}/orderlist`} />
                                        <Route exact component={AdminReleaseList} path={`${ADMIN_PATH}/releaselist`} />
                                        <Route exact component={AdminProduct} path={`${ADMIN_PATH}/product`} />
                                    </>
                                ) : (
                                        <>
                                            {/* User router : 사용자 라우터 */}
                                            <Route exact component={UserProduct} path="/product" />
                                            <Route exact component={UserOrderList} path="/orderlist" />
                                            <Route exact component={UserReleaseList} path="/releaselist" />
                                        </>
                                    ) : null
                        }
                        {/* Common router : 관리자와 사용자 공통 라우터 */}
                        <Route exact component={UserRegister} path="/register" />
                        <Route component={Login} path="/login" />
                        <Route exact component={Login} path="/" />
                    </>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default connect(
    state => ({
        result: state.auth.get('result'),
    }),
    dispatch => ({
        AuthActions: bindActionCreators(AuthActions, dispatch),
    }),
)(App);
