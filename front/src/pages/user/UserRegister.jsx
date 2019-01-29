import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty, isEmail, isLength } from 'validator';

import * as AuthActions from '../../redux/modules/auth';
import { RegisterTemplate } from '../../component/template';
import { RegisterWrapper, RegisterTitle, RegisterContent } from '../../component/auth/';
import { Button, InputWithLabel, AlertPopup, SelectboxWithLabel } from '../../component/common';

class UserRegister extends Component {
    constructor() {
        super();
        this.state = {
            displayAlertPop: false,
            displaySuccessAlertPop: false
        };
    }

    async componentDidMount() {
        const { AuthActions } = this.props;
        const { history } = this.props;

        await AuthActions.getStoreList();

        try {
            await AuthActions.checkStatus();
            const loggedInfo = this.props.result.toJS();

            if (loggedInfo.success && loggedInfo.success === '0000' && localStorage.getItem('accessToken')) {
                if (localStorage.getItem('checkAdmin') === 'true' || localStorage.getItem('checkAdmin') === true) {
                    history.push('/admin/product');
                    return;
                }

                history.push('/usermain');
                return;
            }
        } catch (error) {
            console.log(error);
            return;
        }
    }

    componentWillUnmount() {
        const { AuthActions } = this.props;
        AuthActions.initializeForm('register');
    }
    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;
        this.validate[name](value);
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

    closeAlertPop = () => {
        this.setState({ displayAlertPop: false });
    }

    closeSuccessAlertPop = () => {
        const { history } = this.props;

        this.setState({ displaySuccessAlertPop: false });
        history.push('login');
    }

    setMessage = (message) => {
        const { AuthActions } = this.props;
        AuthActions.setMessage({
            form: 'register',
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

    isValidPwd(pwd) {
        let regx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,55}$/;
        return regx.test(pwd);// 유효하면 true
    }

    validate = {
        id: (value) => {
            if (isEmpty(value)) {
                this.setMessage('ID는 필수 입력사항입니다.');
                return false;
            }
            this.setMessage(null);
            return true;
        },
        password: (value) => {
            if (isEmpty(value)) {
                this.setMessage('비밀번호는 필수 입력사항입니다.');
                return false;
            }
            if (!isLength(value, { min: 8 })) {
                this.setMessage('비밀번호는 최소 8자 이상이어야합니다.');
                return false;
            }
            if (!this.isValidPwd(value)) {
                this.setMessage('비밀번호는 영문, 숫자, 특수문자가 포함되어야합니다.');
                return false;
            }
            if (this.props.form.get('passwordConfirm') !== value) {
                this.setMessage('비밀번호가 일치하지 않습니다.');
                return false;
            }
            this.setMessage(null);
            return true;
        },
        passwordConfirm: (value) => {
            if (isEmpty(value)) {
                this.setMessage('비밀번호 확인은 필수 입력사항입니다.');
                return false;
            }
            if (!this.isValidPwd(value)) {
                this.setMessage('비밀번호는 영문, 숫자, 특수문자가 포함되어야합니다.');
                return false;
            }
            if (this.props.form.get('password') !== value) {
                this.setMessage('비밀번호가 일치하지 않습니다.');
                return false;
            }
            this.setMessage(null);
            return true;
        },
        branchCode: (value) => {
            if (!value) {
                this.setMessage('지점명을 선택해주세요.');
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

    goRegister = async () => {
        const { AuthActions } = this.props;
        const { id, password, passwordConfirm, name, bNumber, bAddress, cName, email, bPhoneNumber, branchCode } = this.props.form.toJS();
        const { validate } = this;

        if (!validate['id'](id)
            || !validate['password'](password)
            || !validate['passwordConfirm'](passwordConfirm)
            || !validate['name'](name)
            || !validate['bNumber'](bNumber)
            || !validate['bAddress'](bAddress)
            || !validate['cName'](cName)
            || !validate['email'](email)
            || !validate['bPhoneNumber'](bPhoneNumber)
            || !validate['branchCode'](branchCode)) {

            this.setState({ displayAlertPop: true });
            return;
        }

        try {
            await AuthActions.userRegister({
                id, password, passwordConfirm, name, bNumber, bAddress, cName, email, bPhoneNumber, branchCode,
            });

            const loggedInfo = this.props.result.toJS();

            if (loggedInfo.success === '0000') {
                this.setMessage('회원가입에 성공했습니다');
                this.setState({ displaySuccessAlertPop: true });
                return;
                //this.closeAlertPop();
            } else if (loggedInfo.fail === '0003') {
                this.setMessage('이미 존재하는 ID 입니다.');
            } else {
                this.setMessage('회원가입에 실패했습니다. 나중에 다시 시도해주세요.');
            }

            this.setState({ displayAlertPop: true });
        } catch (e) {
            console.log(e);
            this.setMessage('회원가입에 실패했습니다. 나중에 다시 시도해주세요.');
            this.setState({ displayAlertPop: true });
        }
    }

    render() {
        const { id, password, passwordConfirm, name, bNumber, bAddress, cName, email, bPhoneNumber, branchCode } = this.props.form.toJS();
        const { store } = this.props;
        const { message } = this.props;
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
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                            placeholder="비밀번호(8자 이상)" />
                        <InputWithLabel label="비밀번호 재확인"
                            type="password"
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
                        <SelectboxWithLabel label="지점명" name="branchCode"
                            value={branchCode} onChange={this.handleChange}>
                            <option value="">- 선택하세요 -</option>
                            {
                                store.length > 0 && store.map((item, index) => {
                                    return <option key={index} value={item.branchCode}>{item.branchName}</option>;
                                })
                            }
                        </SelectboxWithLabel>
                        {/* <InputWithLabel label="지점명"
                            type="text"
                            name="branchName"
                            value={branchName}
                            onChange={this.handleChange}
                            placeholder="지점명"
                        /> */}
                    </RegisterContent>
                    <Button style={{ marginRight: '10px' }} onClick={this.goLogin}>취소</Button>
                    <Button onClick={this.goRegister}>가입하기</Button>
                </RegisterWrapper>
                <AlertPopup title={message} clickEvent={this.closeAlertPop} buttonName='확인' displayAlertPop={this.state.displayAlertPop} />
                <AlertPopup title={message} clickEvent={this.closeSuccessAlertPop} buttonName='확인' displayAlertPop={this.state.displaySuccessAlertPop} />
            </RegisterTemplate>
        );
    }
}

export default connect(
    (state) => ({
        form: state.auth.getIn(['register', 'form']),
        message: state.auth.getIn(['register', 'message']),
        result: state.auth.get('result'),
        store: state.auth.getIn(['register', 'store']),
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(AuthActions, dispatch),
    })
)(UserRegister);