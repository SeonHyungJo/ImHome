import React, { Component } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { Button } from '../common';
import { TableWithScroll } from '../table';

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

class Imhome extends Component {
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
        this.state = {
            clickedCate: -1,
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
            tableTitle: '아이스크림'
        };
    }

    _clickCategory = index =>
        this.setState({ clickedCate: index, tableTitle: this.props.lists[index].productName });

    _deleteCate = () => {
        this.state.clickedCate === -1
            ? alert('메뉴를 선택해주세요')
            : window.confirm('정말 삭제하시겠습니까?');
    };

    render() {
        return (
            <ContentWrapper>
                <MainContainer>
                    {this.props.lists.map((product, index) => (
                        <div
                            className={
                                this.state.clickedCate === index
                                    ? classNames('category', 'clicked')
                                    : classNames('category')
                            }
                            key={index}
                        >
                            <div className={'categoryDesc'}>
                                <div className={'categoryMain'}>
                                    <div className={'name'}>{product.productName}</div>
                                    <div className={'desc'}>{product.productDesc}</div>
                                </div>
                                <div
                                    className={'categorySub'}
                                    onClick={() => this._clickCategory(index)}
                                >
                                    <span>{this.state.clickedCate === index ? '>' : '<'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <hr />
                    <div className={'footerContainer'}>
                        <Button>메뉴추가</Button>
                        <Button onClick={this._deleteCate}>메뉴삭제</Button>
                    </div>
                </MainContainer>
                <ProductFormContainer>
                    <TableWithScroll
                        headerData={this.state.headerData}
                        data={this.state.data}
                        gridTitle={this.state.tableTitle + ' 상세'}
                    />
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

export default Imhome;
