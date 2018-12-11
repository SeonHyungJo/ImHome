import React, { Component } from 'react';
import { PageTemplate } from '../../component/template';
import { Product } from '../../component/product';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProductListActions from '../../redux/modules/productList';

class AdminProduct extends Component {
    constructor() {
        super();
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
            products,
            companyId: '001'
        };
    }

    async componentDidMount() {
        const { ProductListActions } = this.props;

        await ProductListActions.getCompanyList();
    }

    // componentWillUnmount() {
    //     const { ProductListActions } = this.props;
    //     ProductListActions.initializeForm('productList');
    // }

    getNavData = async id => {
        // const { ProductListActions, form } = this.props;

        // let storeId = id ? id : form.toJS().branchCode;

        // this.setState({ storeId: storeId });

        // try {
        //     await ProductListActions.getUserList(storeId);
        //     await ProductListActions.changeInput({
        //         form: 'user',
        //         value: this.props.list.length > 0 ? this.props.list[0]._id : '0',
        //         name: '_id'
        //     });
        //     await this.getRowData();
        // } catch (e) {
        //     console.log(e);
        // }

        //setstate
        this.setState({ companyId: id });
    };

    render() {
        const { company } = this.props;
        return (
            <PageTemplate navData={company} id={this.state.companyId} clickNav={this.getNavData}>
                <Product products={this.state.products} companyId={this.state.companyId} />
            </PageTemplate>
        );
    }
}

export default connect(
    state => ({
        form: state.productList.getIn(['productList', 'form']),
        list: state.productList.getIn(['productList', 'list']),
        store: state.productList.getIn(['productList', 'store']),
        company: state.productList.getIn(['productList', 'company']),
        error: state.productList.getIn(['productList', 'error']),
        result: state.productList.get('result')
    }),
    dispatch => ({
        ProductListActions: bindActionCreators(ProductListActions, dispatch)
    })
)(AdminProduct);
