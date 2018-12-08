import React, { Component } from 'react';
import { LoginWrapper, LoginContent } from '../../component/auth';
import { LoginInputWithLabel, LoginBtn, RegisterText } from '../../component/common';
import { LoginTemplate } from '../../component/template';
class Login extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <LoginTemplate>
                <LoginWrapper>
                    <LoginContent>
                        <LoginInputWithLabel
                            label="id"
                            type="text"
                            name="custId"
                            placeholder="Username"
                            autoFocus
                        />
                        <LoginInputWithLabel
                            label="password"
                            type="text"
                            name="custPasswd"
                            placeholder="Password"
                        />
                        <LoginBtn>log in</LoginBtn>
                    </LoginContent>
                    <RegisterText>Create an Account</RegisterText>
                </LoginWrapper>
            </LoginTemplate>
        );
    }
}

export default Login;
