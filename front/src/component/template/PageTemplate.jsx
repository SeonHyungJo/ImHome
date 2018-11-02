import React, { Component } from 'react';
import Header from '../header/HeaderContainer';
import Nav from '../nav/NavContainer';
import { NavLink } from 'react-router-dom';


class PageTemplate extends Component {

    render() {
        return (
            <div>
                <Header>
                    <li><NavLink to="/register" activeClassName="on">로그아웃</NavLink></li>
                    <li><NavLink to="/admin/users" activeClassName="on">회원정보</NavLink></li>
                    <li><NavLink to="#">출고내역조회</NavLink></li>
                    <li><NavLink to="#">주문내역조회</NavLink></li>
                    <li><NavLink to="#">품목관리</NavLink></li>
                </Header>
                <Nav />
                {this.props.children}
                
            </div>
        );
    }
}

export default PageTemplate;