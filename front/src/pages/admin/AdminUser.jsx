import React, { Component } from 'react';
import { PageTemplate } from '../../component/template';
import { TableWithScroll } from '../../component/table';
import { ViewForUser } from '../../component/view';

class AdminMain extends Component {
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
            navData: [
                { id: 1, name: '분당점' },
                { id: 2, name: '백현점' },
                { id: 3, name: '광주탄천점' },
                { id: 4, name: '이대본점' },
                { id: 5, name: '용인죽전점' }
            ],
            storeId: 1,
            headerData: headerData,
            data: [
                { id: 1, registDate: '2018-10-29', storeName: '분당점', custName: '최장길', custId: 'imhome', businessNum: '426-50-00326', totalMoney: 10000500 }
            ],
            viewData: {
                id: 1,
                storeName: '분당점',
                custName: '최장길',
                custId: 'imhome',
                companyName: 'Caffee24',
                businessNum: '426-50-00326',
                storeAddress: '경기도 성남시 분당구 황새울로 85번길 12 1층',
                custEmail: 'imhome@imhome.com',
                storePhone: '031-123-4567',
                custPhone: '010-1234-5678'
            }
        };
    }

    clickRow = (id) => {
        console.log(id);
        //TODO
        //axios 태워서 storeId에 맞는 데이터 가져오기
        //가져온뒤 viewData에 세팅
        this.setState({
            viewData: {
                id: 2,
                storeName: '분당점2',
                custName: '최장길2',
                custId: 'imhome2',
                companyName: 'Caffee242',
                businessNum: '426-50-003262',
                storeAddress: '경기도 성남시 분당구 황새울로 85번길 12 1층2',
                custEmail: 'imhome@imhome.com2',
                storePhone: '031-123-4567',
                custPhone: '010-1234-5678'
            }
        });
    }

    render() {
        return (
            <PageTemplate navData={this.state.navData} storeId={this.state.storeId}>
                <ViewForUser viewTitle="회원정보 조회" viewData={this.state.viewData} />
                <TableWithScroll headerData={this.state.headerData} data={this.state.data} gridTitle="회원목록 및 정보" clickRow={this.clickRow} />
            </PageTemplate>
        );
    }
}

export default AdminMain;