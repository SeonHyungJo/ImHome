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
            { id: "registDate", numeric: false, disablePadding: true, label: '등록일자' },
            { id: "storeName", numeric: false, disablePadding: true, label: '지점명' },
            { id: "custName", numeric: false, disablePadding: true, label: '대표자' },
            { id: "custId", numeric: false, disablePadding: true, label: '아이디' },
            { id: "businessNum", numeric: false, disablePadding: true, label: '사업자번호' },
            { id: "totalMoney", numeric: true, disablePadding: true, label: '총 거래금액(원)' }
        ];
        this.state = {
            storeId: 1,
            custNo: 1,
            headerData: headerData
        };
    }

    async componentDidMount() {
        await this.getStoreList();
        await this.getNavData();
        await this.getRowData();
    };

    //최초 로드시 매장 정보를 가져와 redux form에 store 정보 저장
    getStoreList = async () => {
        const { store } = this.props;
        try {
            await UserActions.getStoreList();

            if (store) {
                let data = store[0].id;

                UserActions.changeInput({
                    form: 'user',
                    value: data,
                    name: 'storeId'
                });
            }

        } catch (e) {
            console.log(e);
        }
    }

    getNavData = async (id) => {
        const { UserActions } = this.props;
        const { form, list } = this.props;

        let storeId = id ? id : form.toJS().storeId;

        this.setState({ storeId: storeId });

        try {
            await UserActions.getUserList({
                storeId
            });

            if (!id) {
                let data = list[0].id;

                UserActions.changeInput({
                    form: 'user',
                    value: data,
                    name: 'id'
                });
            }

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
        const { store, list, form } = this.props;

        return (
            <PageTemplate navData={store} id={this.state.storeId} clickNav={this.getNavData}>
                <ViewForUser viewTitle="회원정보 조회" viewData={form} />
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