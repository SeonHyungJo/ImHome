import React, { PureComponent } from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { UserRegister, UserMain } from './pages/user';
import {
    AdminMain,
    AdminUser,
    AdminOrderList,
    AdminReleaseList,
    AdminProduct
} from './pages/admin';
import { Login } from './pages/common';
import * as AuthActions from './redux/modules/auth';

class App extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            admin: false
        }
    }
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
            return;
            //history.push('/login');
        }
    };

    componentDidUpdate(prevProps) {
        const result = this.props.result.toJS();

        result.checkAdmin || (result.info && result.info.admin) ? this.setState({ admin: true }) : this.setState({ admin: false });
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
                            {
                                this.state.admin ? (
                                    <div>
                                        <Route exact={true} component={AdminMain} path={PATH} />
                                        <Route exact={true} component={AdminUser} path={PATH + '/users'} />
                                        <Route exact={true} component={AdminOrderList} path={PATH + '/orderlist'} />
                                        <Route exact={true} component={AdminReleaseList} path={PATH + '/releaselist'} />
                                        <Route exact={true} component={AdminProduct} path={PATH + '/product'} />
                                    </div>
                                ) :
                                    (
                                        <div>
                                            {/* User router : 사용자 라우터*/}
                                            <Route exact={true} component={UserMain} path="/usermain" />
                                            <Route exact={true} component={UserRegister} path="/register" />
                                        </div>
                                    )
                            }
                            {/* Common router : 관리자와 사용자 공통 라우터*/}
                            <Route component={Login} path="/login" />
                            <Route exact={true} component={Login} path="/" />
                        </div>
                    </BrowserRouter>
                </div>
            </Provider>
        );
    }
}

export default connect(
    state => ({
        result: state.auth.get('result')
    }),
    dispatch => ({
        AuthActions: bindActionCreators(AuthActions, dispatch)
    })
)(App);
