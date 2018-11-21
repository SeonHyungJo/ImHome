import React, { Component } from 'react';
import HeaderContainer from '../header/HeaderContainer';
import { NavLink } from 'react-router-dom';
import { NavTemplate } from '../nav';
import Content from '../content/ContentContainer';
import ContentTwoDivContainer from '../content/ContentTwoDivContainer';

class PageTemplate extends Component {
    render() {
        return (
            <div>
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
                        <NavLink to="/admin/product" activeClassName="on">
                            품목관리
                        </NavLink>
                    </li>
                </HeaderContainer>
                <NavTemplate navData={this.props.navData} storeId={this.props.storeId} />
                {!!this.props.children[0] === true && this.props.children[0].type === 'header' ? (
                    <ContentTwoDivContainer>{this.props.children}</ContentTwoDivContainer>
                ) : (
                    <Content>{this.props.children}</Content>
                )}
            </div>
        );
    }
}

export default PageTemplate;
