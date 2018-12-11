import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as AuthActions from '../../redux/modules/auth';
import { LoginWrapper, LoginContent } from '../../component/auth';
import { LoginInputWithLabel, LoginBtn, RegisterText } from '../../component/common';
import { LoginTemplate } from '../../component/template';

class Login extends Component {
    constructor() {
        super();
        this.state = {};
    }

    login = async () => {
        const { AuthActions } = this.props;
        const { id, password } = this.props.form.toJS(); // form 에서 email 과 password 값을 읽어옴
        const { history } = this.props;

        await AuthActions.userLogin({
            id: id,
            password: password
        });

        const loggedInfo = this.props.result.toJS();
        console.log(loggedInfo);
        if (loggedInfo.success === '0000') {
            alert('성공적으로 로그인 하였습니다');
            localStorage.setItem('accessToken', loggedInfo.imhomeToken);
            history.push('/admin/product');
        } else {
            alert('로그인 실패')
        }
    }

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form: 'login'
        });
    };


    render() {
        const { id, password } = this.props.form.toJS(); // form 에서 email 과 password 값을 읽어옴

        return (
            <LoginTemplate>
                <LoginWrapper>
                    <LoginContent>
                        <LoginInputWithLabel
                            label="id"
                            type="text"
                            name="id"
                            placeholder="Username"
                            value={id}
                            onChange={this.handleChange}
                            autoFocus
                        />
                        <LoginInputWithLabel
                            label="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={this.handleChange}
                        />
                        <LoginBtn onClick={this.login}>log in</LoginBtn>
                    </LoginContent>
                    <RegisterText>Create an Account</RegisterText>
                </LoginWrapper>
            </LoginTemplate>
        );
    }
}

export default connect(
    (state) => ({
        form: state.auth.getIn(['login', 'form']),
        error: state.auth.getIn(['login', 'error']),
        result: state.auth.get('result')
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(AuthActions, dispatch),
    })
)(Login);