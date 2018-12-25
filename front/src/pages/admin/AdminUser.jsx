import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PageTemplate } from '../../component/template';
import { TableWithScroll } from '../../component/table';
import { ViewForUser, PopUserInfo, PopDeleteConfirm } from '../../component/view';
import { TableBtn, FormBtn } from '../../component/common';
import * as UserActions from '../../redux/modules/user';
import * as CommonUtil from '../../util/commonUtil';
//import ConfirmPopup from '../../component/common/ConfirmPopup';

class AdminUser extends Component {
    constructor() {
        super();
        const headerData = [
            {
                id: "createdAt", numeric: false, disablePadding: true, label: '등록일자', formatter: function (data) {
                    return CommonUtil.setTotalDate(data);
                }
            },
            { id: "branchName", numeric: false, disablePadding: true, label: '지점명' },
            { id: "name", numeric: false, disablePadding: true, label: '대표자' },
            { id: "id", numeric: false, disablePadding: true, label: '아이디' },
            { id: "bNumber", numeric: false, disablePadding: true, label: '사업자번호' },
            { id: "__v", numeric: true, disablePadding: true, label: '총 거래금액(원)' }
        ];
        this.state = {
            storeId: 1,
            custNo: 1,
            headerData: headerData,
            displayPop: false,
            displayDeletePop: false
        };
    }

    async componentDidMount() {
        const { UserActions } = this.props;

        await UserActions.getStoreList();
        await UserActions.getFirstList();
        await this.getNavData();
    };

    componentWillUnmount() {
        const { UserActions } = this.props;
        UserActions.initializeForm('user');
    }

    //최초 로드시 매장 정보를 가져와 redux form에 store 정보 저장
    // getStoreList = async () => {
    //     const { UserActions, store } = this.props;
    //     try {
    //         if (store) {
    //             await UserActions.changeInput({
    //                 form: 'user',
    //                 value: store[0].branchCode,
    //                 name: 'branchCode'
    //             });
    //         }

    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    getNavData = async (id) => {
        const { UserActions, firstList } = this.props;

        let storeId = id ? id : firstList.storeId;
        try {
            await UserActions.getUserList(storeId);
            const loggedInfo = this.props.result.toJS();
            let custNo = loggedInfo.firstUser ? loggedInfo.firstUser._id : '0'

            UserActions.setResultData({
                form: 'user',
                target: 'currentStoreId',
                result: storeId
            });
            UserActions.setResultData({
                form: 'user',
                target: 'currentCustNo',
                result: custNo
            });
            UserActions.setResultData({
                form: 'user',
                target: 'list',
                result: loggedInfo.user
            });
            UserActions.setResultData({
                form: 'user',
                target: 'currentStoreId',
                result: storeId
            });
            UserActions.setFormData({
                form: 'form',
                result: loggedInfo.firstUser
            });
            UserActions.setFormData({
                form: 'updateForm',
                result: loggedInfo.firstUser
            });

        } catch (e) {
            console.log(e);
        }

    }

    getRowData = async (id) => {
        const { UserActions, firstList } = this.props;
        let firstUserId = firstList.userId ? firstList.userId : '0';
        let custNo = id ? id : firstUserId;

        try {
            if (custNo) {
                Promise.all([UserActions.getUserData(custNo), UserActions.getUserUpdateData(custNo)]);
            }
            UserActions.setResultData({
                form: 'user',
                target: 'currentCustNo',
                result: custNo
            });
        } catch (e) {
            console.log(e);
        }

    }

    popDelete = () => {
        this.setState({ displayDeletePop: true });
    }

    popUpdateForm = () => {
        this.setState({ displayPop: true });
    }

    closePop = () => {
        const { UserActions, currentCustNo } = this.props;

        this.setState({ displayPop: false });
        UserActions.getUserUpdateData(currentCustNo);
    }

    closeDeletePop = () => {
        this.setState({ displayDeletePop: false });
    }

    render() {
        const { store, list, currentStoreId, currentCustNo } = this.props;
        return (
            <PageTemplate navData={store} id={currentStoreId} clickNav={this.getNavData}>
                <ViewForUser viewTitle="회원정보 조회" />
                {currentCustNo && currentCustNo !== '0' ? (
                    <div style={{ textAlign: 'right', marginRight: '1rem' }}>
                        <FormBtn onClick={this.popUpdateForm}>회원정보수정</FormBtn>
                    </div>) :
                    <div />
                }
                <TableWithScroll
                    headerData={this.state.headerData}
                    data={list}
                    gridTitle="회원목록 및 정보"
                    clickRow={this.getRowData}
                    id={currentCustNo}
                    button={currentCustNo && currentCustNo !== '0' ? <TableBtn onClick={this.popDelete}>회원삭제</TableBtn> : null} />
                <PopUserInfo displayPop={this.state.displayPop} closePop={this.closePop} />
                <PopDeleteConfirm displayDeletePop={this.state.displayDeletePop} getNavData={this.getNavData} closeDeletePop={this.closeDeletePop} />
            </PageTemplate>
        );
    }
}

export default connect(
    (state) => ({
        form: state.user.getIn(['user', 'form']),
        firstList: state.user.getIn(['user', 'firstList']),
        list: state.user.getIn(['user', 'list']),
        store: state.user.getIn(['user', 'store']),
        error: state.user.getIn(['user', 'error']),
        result: state.user.get('result'),
        currentCustNo: state.user.getIn(['user', 'currentCustNo']),
        currentStoreId: state.user.getIn(['user', 'currentStoreId']),
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(UserActions, dispatch),
    })
)(AdminUser);