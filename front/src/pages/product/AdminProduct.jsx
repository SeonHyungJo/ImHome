import React, { Component } from 'react';
import { PageTemplate } from '../../component/template';
import { Product } from '../../component/product';

class AdminMain extends Component {
    constructor() {
        super();
        const headerData = [
            {
                id: 'registDate',
                numeric: false,
                disablePadding: true,
                label: '등록일자'
            },
            {
                id: 'storeName',
                numeric: false,
                disablePadding: true,
                label: '지점명'
            },
            {
                id: 'custName',
                numeric: false,
                disablePadding: true,
                label: '대표자'
            },
            {
                id: 'custId',
                numeric: false,
                disablePadding: true,
                label: '아이디'
            },
            {
                id: 'businessNum',
                numeric: false,
                disablePadding: true,
                label: '사업자번호'
            },
            {
                id: 'totalMoney',
                numeric: true,
                disablePadding: true,
                label: '총 거래금액(원)'
            }
        ];

        const products = [
            {
                name: '에스프레소',
                desc: 'survived not only five centuries but the leap'
            },
            {
                name: '아이스크림 류',
                desc: '밀크, 말차, 코코넛, 레몬, 얼그레이, 요거트'
            },
            {
                name: 'TEA 류',
                desc: '아쌈, 얼그레이, 루이보스, 라벤더, 레몬그라스 등'
            },
            {
                name: '기타품목',
                desc: '냅킨, 포인트카드, 메뉴판, 크림 발사믹 등'
            },
            { name: '면세품목', desc: '블루베리 홀, 라즈베리 홀, 딸기 홀 등' }
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
                {
                    registDate: '2018-10-29',
                    storeName: '분당점',
                    custName: '최장길',
                    custId: 'imhome',
                    businessNum: '426-50-00326',
                    totalMoney: 10000500
                }
            ],
            products
        };
    }

    render() {
        return (
            <PageTemplate navData={this.state.navData} storeId={this.state.storeId}>
                <Product products={this.state.products} />
            </PageTemplate>
        );
    }
}

export default AdminMain;
