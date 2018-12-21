import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, ConfirmPopup } from '../../component/common';
import * as UserActions from '../../redux/modules/user';

class PopDeleteConfirm extends Component {

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
                alert('회원 정보가 삭제되었습니다.');
            } else {
                alert('삭제 실패');
            }

            this.props.closeDeletePop();
        } catch (e) {
            alert('삭제 실패');
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

    render() {
        return (
            <ConfirmPopup style={{ display: this.props.displayDeletePop ? 'block' : 'none' }} title="회원 목록에서 삭제하시겠습니까?" subTitle="삭제가 되면 복구되지 않습니다.">
                <Button style={{ marginRight: '1rem', width: '6rem', color: 'white', backgroundColor: '#fe4c8d' }} onClick={this.props.closeDeletePop}>취소</Button>
                <Button style={{ width: '6rem', color: 'white', backgroundColor: '#fe4c8d' }} onClick={this.deleteData}>삭제</Button>
            </ConfirmPopup>
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