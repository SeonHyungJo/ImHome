import React, { Component } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProductListActions from '../../redux/modules/productList';

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 80vw;
    height: 75vh;
    background-color: white;
    padding: 10px;

    .footerContainer {
        padding: 0px 0px 10px 0px;
        width: 100%;
        display: flex;
        // border: solid 1px black;
    }

    .category {
        margin: 10px 10px 0px 0px;
        padding: 0px 0px 0px 0px;
        // border: solid 1px black;
    }

    .clicked {
        background-color: #000000;
        color: #ffffff;
    }

    .categoryDesc {
        display: flex;
        justify-content: space-between;
        // border: solid 1px black;
        height: 100px; // 수정필요
    }

    .categoryMain {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 70%;
        // border: solid 1px black;
    }

    .categoryMain > .name {
        font-weight: bold;
    }

    .categoryMain > .desc {
        color: #808080;
    }

    .categorySub {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30%;
        font-size: 50px;
        // border: solid 1px black;
    }

    .categorySubButton {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 30%;
    }
`;

const MainContainer = styled.div`
    padding: 10px 0px 0px 10px;
    width: 40vw;
    height: 75vh;
    overflow: auto;
    // border: solid 1px black;
`;

const ProductFormContainer = styled.div`
    width: 40vw;
    height: 75vh;
    background-color: white;
    padding: 10px;
    overflow: auto;z
`;

const Label = styled.div`
    text-align: left;
    font-size: 1rem;
    font-weight: bold;
    color: #000000;
    margin-bottom: 0.25rem;
    margin-right: 2rem;
    display: inline-block;
    width: 20%;
`;

const Input = styled.input`
    width: 50%;
    border: 1px solid #c2c2c2;
    outline: none;
    border-radius: 3px;
    height: 2em;
    font-size: 0.7rem;
    // padding-left: 0.5rem;
    // padding-right: 0.01rem;
    ::placeholder {
        font-size: 0.7rem;
        color: #7d7d7d;
    }
`;

const SmallButton = styled.button`
    margin-top: 0.5rem;
    // padding-top: 0.5rem;
    // padding-bottom: 0.5rem;
    border: 2px solid #fe4c8d;
    border-radius: 3px;
    background: white;
    color: #fe4c8d;

    text-align: center;
    font-size: 0.6rem;
    width: 3rem;
    height: 2rem;
    cursor: pointer;
    // font-weight: bold;
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

class Imhome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedCate: { index: -1, _id: -1, itemName: '-' },
            newCategory: { state: false, newName: '', newDesc: '' },
            categories: props.categories
        };
    }

    _clickCategory = (index, _id, itemName) =>
        this.setState({ clickedCate: { index: index, _id: _id, itemName: itemName } });

    /**
     * @desc 카테고리를 삭제하는 멧드
     * @param
     * companyCode : 회사 코드
     * body : item id {
     *   _id : item id
     * }
     */
    _deleteCate = async () => {
        const { clickedCate } = this.state;

        if (clickedCate.index === -1) {
            // 클릭한 카테고리가 없다면
            alert('메뉴를 선택해주세요');
        } else {
            if (window.confirm('정말 선택하신 카테고리를 삭제하시겠습니까?')) {
                // 클릭한 카테고리가 있다면
                const { ProductListActions, form } = this.props;

                // 현재 폼에서 companyCode 조회
                const companyCode = form.toJS().companyCode;

                // 카테고리 삭제
                await ProductListActions.deleteCategory(companyCode, {
                    _id: clickedCate._id
                });

                // 클릭 state 초기화
                this.setState({ clickedCate: { index: -1, _id: -1, itemName: '' } });
            }
        }
    };

    // 새로운 카테고리 폼 생성
    _newCategory = () => {
        const { newCategory } = this.state;
        if (!newCategory.state) {
            this.setState({ newCategory: { ...newCategory, state: true } });
        } else {
        }
    };

    /**
     * @desc 카테고리를 생성하는 메서드
     * @param
     * companyCode : 회사 코드
     * body : 카테고리 정보 {
     *   itemName: 이름,
     *   itemDepth: 0,
     *   parentId: 0,
     *   itemDesc: 설명
     *   }
     */
    _createCategory = async () => {
        const { ProductListActions, form } = this.props;
        const { newCategory } = this.state;

        // 현재 폼에서 companyCode 조회
        const companyCode = form.toJS().companyCode;

        // 카테고리 생성
        await ProductListActions.createCategory(companyCode, {
            itemName: newCategory.newName,
            itemDepth: 0,
            parentId: 0,
            itemDesc: newCategory.newDesc
        });

        // 관련 state 초기화
        this.setState({ newCategory: { state: false, newName: '', newDesc: '' } });
    };

    _cancelCategory = () => {
        this.setState({ newCategory: { state: false, newName: '', newDesc: '' } });
    };

    _handleChange = e => {
        const { newCategory } = this.state;
        this.setState({ newCategory: { ...newCategory, [e.target.name]: e.target.value } });
    };

    render() {
        const items = this.props.product.items;
        const { clickedCate, newCategory } = this.state;
        return (
            <ContentWrapper>
                <MainContainer>
                    <div className={'productComponent'} id={'productComponent'}>
                        {!!this.props.categories.length > 0 ? (
                            this.props.categories.map((item, index) => (
                                <div
                                    className={
                                        this.state.clickedCate.index === index
                                            ? classNames('category', 'clicked')
                                            : classNames('category')
                                    }
                                    key={index}
                                >
                                    <div className={'categoryDesc'}>
                                        <div className={'categoryMain'}>
                                            <div className={'name'}>{item.itemName}</div>
                                            <div className={'desc'}>{item.itemDesc}</div>
                                        </div>
                                        <div
                                            className={'categorySub'}
                                            onClick={() =>
                                                this._clickCategory(index, item._id, item.itemName)
                                            }
                                        >
                                            <span>
                                                {this.state.clickedCate.index === index ? '>' : '<'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>로딩중입니다...</div>
                        )}
                        {newCategory.state === true ? (
                            <div className={classNames('category')}>
                                <div className={'categoryDesc'}>
                                    <div className={'categoryMain'}>
                                        <div className={'name'}>
                                            <Label>이름</Label>
                                            <Input
                                                type="text"
                                                name="newName"
                                                placeholder="이름"
                                                onChange={this._handleChange}
                                                value={newCategory.newName}
                                            />
                                        </div>
                                        <div className={'desc'}>
                                            <Label>설명</Label>
                                            <Input
                                                type="text"
                                                name="newDesc"
                                                placeholder="설명"
                                                onChange={this._handleChange}
                                                value={newCategory.newDesc}
                                            />
                                        </div>
                                    </div>
                                    <div className={'categorySubButton'}>
                                        <SmallButton onClick={() => this._createCategory()}>
                                            확인
                                        </SmallButton>
                                        <SmallButton onClick={() => this._cancelCategory()}>
                                            취소
                                        </SmallButton>
                                        {/* <button onClick={() => this._createCategory()}></button> */}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div />
                        )}
                    </div>
                    <hr />
                    {!!this.props.categories.length > 0 ? (
                        <div className={'footerContainer'}>
                            <Button onClick={() => this._newCategory()}>메뉴추가</Button>
                            <Button onClick={this._deleteCate}>메뉴삭제</Button>
                        </div>
                    ) : (
                        <div />
                    )}
                </MainContainer>
                <ProductFormContainer>
                    {/* <TableWithScroll
                        headerData={this.state.headerData}
                        data={this.state.data}
                        gridTitle={this.state.tableTitle + ' 상세'}
                    /> */}
                    <div>{this.state.clickedCate.itemName}</div>
                    <div>
                        {/* {this.props.product.items.filter(item => item.parentId===this.state)} */}
                        {items
                            .filter(item => item.parentId === clickedCate._id)
                            .map(child => (
                                <div key={child._id}>
                                    {child.itemName +
                                        ' | ' +
                                        child.itemVolume +
                                        ' | ' +
                                        child.itemCost}
                                </div>
                            ))}
                    </div>
                    <hr />
                    <div className={'footerContainer'}>
                        <Button>품목추가</Button>
                        <Button>품목삭제</Button>
                        <Button>변경사항 저장</Button>
                    </div>
                </ProductFormContainer>
            </ContentWrapper>
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
)(Imhome);
