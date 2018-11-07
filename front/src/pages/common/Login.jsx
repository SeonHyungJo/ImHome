import React, { Component } from 'react';
import { LoginWrapper } from '../../component/auth'
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

                </LoginWrapper>
            </LoginTemplate>

        );
    }
}

export default Login;