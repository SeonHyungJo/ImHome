import React, { Component } from 'react';
import { RegisterTemplate } from '../../component/template';
import { RegisterWrapper, Button, InputWithLabel } from '../../component/auth/';

class UserRegister extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <RegisterTemplate>
                <RegisterWrapper>
                    <InputWithLabel label="사용하실 아이디"
                            type="text"
                            name="custId"
                            autoFocus />
                    <Button>가입하기</Button>        
                </RegisterWrapper>
            </RegisterTemplate>
        );
    }
}

export default UserRegister;