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

        // 검색내용을 저장하는 용도로 사용할 것인지 아니면 redux로 관리를 할 것인지....
        const searchingData = {
            term: 'all', // all, part, tax, trade 조회내용 선택기준
            startDate: CommonUtil.setTotalDate(new Date()), // 기간설정(시작)
            endDate: CommonUtil.setTotalDate(new Date()) // 기간설정(끝)
        };

        const radioBtnSetting = {
            name: 'searchType', // 동일한 타입이 들어가고
            value: ['all', 'part', 'tax', 'trade'], // 4개의 value를 만들고
            text: ['전체내역', '선택내역', '세금계산서', '거래명세표'] // 4개의 value를 만들고
        };

        this.state = {
            storeId: 1,
            custNo: 1,
            headerData,
            searchingData,
            radioBtnSetting
        };
    }

    async componentDidMount() {
        const { ReleaseActions } = this.props;

        await ReleaseActions.getStoreList();
    }

    // 리스트 클릭시 주문내역 리스트 가져오기
    changeSearchTerm = e => {
        try {
            //e.preventDefault();
            e.stopPropagation();
            console.log(e.target.value);
            const newTerm = e.target.value;
            this.setState(prevState => {
                return {
                    ...prevState,
                    searchingData: { ...prevState.searchingData, term: newTerm }
                };
            });
        } catch (e) {
            console.log(e);
        }
    };

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
        const { storeId, searchingData, radioBtnSetting } = this.state;
        const { store, list } = this.props;

        return (
            <PageTemplate navData={store} id={storeId} clickNav={this.getNavData}>
                <ViewForRelease
                    type="date"
                    viewTitle="출고내역 및 세금게산서 발행내역 조회"
                    searchingData={searchingData}
                    radioBtnSetting={radioBtnSetting}
                    radioClick={this.changeSearchTerm}
                >
                    <FormBtn style={{ width: '80px', margin: '0' }}>조회</FormBtn>
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
