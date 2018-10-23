import React, { Component } from 'react';
import { RegisterTemplate } from '../../component/template';
import { RegisterWrapper, RegisterTitle, RegisterContent, Button, InputWithLabel } from '../../component/auth/';

class UserRegister extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <RegisterTemplate>
                <RegisterWrapper>
                    <RegisterTitle title="가입 정보 입력">
                        로그인 정보 및 가입 정보를 입력하세요.
                    </RegisterTitle>
                    <RegisterContent>
                        <InputWithLabel label="사용하실 아이디"
                            type="text"
                            name="custId"
                            placeholder="아이디"
                            autoFocus />
                        <InputWithLabel label="비밀번호"
                            type="text"
                            name="custPasswd" 
                            placeholder="비밀번호(8자 이상)" />
                        <InputWithLabel label="비밀번호 재확인"
                            type="text"
                            name="custPasswdConfirm"
                            placeholder="비밀번호 재확인" />
                    </RegisterContent>
                    <RegisterContent>
                        <InputWithLabel label="대표 성함"
                            type="text"
                            name="custName"
                            placeholder="대표 성함"
                            autoFocus />
                        <InputWithLabel label="사업자 번호"
                            type="text"
                            name="custNumber"
                            placeholder="사업자 번호"
                            autoFocus />
                        <InputWithLabel label="사업장 주소"
                            type="text"
                            name="custAddress"
                            placeholder="사업장 주소"
                            autoFocus />
                        <InputWithLabel label="회사명"
                            type="text"
                            name="companyName"
                            placeholder="사업자 등록증 상의 회사명"
                            autoFocus />
                        <InputWithLabel label="이메일 주소"
                            type="text"
                            name="custEmail"
                            placeholder="세금계산서 받으실 수 있는 이메일 주소"
                            autoFocus />
                        <InputWithLabel label="휴대폰 번호"
                            type="text"
                            name="custPhoneNumber"
                            placeholder="휴대폰 번호"
                            autoFocus />
                        <InputWithLabel label="지점명"
                            type="text"
                            name="storName"
                            placeholder="지점명"
                            autoFocus />
                    </RegisterContent>
                    <Button>가입하기</Button>
                </RegisterWrapper>
            </RegisterTemplate>
        );
    }
}

export default UserRegister;