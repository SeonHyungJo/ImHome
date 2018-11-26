import React, { Component } from 'react';
import { LoginWrapper, LoginContent } from '../../component/auth';
import { InputWithLabel, LoginBtn, RegisterText } from '../../component/common';
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
                        <InputWithLabel
                            label="id"
                            type="text"
                            name="custId"
                            placeholder="Username"
                            autoFocus
                        />
                        <InputWithLabel
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
