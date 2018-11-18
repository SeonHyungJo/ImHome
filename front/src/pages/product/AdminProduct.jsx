import React, { Component } from 'react';
import { PageTemplate } from '../../component/template';
import { Product } from '../../component/product';

class AdminMain extends Component {
    constructor() {
        super();
        const headerData = [
            {
                id: 'p_name',
                numeric: false,
                disablePadding: true,
                label: '품목'
            },
            {
                id: 'p_unit',
                numeric: false,
                disablePadding: true,
                label: '단위'
            },
            {
                id: 'p_cost',
                numeric: true,
                disablePadding: true,
                label: '가격'
            },
            {
                // 추가함
                id: 'p_quan',
                numeric: true,
                disablePadding: true,
                label: '수량'
            },
            {
                id: 'p_edit',
                numeric: false,
                disablePadding: true,
                label: '수정'
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
                    p_name: '밀크 아이스크림',
                    p_unit: 'box 3kg',
                    p_cost: '32,500',
                    p_quan: '1'
                },
                {
                    p_name: '말차 아이스크림',
                    p_unit: 'box 3kg',
                    p_cost: '32,500',
                    p_quan: '1'
                },
                {
                    p_name: '코코넛 아이스크림',
                    p_unit: 'box 3kg',
                    p_cost: '27,500',
                    p_quan: '2'
                },
                {
                    p_name: '레몬 아이스크림',
                    p_unit: 'box 3kg',
                    p_cost: '31,500',
                    p_quan: '3'
                }
            ],
            products
        };
    }

    render() {
        return (
            <PageTemplate navData={this.state.navData} storeId={this.state.storeId}>
                <Product
                    products={this.state.products}
                    tableHeader={this.state.headerData}
                    tableData={this.state.data}
                    tableTitle={'아이스크림 류'}
                />
            </PageTemplate>
        );
    }
}

export default AdminMain;
