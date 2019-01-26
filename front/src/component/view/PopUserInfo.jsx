import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PopUserWrapper, PopUserTitle, PopUserContent } from '../../component/auth/';
import { Button, InputWithLabel, AlertPopup } from '../../component/common';
import { isEmpty, isEmail } from 'validator';
import * as UserActions from '../../redux/modules/user';

class PopUserInfo extends Component {

    constructor() {
        super();
        this.state = {
            displayDeletePop: false,
            displayAlertPop: false,
            message: ''
        };
    }

    handleChange = (e) => {
        const { UserActions } = this.props;
        const { name, value } = e.target;
        this.validate[name](value);
        UserActions.changeInput({
            name,
            value,
            form: 'user',
            targetForm: 'updateForm'
        });
    };

    closeAlertPop = () => {
        this.setState({ displayAlertPop: false });
    }

    setMessage = (message) => {
        const { UserActions } = this.props;
        UserActions.setMessage({
            form: 'user',
            message
        });
        return false;
    };

    checkPhoneNumber = (value) => {
        const regExp = /^\d{2,3}\d{3,4}\d{4}$/;;
        let returnVal = false;

        !regExp.test(value) ? returnVal = false : returnVal = true;

        return returnVal;
    };

    checkMobileNumber = (value) => {
        const regExp = /^\d{3}\d{3,4}\d{4}$/;
        let returnVal = false;

        !regExp.test(value) ? returnVal = false : returnVal = true;

        return returnVal;
    };

    validate = {
        branchName: (value) => {
            if (isEmpty(value)) {
                this.setMessage('지점명은 필수 입력사항입니다.');
                return false;
            }
            this.setMessage(null);
            return true;
        },
        name: (value) => {
            if (isEmpty(value)) {
                this.setMessage('대표 성함은 필수 입력사항입니다.');
                return false;
            }
            this.setMessage(null);
            return true;
        },
        bNumber: (value) => {
            if (isEmpty(value)) {
                this.setMessage('사업자 번호는 필수 입력사항입니다.');
                return false;
            }
            this.setMessage(null);
            return true;
        },
        cName: (value) => {
            if (isEmpty(value)) {
                this.setMessage('회사명은 필수 입력사항입니다.');
                return false;
            }
            this.setMessage(null);
            return true;
        },
        bAddress: (value) => {
            if (isEmpty(value)) {
                this.setMessage('사업장 주소는 필수 입력사항입니다.');
                return false;
            }
            this.setMessage(null);
            return true;
        },
        email: (value) => {
            if (isEmpty(value)) {
                this.setMessage('이메일은 필수 입력사항입니다.');
                return false;
            }
            if (!isEmail(value)) {
                this.setMessage('이메일 형식을 확인해주세요.');
                return false;
            }
            this.setMessage(null);
            return true;
        },
        pNumber: (value) => {
            if (isEmpty(value)) {
                this.setMessage('매장 전화번호는 필수 입력사항입니다.');
                return false;
            }
            if (!this.checkPhoneNumber(value) && !this.checkMobileNumber(value)) { //매장 전화번호에 핸드폰 번호를 입력할 수도 있으므로
                this.setMessage('전화번호 형식을 확인해주세요.');
                return false;
            }
            this.setMessage(null);
            return true;
        },
        bPhoneNumber: (value) => {
            if (isEmpty(value)) {
                this.setMessage('휴대폰 번호는 필수 입력사항입니다.');
                return false;
            }
            if (!this.checkMobileNumber(value)) {
                this.setMessage('휴대폰 번호 형식을 확인해주세요.');
                return false;
            }
            this.setMessage(null);
            return true;
        },
    };

    updateData = async () => {
        const { UserActions, updateForm } = this.props;
        const { _id, branchName, name, cName, bNumber, bAddress, email, pNumber, branchCode, bPhoneNumber } = updateForm.toJS();
        const { validate } = this;

        if (!validate['branchName'](branchName)
            || !validate['name'](name)
            || !validate['cName'](cName)
            || !validate['bNumber'](bNumber)
            || !validate['bAddress'](bAddress)
            || !validate['email'](email)
            || !validate['bPhoneNumber'](bPhoneNumber)
            || !validate['pNumber'](pNumber)) {

            this.setState({ displayAlertPop: true });
            return;
        }

        try {
            await UserActions.updateUserData(_id, {
                branchName, name, cName, bNumber, bAddress, email, pNumber, bPhoneNumber
            });

            const loggedInfo = this.props.result.toJS();

            if (loggedInfo.success === '0000') {
                await UserActions.getUserData(_id);
                await UserActions.getUserList(branchCode);

                const result = this.props.result.toJS();
                await UserActions.setResultData({
                    form: 'user',
                    target: 'list',
                    result: result.user
                });

                this.setState({ displayAlertPop: true });
                this.setMessage('회원 정보가 수정되었습니다.');
                this.props.closePop();
            }

        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { handleChange } = this;
        const { message } = this.props;
        const { branchName, name, cName, bNumber, bAddress, email, pNumber, bPhoneNumber } = this.props.updateForm.toJS();
        return (
            <div>
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
                            name="bPhoneNumber"
                            placeholder="휴대폰 번호"
                            onChange={handleChange}
                            value={bPhoneNumber ? bPhoneNumber : ''}
                        />
                        <InputWithLabel label="매장 전화번호"
                            type="text"
                            name="pNumber"
                            placeholder="매장 전화번호"
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
                <AlertPopup title={message} clickEvent={this.closeAlertPop} buttonName='확인' displayAlertPop={this.state.displayAlertPop} />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        updateForm: state.user.getIn(['user', 'updateForm']),
        list: state.user.getIn(['user', 'list']),
        store: state.user.getIn(['user', 'store']),
        message: state.user.getIn(['user', 'message']),
        result: state.user.get('result')
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(UserActions, dispatch),
    })
)(PopUserInfo);