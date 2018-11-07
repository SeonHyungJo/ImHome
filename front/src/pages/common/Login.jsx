import React, { Component } from 'react';
import { LoginWrapper, LoginContent } from '../../component/auth'
import { InputWithLabel, Button } from '../../component/common'
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
                        <InputWithLabel label="아이디"
                            type="text"
                            name="custId"
                            placeholder="Username"
                            autoFocus />
                        <InputWithLabel label="비밀번호"
                            type="text"
                            name="custPasswd"
                            placeholder="Password" />
                        <Button>log in</Button>
                    </LoginContent>
                    <Button>Create an Account</Button>
                </LoginWrapper>
            </LoginTemplate>

        );
    }
}

export default Login;