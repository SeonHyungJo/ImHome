import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as AuthActions from '../../redux/modules/auth';
import { LoginWrapper, LoginContent } from '../../component/auth';
import { LoginInputWithLabel, LoginBtn, RegisterText, AlertPopup } from '../../component/common';
import { LoginTemplate } from '../../component/template';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            displayAlertPop: false,
            message: ''
        };
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

    login = async () => {
        const { AuthActions } = this.props;
        const { id, password } = this.props.form.toJS(); // form 에서 email 과 password 값을 읽어옴

        await AuthActions.userLogin({
            id: id,
            password: password
        });

        const loggedInfo = this.props.result.toJS();

        localStorage.setItem('accessToken', loggedInfo.imhomeToken);

        if (loggedInfo.success === '0000') {
            this.setState({ displayAlertPop: true, message: '성공적으로 로그인 하였습니다.' });
        } else {
            this.setState({ displayAlertPop: true, message: '로그인에 실패하였습니다. 다시 시도해주세요.' });
        }
    }

    goRegister = () => {
        const { history } = this.props;

        history.push('/register');
        return;
    }

    closeAlertPop = () => {
        const { history } = this.props;

        this.setState({ displayAlertPop: false });
        history.push('/admin/product');
    }

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
                    <RegisterText onClick={this.goRegister}>Create an Account</RegisterText>
                </LoginWrapper>
                <AlertPopup title={this.state.message} clickEvent={this.closeAlertPop} buttonName='확인' displayAlertPop={this.state.displayAlertPop} />
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