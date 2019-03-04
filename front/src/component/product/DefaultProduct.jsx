import React, { Component } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProductListActions from '../../redux/modules/productList';
import { AlertPopup } from '../../component/common';
import * as CommonUtil from '../../util/commonUtil'
import PopDeleteConfirm from './PopDeleteConfirm';
import { isEmpty, isInt } from 'validator';

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 75vw;
    height: 75vh;
    background-color: white;
    padding: 10px;
`;

const MainContainer = styled.div`
    padding: 10px 0px 0px 10px;
    width: 36vw;
    height: 75vh;
    overflow: hidden;
    .clicked {
        background-color: #363636;
        color: #ffffff;
    }
    .productComponent {
        overflow-y: auto;
        min-height: 65vh;
        max-height: 65vh;
    }
`;

const ProductFormContainer = styled.div`
    padding: 10px 0px 0px 10px;
    width: 39vw;
    height: 75vh;
    overflow: hidden;

    .tableTitle {
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 10px;
        width: 100%
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

`;

const TableButton = styled.button`
    margin-right: 0.25rem;
    border: 2px solid #c2c2c2;
    border-radius: 3px;
    background: white;
    color: #fe4c8d;

    text-align: center;
    font-size: 0.6rem;
    width: 3rem;
    height: 2rem;
    cursor: pointer;
`;

const Table = styled.table`
    border-top: 2px solid #fe4c8d;
    width: 100%;
    border-collapse: collapse;
    font-size: 1rem;
    color: #333;
    table-layout: fixed;
    border-spacing: 0;
    th {
        text-align: center;
        border-right: 0px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        background: #fafafa;
        height: 35px;
        line-height: 18px;
        color: #666666;
        font-size: 1rem;
        padding: 5px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    td {
        border-right: 0px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        padding: 5px;
        line-height: 22px;
        color: #666666;
        font-size: 0.9rem;
        height: 30px;
        box-sizing: border-box;
        letter-spacing: -0.04em;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .itemOn {
        background-color: #fe4c8d;
    }
    .itemOn > td {
        color: #ffffff;
    }
    .checkboxTd {
        width: 7%;
    }
    .tableAlignCenter {
        text-align: center;
    }
    .tableAlignRight {
        text-align: right;
    }
`;

const Input = styled.input`
    display: inline-block;
    width: 85%;
    border: 1px solid #c2c2c2;
    outline: none;
    border-radius: 3px;
    height: 2em;
    font-size: 0.7rem;
    ::placeholder {
        font-size: 0.7rem;
        color: #7d7d7d;
    }
`;

const Button = styled.button`
    margin-top: 1rem;
    margin-right: 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;

    border: 2px solid #fe4c8d;
    border-radius: 3px;
    background: white;
    color: #fe4c8d;

    text-align: center;
    font-size: 0.8rem;
    width: 8rem;
    cursor: pointer;
    font-weight: bold;
`;

class DefaultProduct extends Component {
    constructor() {
        super();

        this.state = {
            clickedItem: {},
            newItem: { state: false, newName: '', newVolume: '', newCost: '' },
            editItem: { state: false, _id: -1 },
            displayAlertPop: false,
            displayDeletePop: { state: false, type: '' }
        };
    }
    _initNew = stateName => {
        if (stateName === 'newItem') {
            this.setState({ newItem: { state: false, newName: '', newVolume: '', newCost: '' } });
        } else if (stateName === 'clickedItem') {
            this.setState({ clickedItem: {} });
        } else if (stateName === 'editItem') {
            this.setState({ editItem: { state: false, _id: -1 } });
        }
    };

    // 새로운 폼 생성
    _newItem = stateName => {
        const newContent = this.state[stateName];
        if (!newContent.state) {
            this.setState({ [stateName]: { ...this.state[stateName], state: true } });
        }
    };

    // 새로운 폼 취소
    _cancelItem = stateName => this._initNew(stateName);

    /**
     * @desc 아이템을 생성하는 메서드
     * @param
     * @parma1 companyCode : 회사 코드
     * @param2 body정보
     * @param2
     *   { item
     *   itemName: 이름,
     *   itemCount: 1,
     *   itemCost: 가격,
     *   itemVolume: 단위,
     *   itemDepth: 0,
     *   parentId: 0
     *   }
     */
    _createItem = async stateName => {
        const { ProductListActions, form } = this.props;
        const { validate } = this;

        // 현재 폼에서 companyCode 조회
        const companyCode = form.toJS().companyCode;
        const { newItem } = this.state;

        if (
            !validate['itemName'](newItem.newName) ||
            !validate['itemVolume'](newItem.newVolume) ||
            !validate['itemCost'](newItem.newCost)
        ) {
            this.setState({ displayAlertPop: true });
            return;
        }

        // item 생성
        await ProductListActions.createItem(companyCode, {
            itemName: newItem.newName,
            itemCount: 1, // 여기 추후 수정해야함
            itemCost: newItem.newCost,
            itemVolume: newItem.newVolume,
            itemDepth: 0,
            parentId: 0
        });

        this._initNew(stateName);
    };

    /**
     * @desc 아이템을 삭제하는 메서드
     * @param
     * companyCode : 회사 코드
     * body : item id {
     *   _id : item id
     * }
     */
    _deleteItem = async type => {
        const { clickedItem } = this.state;
        const keys = Object.keys(clickedItem);

        if (keys.length === 0) {
            // 클릭한 Item이 없다면
            this.setMessage('메뉴를 선택해주세요.');
            this.setState({ displayAlertPop: true });
        } else {
            await this.setState({ displayDeletePop: { state: true, type: 'item' } });
        }
    };

    _closeDeletePop = () => {
        this.setState({ displayDeletePop: { state: false, type: '' } });
    };

    /**
     * @desc 아이템 업데이트 메서드
     * @param
     * companyCode : 회사 코드
     * body : item 정보
     * {
     *      "_id": "5c1539ac23a9f3217007735d",
            "itemName": 이름,
            "itemCount": 수량,
            "itemCost": 가격,
            "itemVolume": 단위,
     * }
     */
    _updateItem = async () => {
        const { ProductListActions, form } = this.props;
        const { editItem } = this.state;
        const { validate } = this;

        // 현재 폼에서 companyCode 조회
        const companyCode = form.toJS().companyCode;

        if (
            !validate['itemName'](editItem.itemName) ||
            !validate['itemVolume'](editItem.itemVolume) ||
            !validate['itemCost'](editItem.itemCost)
        ) {
            this.setState({ displayAlertPop: true });
            return;
        }

        // item 변경
        await ProductListActions.updateItem(companyCode, {
            _id: editItem._id,
            itemName: editItem.itemName,
            itemCount: 1, // 여기 추후 수정해야함
            itemCost: editItem.itemCost,
            itemVolume: editItem.itemVolume
        });

        this._initNew('editItem');
    };

    _editItem = child => {
        this.setState({
            editItem: {
                state: true,
                _id: child._id,
                itemName: child.itemName,
                itemCost: child.itemCost,
                itemVolume: child.itemVolume
            }
        });
    };

    _handleChange = (stateName, e) =>
        this.setState({
            [stateName]: { ...this.state[stateName], [e.target.name]: e.target.value }
        });

    // item 박스 클릭 시 메서드
    _boxCheck = async boxId => {
        const { form } = this.props;
        const items = form.toJS().items;
        const clickedItem = items.filter(item => item._id === boxId)[0];

        if (!this.state.clickedItem.hasOwnProperty(boxId)) {
            // 클릭했던 것이 아니라면 state에 저장
            await this.setState({
                clickedItem: { ...this.state.clickedItem, [clickedItem._id]: clickedItem }
            });
        } else {
            // 클릭했었던 것이라면 state에서 delete
            let newState = this.state.clickedItem;
            delete newState[boxId];
            await this.setState({ clickedItem: newState });
        }
    };

    _closeAlertPop = () => {
        this.setState({ displayAlertPop: false });
    };

    setMessage = message => {
        const { ProductListActions } = this.props;
        ProductListActions.setMessage({
            form: 'productList',
            message
        });
        return false;
    };

    validate = {
        itemName: value => {
            if (isEmpty(value)) {
                this.setMessage('아이템 이름은 필수 입력사항입니다.');
                return false;
            }
            this.setMessage(null);
            return true;
        },
        itemVolume: value => {
            if (isEmpty(value)) {
                this.setMessage('아이템 단위는 필수 입력사항입니다.');
                return false;
            }
            this.setMessage(null);
            return true;
        },
        itemCost: value => {
            if (isEmpty(value)) {
                this.setMessage('아이템 가격은 필수 입력사항입니다.');
                return false;
            } else if (!isInt(value, { min: 0 })) {
                this.setMessage('입력하신 아이템 가격을 확인해주십시오.');
                return false;
            }
            this.setMessage(null);
            return true;
        }
    };

    render() {
        const { form, message } = this.props;
        const items = form.toJS().items;
        const { newItem, editItem } = this.state;
        return (
            <ContentWrapper>
                <MainContainer>
                    <div className={'productComponent'}>
                        <Table>
                            <tbody>
                                <tr>
                                    <th>품목</th>
                                    <th>단위</th>
                                    <th>가격</th>
                                    <th>수정</th>
                                </tr>
                                {items.map(child =>
                                    editItem.state === true && editItem._id === child._id ? (
                                        <tr key={child._id}>
                                            <td>
                                                <Input
                                                    type="text"
                                                    name="itemName"
                                                    placeholder="이름"
                                                    onChange={e =>
                                                        this._handleChange('editItem', e)
                                                    }
                                                    value={editItem.itemName}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    type="text"
                                                    name="itemVolume"
                                                    placeholder="단위"
                                                    onChange={e =>
                                                        this._handleChange('editItem', e)
                                                    }
                                                    value={editItem.itemVolume}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    type="text"
                                                    name="itemCost"
                                                    placeholder="가격"
                                                    onChange={e =>
                                                        this._handleChange('editItem', e)
                                                    }
                                                    value={editItem.itemCost}
                                                />
                                            </td>
                                            <td className={classNames('tableAlignCenter')}>
                                                <TableButton onClick={() => this._updateItem()}>
                                                    확인
                                                </TableButton>
                                                <TableButton
                                                    onClick={() => this._cancelItem('editItem')}
                                                >
                                                    취소
                                                </TableButton>
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr
                                            key={child._id}
                                            onClick={() =>
                                                this._boxCheck(child._id, this.state.data)
                                            }
                                            className={
                                                this.state.clickedItem.hasOwnProperty(child._id)
                                                    ? classNames('itemOn')
                                                    : classNames('')
                                            }
                                        >
                                            <td className={classNames('tableAlignCenter')}>
                                                {child.itemName}
                                            </td>
                                            <td className={classNames('tableAlignCenter')}>
                                                {child.itemVolume}
                                            </td>
                                            <td className={classNames('tableAlignRight')}>
                                                {CommonUtil.setCostFormat(child.itemCost)}
                                            </td>
                                            <td
                                                className={classNames('tableAlignCenter')}
                                                onClick={e => e.stopPropagation()}
                                            >
                                                <TableButton onClick={() => this._editItem(child)}>
                                                    수정
                                                </TableButton>
                                            </td>
                                        </tr>
                                    )
                                )}
                                {newItem.state === true ? (
                                    <tr>
                                        <td>
                                            <Input
                                                type="text"
                                                name="newName"
                                                placeholder="이름"
                                                onChange={e => this._handleChange('newItem', e)}
                                                value={newItem.newName}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                type="text"
                                                name="newVolume"
                                                placeholder="단위"
                                                onChange={e => this._handleChange('newItem', e)}
                                                value={newItem.newVolume}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                type="text"
                                                name="newCost"
                                                placeholder="가격"
                                                onChange={e => this._handleChange('newItem', e)}
                                                value={newItem.newCost}
                                            />
                                        </td>
                                        <td className={classNames('tableAlignCenter')}>
                                            <TableButton
                                                onClick={() => this._createItem('newItem')}
                                            >
                                                확인
                                            </TableButton>
                                            <TableButton
                                                onClick={() => this._cancelItem('newItem')}
                                            >
                                                취소
                                            </TableButton>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr />
                                )}
                            </tbody>
                        </Table>
                    </div>
                    <hr />
                    <div className={'footerContainer'}>
                        <Button onClick={() => this._newItem('newItem')}>품목추가</Button>
                        <Button onClick={() => this._deleteItem('item')}>품목삭제</Button>
                    </div>
                </MainContainer>
                <ProductFormContainer />
                <AlertPopup
                    title={message}
                    clickEvent={this._closeAlertPop}
                    buttonName="확인"
                    displayAlertPop={this.state.displayAlertPop}
                />
                <PopDeleteConfirm
                    displayDeletePop={this.state.displayDeletePop}
                    items={this.state.clickedItem}
                    closeDeletePop={this._closeDeletePop}
                />
            </ContentWrapper>
        );
    }
}

export default connect(
    state => ({
        form: state.productList.getIn(['productList', 'form']),
        lists: state.productList.getIn(['productList', 'lists']),
        error: state.productList.getIn(['productList', 'error']),
        message: state.productList.getIn(['productList', 'message']),
        result: state.productList.get('result')
    }),
    dispatch => ({
        ProductListActions: bindActionCreators(ProductListActions, dispatch)
    })
)(DefaultProduct);
