import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PageTemplate } from '../../component/template';
import { ViewForRelease, TableWithScroll } from '../../component/releaseList';
import { FormBtn } from '../../component/common';
import * as ReleaseActions from '../../redux/modules/releaseList';
import * as CommonUtil from '../../util/commonUtil';

class AdminReleaseList extends Component {
    constructor() {
        super();
        const headerData = [
            {
                id: 'updatedAt',
                numeric: false,
                label: '거래일자',
                formatter: function(data) {
                    return CommonUtil.setTotalDate(data);
                }
            },
            {
                id: 'updatedAt',
                numeric: false,
                label: '거래시간',
                formatter: function(data) {
                    return CommonUtil.setTotalTime(data);
                }
            },
            { id: 'branchName', numeric: false, label: '거래처' },
            { id: 'bNumber', numeric: false, label: '거래명세표 발행건수' },
            { id: 'totalDealCost', numeric: true, label: '거래금액(원)' }
        ];
        this.state = {
            storeId: 1,
            custNo: 1,
            headerData
        };
    }

    async componentDidMount() {
        const { ReleaseActions } = this.props;

        await ReleaseActions.getStoreList();
    }

    // 리스트 클릭시 주문내역 리스트 가져오기
    getNavData = async id => {
        try {
            const { ReleaseActions, currentOrder } = this.props;
            const storeId = id ? id : currentOrder.toJS().branchCode;
            this.setState({ storeId });

            // 선택한 지점 주문내역 불러오기
            await ReleaseActions.getOrderList(storeId);
        } catch (e) {
            console.log(e);
        }
    };

    getRowData = async id => {
        const { ReleaseActions, form } = this.props;

        let custNo = id ? id : form.toJS()._id;

        this.setState({ custNo: custNo });

        try {
            if (custNo) {
                await ReleaseActions.getOrderData(custNo);
            }
        } catch (e) {
            console.log(e);
        }
    };

    getTotalCost = list => {
        if (!!!list.length) {
            return 0;
        }

        return list.reduce((total, order) => {
            return (
                total +
                order.items.reduce((total, item) => {
                    return parseInt(item.itemCount, 10) * parseInt(item.itemCost, 10) + total;
                }, 0)
            );
        }, 0);
    };

    render() {
        const { store, list } = this.props;
        return (
            <PageTemplate navData={store} id={this.state.storeId} clickNav={this.getNavData}>
                <ViewForRelease type="date" viewTitle="출고내역 및 세금게산서 발행내역 조회">
                    <FormBtn>조회</FormBtn>
                </ViewForRelease>

                <ViewForRelease
                    type="normal"
                    viewTitle="거래내용"
                    viewSubTitle=" | 최근거래내역[총 10건]"
                >
                    <FormBtn>조회</FormBtn>
                </ViewForRelease>

                <TableWithScroll
                    headerData={this.state.headerData}
                    data={list}
                    gridTitle="조회내용"
                    clickRow={this.getRowData}
                    id={this.state.custNo}
                    bottom={['Total', '', '', '총 발행건수', this.getTotalCost(list)]}
                />
            </PageTemplate>
        );
    }
}

export default connect(
    state => ({
        form: state.releaseList.getIn(['releaseList', 'form']),
        list: state.releaseList.getIn(['releaseList', 'list']),
        store: state.releaseList.getIn(['releaseList', 'store']),
        error: state.releaseList.getIn(['releaseList', 'error']),
        result: state.releaseList.get('result')
    }),
    dispatch => ({
        ReleaseActions: bindActionCreators(ReleaseActions, dispatch)
    })
)(AdminReleaseList);
