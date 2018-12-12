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
            companyCode: '001'
        };
    }

    async componentDidMount() {
        const { ProductListActions } = this.props;

        await ProductListActions.getCompanyList();
        await ProductListActions.getProducts('001');
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

        const { ProductListActions } = this.props;

        await ProductListActions.getProducts(id);

        //setstate
        this.setState({ companyCode: id });
    };

    render() {
        const { companys, lists } = this.props;
        return (
            <PageTemplate navData={companys} id={this.state.companyCode} clickNav={this.getNavData}>
                <Product lists={lists} companyCode={this.state.companyCode} />
            </PageTemplate>
        );
    }
}

export default connect(
    state => ({
        form: state.productList.getIn(['productList', 'form']),
        lists: state.productList.getIn(['productList', 'lists']),
        companys: state.productList.getIn(['productList', 'companys']),
        error: state.productList.getIn(['productList', 'error']),
        result: state.productList.get('result')
    }),
    dispatch => ({
        ProductListActions: bindActionCreators(ProductListActions, dispatch)
    })
)(AdminProduct);
