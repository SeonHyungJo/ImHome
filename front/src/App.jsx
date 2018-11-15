import React, { Component } from 'react'
import './App.scss'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom'
import { UserMain, UserRegister } from './pages/user'
import { AdminMain, AdminUser } from './pages/admin'
import { OrderList } from './pages/orderList'
import HeaderContainer from './component/header/HeaderContainer'
import { Login } from './pages/common'

class App extends Component {
    render() {
        const PATH = '/admin'
        const { store } = this.props

        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        {/* Admin router : 관리자 라우터*/}
                        <Route path={PATH} render={() => <TestMainComponent path={PATH} />} />
                        {/* User router : 사용자 라우터*/}
                        <Route exact={true} component={UserMain} path="/" />
                        <Route component={UserRegister} path="/register" />
                        {/* Common router : 관리자와 사용자 공통 라우터*/}
                        <Route component={Login} path="/login" />
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}

class TestMainComponent extends Component {
    render() {
        return (
            <>
                <HeaderContainer>
                    <li>
                        <NavLink to="/register" activeClassName="on">
                            로그아웃
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/users" activeClassName="on">
                            회원정보
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="#">출고내역조회</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/orderlist" activeClassName="on">
                            주문내역조회
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="#">품목관리</NavLink>
                    </li>
                </HeaderContainer>

                <div>
                    <Switch>
                        {/* Admin router : 관리자 라우터*/}
                        <Route
                            exact={true}
                            render={() => <div>Welcome Admin Main</div>}
                            path={'/admin'}
                        />
                        <Route exact={true} component={AdminUser} path={'/admin/users'} />
                        <Route exact={true} component={OrderList} path={'/admin/orderlist'} />
                    </Switch>
                </div>
            </>
        )
    }
}

export default App
