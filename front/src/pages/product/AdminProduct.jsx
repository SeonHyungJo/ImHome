import React, { Component } from 'react';
import { PageTemplate } from '../../component/template';
import { Product } from '../../component/product';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProductListActions from '../../redux/modules/productList';

class AdminProduct extends Component {
    constructor() {
        super();

        this.state = {
            companyCode: '0'
        };
    }

    async componentDidMount() {
        const { ProductListActions } = this.props;

        await ProductListActions.getProducts();
        await this.getCompanyList();
    }

    getCompanyList = async () => {
        const { ProductListActions, lists } = this.props;
        try {
            if (lists) {
                await ProductListActions.getProductData('001');
                this.setState({ companyCode: '001' });
                // await ProductListActions.changeInput({
                //     form: 'productList',
                //     value: lists[0].companyCode,
                //     name: 'companyCode'
                // });
            }
        } catch (e) {
            console.log(e);
        }
    };

    getNavData = async id => {
        const { ProductListActions } = this.props;

        try {
            await ProductListActions.getProductData(id);
        } catch (e) {
            console.log(e);
        }

        //setstate
        this.setState({ companyCode: id });
    };

    render() {
        const { form, lists } = this.props;

        return (
            <PageTemplate navData={lists} id={this.state.companyCode} clickNav={this.getNavData}>
                <Product product={form.toJS()} companyCode={this.state.companyCode} />
            </PageTemplate>
        );
    }
}

export default connect(
    state => ({
        form: state.productList.getIn(['productList', 'form']),
        lists: state.productList.getIn(['productList', 'lists']),
        error: state.productList.getIn(['productList', 'error']),
        result: state.productList.get('result')
    }),
    dispatch => ({
        ProductListActions: bindActionCreators(ProductListActions, dispatch)
    })
)(AdminProduct);
