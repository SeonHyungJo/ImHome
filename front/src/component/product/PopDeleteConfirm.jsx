import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, ConfirmPopup, AlertPopup } from '../../component/common';
import * as ProductListActions from '../../redux/modules/productList';

class PopDeleteConfirm extends Component {
    constructor() {
        super();
        this.state = {
            displayDeletePop: false,
            displayAlertPop: false,
            message: ''
        };
    }

    deleteData = async () => {
        const { ProductListActions, form, items, category, displayDeletePop } = this.props;
        const type = displayDeletePop.type;
        // 현재 폼에서 companyCode 조회
        const companyCode = form.toJS().companyCode;

        if (type === 'category') {
            // 카테고리 삭제
            await ProductListActions.deleteItem(
                companyCode,
                {
                    _id: category._id
                },
                true
            );
        } else if (type === 'item') {
            const keys = Object.keys(items);

            await keys.map(key => {
                // Item 삭제
                ProductListActions.deleteItem(
                    companyCode,
                    {
                        _id: items[key]._id
                    },
                    false
                );
                return 1;
            });
        }

        this.setState({
            displayAlertPop: true,
            message: '성공적으로 삭제되었습니다.'
        });

        this.props.closeDeletePop();

        // 현재 try catch 미적용으로 sync 맞지않음. 곧 수정하겠음
        // try {
        //     await keys.map(key => {
        //         // Item 삭제
        //         ProductListActions.deleteItem(companyCode, {
        //             _id: items[key]._id
        //         });
        //         return 1;
        //     });

        //     const loggedInfo = this.props.result.toJS();

        //     if (loggedInfo.success === '0000') {
        //         this.props.getNavData(branchCode);
        //         this.setState({
        //             displayAlertPop: true,
        //             message: '성공적으로 삭제되었습니다.'
        //         });
        //     } else {
        //         this.setState({
        //             displayAlertPop: true,
        //             message: '삭제가 실패했습니다. 다시 시도해주세요.'
        //         });
        //     }

        //     this.props.closeDeletePop();
        // } catch (e) {
        //     this.setState({
        //         displayAlertPop: true,
        //         message: '삭제가 실패했습니다. 다시 시도해주세요.'
        //     });
        //     this.props.closeDeletePop();
        //     console.log(e);
        // }
    };

    setError = message => {
        const { ProductListActions } = this.props;
        ProductListActions.setError({
            form: 'product',
            message
        });
        return false;
    };

    closeAlertPop = () => {
        this.setState({ displayAlertPop: false });
    };

    render() {
        return (
            <div>
                <ConfirmPopup
                    style={{ display: this.props.displayDeletePop.state ? 'block' : 'none' }}
                    title="선택한 아이템을 삭제하시겠습니까?"
                    subTitle="삭제가 되면 복구되지 않습니다."
                >
                    <Button
                        style={{
                            marginRight: '1rem',
                            width: '6rem',
                            color: 'white',
                            backgroundColor: '#fe4c8d'
                        }}
                        onClick={this.props.closeDeletePop}
                    >
                        취소
                    </Button>
                    <Button
                        style={{ width: '6rem', color: 'white', backgroundColor: '#fe4c8d' }}
                        onClick={this.deleteData}
                    >
                        삭제
                    </Button>
                </ConfirmPopup>
                <AlertPopup
                    title={this.state.message}
                    clickEvent={this.closeAlertPop}
                    buttonName="확인"
                    displayAlertPop={this.state.displayAlertPop}
                />
            </div>
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
)(PopDeleteConfirm);
