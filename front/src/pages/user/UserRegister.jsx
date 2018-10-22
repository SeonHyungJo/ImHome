import React, { Component } from 'react';
import { RegisterTemplate } from '../../component/template';
import { RegisterWrapper } from '../../component/auth/';

class UserRegister extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <RegisterTemplate>
                <RegisterWrapper>
                    <span style={{color: 'black'}}>Register</span>
                </RegisterWrapper>
            </RegisterTemplate>
        );
    }
}

export default UserRegister;