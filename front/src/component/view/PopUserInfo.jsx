import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PopUserWrapper, PopUserTitle, PopUserContent } from '../../component/auth/';
import { Button, InputWithLabel } from '../../component/common';
import * as UserActions from '../../redux/modules/user';

class PopUserInfo extends Component {

    handleChange = (e) => {
        const { UserActions } = this.props;
        const { name, value } = e.target;
        // this.setError(null);
        UserActions.changeInput({
            name,
            value,
            form: 'user',
            targetForm: 'updateForm'
        });
    };

    updateData = async () => {
        const { UserActions, updateForm } = this.props;
        const { _id, branchName, name, cName, bNumber, bAddress, email, pNumber } = updateForm.toJS();

        try {
            await UserActions.updateUserData(_id, {
                branchName, name, cName, bNumber, bAddress, email, pNumber
            });

            const loggedInfo = this.props.result.toJS();

            if (loggedInfo.success === '0000') {
                UserActions.getUserData(_id);
                alert('회원 정보가 수정되었습니다.');
                this.props.closePop();
            }

        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { handleChange } = this;
        const { branchName, name, cName, bNumber, bAddress, email, pNumber } = this.props.updateForm.toJS();
        return (
            <PopUserWrapper style={{ display: this.props.displayPop ? 'block' : 'none' }}>
                <PopUserTitle title="회원정보수정">
                    회원 및 가입정보를 입력하세요.
                    </PopUserTitle>
                <PopUserContent>
                    <InputWithLabel label="대표 성함"
                        type="text"
                        name="name"
                        placeholder="대표 성함"
                        value={name ? name : ''}
                        onChange={handleChange}
                        autoFocus />
                    <InputWithLabel label="사업자 번호"
                        type="text"
                        name="bNumber"
                        placeholder="사업자 번호"
                        onChange={handleChange}
                        value={bNumber ? bNumber : ''}
                    />
                    <InputWithLabel label="사업장 주소"
                        type="text"
                        name="bAddress"
                        placeholder="사업장 주소"
                        onChange={handleChange}
                        value={bAddress ? bAddress : ''}
                    />
                    <InputWithLabel label="회사명"
                        type="text"
                        name="cName"
                        placeholder="사업자 등록증 상의 회사명"
                        onChange={handleChange}
                        value={cName ? cName : ''}
                    />
                    <InputWithLabel label="이메일 주소"
                        type="text"
                        name="email"
                        placeholder="세금계산서 받으실 수 있는 이메일 주소"
                        onChange={handleChange}
                        value={email ? email : ''}
                    />
                    <InputWithLabel label="휴대폰 번호"
                        type="text"
                        name="pNumber"
                        placeholder="휴대폰 번호"
                        onChange={handleChange}
                        value={pNumber ? pNumber : ''}
                    />
                    <InputWithLabel label="지점명"
                        type="text"
                        name="branchName"
                        placeholder="지점명"
                        onChange={handleChange}
                        value={branchName ? branchName : ''}
                    />
                </PopUserContent>
                <Button style={{ marginRight: '1rem', width: '6rem' }} onClick={this.updateData}>수정하기</Button>
                <Button style={{ width: '6rem' }} onClick={this.props.closePop}>닫기</Button>
            </PopUserWrapper>
        );
    }
}

export default connect(
    (state) => ({
        updateForm: state.user.getIn(['user', 'updateForm']),
        list: state.user.getIn(['user', 'list']),
        store: state.user.getIn(['user', 'store']),
        error: state.user.getIn(['user', 'error']),
        result: state.user.get('result')
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(UserActions, dispatch),
    })
)(PopUserInfo);