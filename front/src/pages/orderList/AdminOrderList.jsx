import React, { Component } from 'react';
import { PageTemplate } from '../../component/template';
import { OrderListTable } from '../../component/orderList';

class AdminMain extends Component {
    constructor() {
        super();
        const headerData = [
            { id: "registDate", numeric: false, disablePadding: true, label: '등록일자'},
            { id: "storeName", numeric: false, disablePadding: true, label: '지점명' },
            { id: "custName", numeric: false, disablePadding: true, label: '대표자' },
            { id: "custId", numeric: false, disablePadding: true, label: '아이디' },
            { id: "businessNum", numeric: false, disablePadding: true, label: '사업자번호' },
            { id: "totalMoney", numeric: true, disablePadding: true, label: '총 거래금액(원)' }
        ];

        const orders = [
            { name: "아이스크림", count: 2, cost: 3000},
            { name: "아메리카노", count: 1, cost: 4000},
            { name: "카페라떼", count: 100, cost: 5000},
            { name: "곡물라떼", count: 20, cost: 7000},
        ];

        this.state = {
            navData: [
                {id: 1, name: '분당점'},
                {id: 2, name: '백현점'},
                {id: 3, name: '광주탄천점'},
                {id: 4, name: '이대본점'},
                {id: 5, name: '용인죽전점'},
                {id: 6, name: '분당점'},
                {id: 7, name: '백현점'},
                {id: 8, name: '광주탄천점'},
                {id: 9, name: '이대본점'},
                {id: 10, name: '용인죽전점'}
            ],
            storeId : 1,
            headerData: headerData,
            orders,
            branchName: "분당점",
            data: [
                { registDate: '2018-10-29', storeName: '분당점', custName: '최장길', custId: 'imhome', businessNum: '426-50-00326', totalMoney: 10000500 }
            ],
        };
    }

    render() {
        return (
            <PageTemplate navData={this.state.navData} storeId={this.state.storeId}>
                <div style={{width: '100%', height: '50px'}}>
                    상단헤더
                </div>
                <OrderListTable branchName={this.state.branchName} orderList={this.state.orders}/>
                {/* <OrderListTable orderList={this.state.orders}/> */}
            </PageTemplate>
        );
    }
}

export default AdminMain;