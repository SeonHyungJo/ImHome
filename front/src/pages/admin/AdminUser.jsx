import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PageTemplate } from '../../component/template';
import { TableWithScroll } from '../../component/table';
import { ViewForUser } from '../../component/view';
import * as UserActions from '../../redux/modules/user';

class AdminUser extends Component {
    constructor() {
        super();
        const headerData = [
            { id: "createdAt", numeric: false, disablePadding: true, label: '등록일자' },
            { id: "branchName", numeric: false, disablePadding: true, label: '지점명' },
            { id: "name", numeric: false, disablePadding: true, label: '대표자' },
            { id: "id", numeric: false, disablePadding: true, label: '아이디' },
            { id: "bNumber", numeric: false, disablePadding: true, label: '사업자번호' },
            { id: "__v", numeric: true, disablePadding: true, label: '총 거래금액(원)' }
        ];
        this.state = {
            storeId: 1,
            custNo: 1,
            headerData: headerData
        };
    }

    async componentDidMount() {
        const { UserActions } = this.props;

        await UserActions.getStoreList();
        await this.getStoreList();
        await this.getNavData();
        await this.getRowData();
    };

    //최초 로드시 매장 정보를 가져와 redux form에 store 정보 저장
    getStoreList = async () => {
        const { UserActions, store } = this.props;
        try {

            if (store) {
                let data = store[0].branchCode;

                UserActions.changeInput({
                    form: 'user',
                    value: data,
                    name: 'branchCode'
                });
            }

        } catch (e) {
            console.log(e);
        }
    }

    getNavData = async (id) => {
        const { UserActions } = this.props;
        const { form, list } = this.props;

        console.log(form.toJS());
        let storeId = id ? id : form.toJS().branchCode;

        this.setState({ storeId: storeId });

        try {
            await UserActions.getUserList(storeId);

            // if (!id) {
            //     let data = list[0].id;

            //     UserActions.changeInput({
            //         form: 'user',
            //         value: data,
            //         name: 'id'
            //     });
            // }

        } catch (e) {
            console.log("error");
        }
    }

    getRowData = async (id) => {
        const { UserActions, form } = this.props;

        let custNo = id ? id : form.toJS().id;

        this.setState({ custNo: custNo });

        try {
            await UserActions.getUserData({
                custNo
            });

        } catch (e) {
            console.log("error");
        }

    }

    render() {
        const { store, list } = this.props;

        return (
            <PageTemplate navData={store} id={this.state.storeId} clickNav={this.getNavData}>
                <ViewForUser viewTitle="회원정보 조회" />
                <TableWithScroll
                    headerData={this.state.headerData}
                    data={list}
                    gridTitle="회원목록 및 정보"
                    clickRow={this.getRowData}
                    id={this.state.custNo} />
            </PageTemplate>
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
)(AdminUser);