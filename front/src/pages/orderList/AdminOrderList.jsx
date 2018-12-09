import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PageTemplate } from '../../component/template';
import { OrderListTable } from '../../component/orderList';
import { SpecificationTable } from '../../component/specificationTable';
import * as OrderListActions from '../../redux/modules/orderList';
import * as CommonUtil from '../../util/commonUtil';

class AdminOrderList extends Component {
    constructor() {
        super();
        const orders = [
            { name: '아이스크림', count: 2, cost: 3000 },
            { name: '아메리카노', count: 1, cost: 4000 },
            { name: '카페라떼', count: 100, cost: 5000 },
            { name: '곡물라떼', count: 20, cost: 7000 }
        ];

        const buttons = [
            { name: '주문저장', event: 'SAVE_ORDER' },
            { name: '배송처리', event: 'DELIVER_OK' },
            { name: '주문서 취소', event: 'CANCLE_ORDER' }
        ];

        this.state = {
            orders,
            buttons,
            modifiedDate: '2018.11.21 15시 35분'
        };
    }

    async componentDidMount() {
        const { OrderListActions } = this.props;

        // 주문내역 브랜치 리스트 가져오기
        await OrderListActions.getStoreList();
    }

    shouldComponentUpdate(nextProps, nextState) {
        //return this.state.currentOrder != nextState.currentOrder ? true : false;
        return true;
    }

    // 리스트 클릭시 상세 주문내역 가져오기
    getNavData = async id => {
        try {
            const { OrderListActions, currentOrder } = this.props;
            const storeId = id ? id : currentOrder.toJS().branchCode;
            this.setState({ storeId });

            // 선택한 지점 주문내역 불러오기
            await OrderListActions.getOrderData(storeId);
        } catch (e) {
            console.log(e);
        }
    };

    // 출고완료처리하기
    setComplete = async () => {
        try {
            const { OrderListActions, currentOrder } = this.props;
            // 선택한 지점 출고처리하기
            const result = await OrderListActions.updateComplete(currentOrder.branchCode);

            if (result.data.success === '0000') {
                // 주문내역 브랜치 리스트 가져오기
                const storeList = await OrderListActions.getStoreList();
                await this.getNavData(storeList.data[0].branchCode);
                alert('출고처리가 되었습니다.');
            }
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const { store, currentOrder } = this.props;
        return (
            <PageTemplate navData={store} id={this.state.storeId} clickNav={this.getNavData}>
                <header>주문일자 : {CommonUtil.setDate(currentOrder.updatedAt)}</header>
                <OrderListTable
                    branchName={currentOrder.branchName}
                    orderList={currentOrder.items}
                    buttonList={this.state.buttons}
                    clickComplete={this.setComplete}
                />
                <SpecificationTable
                    branchName={this.state.storeId}
                    orderList={this.state.orders}
                    buttonList={this.state.buttons}
                />
            </PageTemplate>
        );
    }
}

export default connect(
    state => ({
        currentOrder: state.orderList.getIn(['orderList', 'currentOrder']),
        list: state.orderList.getIn(['orderList', 'list']),
        store: state.orderList.getIn(['orderList', 'store']),
        error: state.orderList.getIn(['orderList', 'error']),
        result: state.orderList.get('result')
    }),
    dispatch => ({
        OrderListActions: bindActionCreators(OrderListActions, dispatch)
    })
)(AdminOrderList);
