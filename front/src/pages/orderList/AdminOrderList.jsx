import React, { Component } from 'react';
import { PageTemplate } from '../../component/template';
import { OrderListTable } from '../../component/orderList';
import { SpecificationTable } from '../../component/specificationTable';

class AdminMain extends Component {
    constructor() {
        super();
        const navData = [
            { id: 1, name: '분당점' },
            { id: 2, name: '백현점' },
            { id: 3, name: '광주탄천점' },
            { id: 4, name: '이대본점' },
            { id: 5, name: '용인죽전점' },
            { id: 6, name: '분당점' },
            { id: 7, name: '백현점' },
            { id: 8, name: '광주탄천점' },
            { id: 9, name: '이대본점' },
            { id: 10, name: '용인죽전점' }
        ];

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
            storeId: 1,
            navData,
            orders,
            buttons,
            modifiedDate: '2018.11.21 15시 35분'
        };
    }

    getCurrentBranchName() {
        return this.state.navData
            .filter(obj => obj.id === this.state.storeId)
            .map(result => result.name);
    }

    render() {
        return (
            <PageTemplate navData={this.state.navData} storeId={this.state.storeId}>
                <header>주문일자 : {this.state.modifiedDate}</header>
                <OrderListTable
                    branchName={this.getCurrentBranchName()}
                    orderList={this.state.orders}
                    buttonList={this.state.buttons}
                />
                <SpecificationTable
                    branchName={this.getCurrentBranchName()}
                    orderList={this.state.orders}
                    buttonList={this.state.buttons}
                />
            </PageTemplate>
        );
    }
}

export default AdminMain;
