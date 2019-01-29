import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as AuthActions from '../../redux/modules/auth';
import { LoginWrapper, LoginContent } from '../../component/auth';
import { LoginInputWithLabel, LoginBtn, RegisterText, AlertPopup } from '../../component/common';
import { LoginTemplate } from '../../component/template';
import { isEmpty } from 'validator';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            displayAlertPop: false,
            message: '',
            resultCode: ''
        };
    }

    async componentWillMount() {
        const { AuthActions } = this.props;
        const { history } = this.props;

        try {
            await AuthActions.initializeForm('login');
            await AuthActions.checkStatus();
            const loggedInfo = this.props.result.toJS();
            if (loggedInfo.success && loggedInfo.success === '0000' && localStorage.getItem('accessToken')) {
                history.push('/admin/product');
                return;
            } else {
                return;
            }
        } catch (error) {
            console.log(error);
            return;
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

    setMessage = (message) => {
        const { AuthActions } = this.props;
        AuthActions.setMessage({
            form: 'login',
            message
        });
        return false;
    };

    validate = {
        id: (value) => {
            if (isEmpty(value)) {
                this.setMessage('ID를 입력해주세요.');
                return false;
            }
            this.setMessage(null);
            return true;
        },
        password: (value) => {
            if (isEmpty(value)) {
                this.setMessage('비밀번호를 입력해주세요.');
                return false;
            }
            this.setMessage(null);
            return true;
        }
    };

    login = async () => {
        const { AuthActions } = this.props;
        const { id, password } = this.props.form.toJS(); // form 에서 email 과 password 값을 읽어옴
        const { validate } = this;

        if (!validate['id'](id)
            || !validate['password'](password)) {
            this.setState({ displayAlertPop: true });
            return;
        }

        await AuthActions.userLogin({
            id: id,
            password: password
        });

        const loggedInfo = this.props.result.toJS();

        if (loggedInfo.success === '0000') {
            localStorage.setItem('accessToken', loggedInfo.imhomeToken);
            this.setMessage('성공적으로 로그인 하였습니다.');
            this.setState({ displayAlertPop: true, resultCode: loggedInfo.success });
        } else {
            this.setMessage('ID나 비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
            this.setState({ displayAlertPop: true });
        }
    }

    goRegister = () => {
        const { history } = this.props;

        history.push('/register');
        return;
    }

    closeAlertPop = () => {
        const { history, AuthActions } = this.props;

        this.setState({ displayAlertPop: false });

        if (localStorage.getItem('accessToken') && this.state.resultCode === '0000') {
            history.push('/admin/product');
        } else {
            AuthActions.initializeForm('login');
        }
    }

    render() {
        const { message } = this.props;
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
                <AlertPopup title={message} clickEvent={this.closeAlertPop} buttonName='확인' displayAlertPop={this.state.displayAlertPop} />
            </LoginTemplate>
        );
    }
}

export default connect(
    (state) => ({
        form: state.auth.getIn(['login', 'form']),
        message: state.auth.getIn(['login', 'message']),
        result: state.auth.get('result')
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(AuthActions, dispatch),
    })
)(Login);