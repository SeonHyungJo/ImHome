import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PopUserWrapper, PopUserTitle, PopUserContent } from '../../component/auth/';
import { Button, InputWithLabel } from '../../component/common';
import * as UserActions from '../../redux/modules/user';

class PopUserInfo extends Component {
    render() {
        const { branchName, name, cName, bNumber, bAddress, email, pNumber } = this.props.form.toJS();

        return (
            <PopUserWrapper style={{ display: this.props.displayPop ? 'block' : 'none' }}>
                <PopUserTitle title="회원정보수정">
                    회원 및 가입정보를 입력하세요.
                    </PopUserTitle>
                <PopUserContent>
                    <InputWithLabel label="대표 성함"
                        type="text"
                        name="custName"
                        placeholder="대표 성함"
                        value={name}
                        autoFocus />
                    <InputWithLabel label="사업자 번호"
                        type="text"
                        name="custNumber"
                        placeholder="사업자 번호"
                        value={bNumber}
                    />
                    <InputWithLabel label="사업장 주소"
                        type="text"
                        name="custAddress"
                        placeholder="사업장 주소"
                        value={bAddress}
                    />
                    <InputWithLabel label="회사명"
                        type="text"
                        name="companyName"
                        placeholder="사업자 등록증 상의 회사명"
                        value={cName}
                    />
                    <InputWithLabel label="이메일 주소"
                        type="text"
                        name="custEmail"
                        placeholder="세금계산서 받으실 수 있는 이메일 주소"
                        value={email}
                    />
                    <InputWithLabel label="휴대폰 번호"
                        type="text"
                        name="custPhoneNumber"
                        placeholder="휴대폰 번호"
                        value={pNumber}
                    />
                    <InputWithLabel label="지점명"
                        type="text"
                        name="storName"
                        placeholder="지점명"
                        value={branchName}
                    />
                </PopUserContent>
                <Button style={{ marginRight: '1rem', width: '6rem' }}>수정하기</Button>
                <Button style={{ width: '6rem' }} onClick={this.props.closePop}>닫기</Button>
            </PopUserWrapper>
        );
    }
}

export default connect(
    (state) => ({
        form: state.user.getIn(['user', 'form']),
        list: state.user.getIn(['user', 'list']),
        store: state.user.getIn(['user', 'store']),
        error: state.user.getIn(['user', 'error']),
        result: state.user.get('result')
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(UserActions, dispatch),
    })
)(PopUserInfo);