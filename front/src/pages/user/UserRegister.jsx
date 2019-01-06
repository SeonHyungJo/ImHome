import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as AuthActions from '../../redux/modules/auth';
import { RegisterTemplate } from '../../component/template';
import { RegisterWrapper, RegisterTitle, RegisterContent } from '../../component/auth/';
import { Button, InputWithLabel } from '../../component/common';

class UserRegister extends Component {
    constructor() {
        super();
        this.state = {};
    }

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form: 'register'
        });
    };

    goLogin = () => {
        const { history } = this.props;

        history.push('login');
    }

    goResiter = () => {

    }

    render() {
        const { id, password, passwordConfirm, name, bNumber, bAddress, cName, email, bPhoneNumber, branchName } = this.props.form.toJS();

        return (
            <RegisterTemplate>
                <RegisterWrapper>
                    <RegisterTitle title="가입 정보 입력">
                        로그인 정보 및 가입 정보를 입력하세요.
                    </RegisterTitle>
                    <RegisterContent>
                        <InputWithLabel label="사용하실 아이디"
                            type="text"
                            name="id"
                            value={id}
                            onChange={this.handleChange}
                            placeholder="아이디"
                            autoFocus />
                        <InputWithLabel label="비밀번호"
                            type="text"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                            placeholder="비밀번호(8자 이상)" />
                        <InputWithLabel label="비밀번호 재확인"
                            type="text"
                            name="passwordConfirm"
                            value={passwordConfirm}
                            onChange={this.handleChange}
                            placeholder="비밀번호 재확인" />
                    </RegisterContent>
                    <RegisterContent>
                        <InputWithLabel label="대표 성함"
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                            placeholder="대표 성함"
                        />
                        <InputWithLabel label="사업자 번호"
                            type="text"
                            name="bNumber"
                            value={bNumber}
                            onChange={this.handleChange}
                            placeholder="사업자 번호"
                        />
                        <InputWithLabel label="사업장 주소"
                            type="text"
                            name="bAddress"
                            value={bAddress}
                            onChange={this.handleChange}
                            placeholder="사업장 주소"
                        />
                        <InputWithLabel label="회사명"
                            type="text"
                            name="cName"
                            value={cName}
                            onChange={this.handleChange}
                            placeholder="사업자 등록증 상의 회사명"
                        />
                        <InputWithLabel label="이메일 주소"
                            type="text"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            placeholder="세금계산서 받으실 수 있는 이메일 주소"
                        />
                        <InputWithLabel label="휴대폰 번호"
                            type="text"
                            name="bPhoneNumber"
                            value={bPhoneNumber}
                            onChange={this.handleChange}
                            placeholder="휴대폰 번호"
                        />
                        <InputWithLabel label="지점명"
                            type="text"
                            name="branchName"
                            value={branchName}
                            onChange={this.handleChange}
                            placeholder="지점명"
                        />
                    </RegisterContent>
                    <Button style={{ marginRight: '10px' }} onClick={this.goLogin}>취소</Button>
                    <Button onClick={this.register}>가입하기</Button>
                </RegisterWrapper>
            </RegisterTemplate>
        );
    }
}

export default connect(
    (state) => ({
        form: state.auth.getIn(['register', 'form']),
        message: state.auth.getIn(['register', 'message']),
        result: state.auth.get('result')
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(AuthActions, dispatch),
    })
)(UserRegister);