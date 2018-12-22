import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, ConfirmPopup, AlertPopup } from '../../component/common';
import * as UserActions from '../../redux/modules/user';

class PopDeleteConfirm extends Component {

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

    deleteData = async () => {
        const { UserActions, form } = this.props;
        const { _id, branchCode } = form.toJS();

        console.log(form);

        try {
            await UserActions.deleteUserData(_id);

            const loggedInfo = this.props.result.toJS();

            if (loggedInfo.success === '0000') {
                this.props.getNavData(branchCode);
                this.setState({ displayAlertPop: true, message: '회원 정보가 성공적으로 삭제되었습니다.' });
            } else {
                this.setState({ displayAlertPop: true, message: '회원 정보 삭제가 실패했습니다. 다시 시도해주세요.' });
            }

            this.props.closeDeletePop();
        } catch (e) {
            this.setState({ displayAlertPop: true, message: '회원 정보 삭제가 실패했습니다. 다시 시도해주세요.' });
            this.props.closeDeletePop();
            console.log(e);
        }
    }

    setError = (message) => {
        const { UserActions } = this.props;
        UserActions.setError({
            form: 'user',
            message
        });
        return false;
    };

    closeAlertPop = () => {
        this.setState({ displayAlertPop: false });
    }

    render() {
        return (
            <div>
                <ConfirmPopup style={{ display: this.props.displayDeletePop ? 'block' : 'none' }} title="회원 목록에서 삭제하시겠습니까?" subTitle="삭제가 되면 복구되지 않습니다.">
                    <Button style={{ marginRight: '1rem', width: '6rem', color: 'white', backgroundColor: '#fe4c8d' }} onClick={this.props.closeDeletePop}>취소</Button>
                    <Button style={{ width: '6rem', color: 'white', backgroundColor: '#fe4c8d' }} onClick={this.deleteData}>삭제</Button>
                </ConfirmPopup>
                <AlertPopup title={this.state.message} clickEvent={this.closeAlertPop} buttonName='확인' displayAlertPop={this.state.displayAlertPop} />
            </div>
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
)(PopDeleteConfirm);