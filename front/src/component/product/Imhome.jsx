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

    .category {
        display: flex;
        justify-content: space-between;
        margin: 10px 10px 0px 0px;
        padding: 0px 0px 0px 0px;
        height: 6rem;
        .categoryMain {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 70%;

            .name {
                font-weight: bold;
            }
            .desc {
                color: #7e8387;
            }
        }
        .categorySub {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30%;
            font-size: 50px;
        }
        .categorySubButton {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 30%;
        }
    }

    .clicked {
        background-color: #363636;
        color: #ffffff;
    }

    .footerContainer {
        padding: 0px 0px 10px 0px;
        width: 100%;
        display: flex;
        // border: solid 1px black;
    }
`;

const MainContainer = styled.div`
    padding: 10px 0px 0px 10px;
    width: 35vw;
    height: 75vh;
    overflow: auto;
`;

const ProductFormContainer = styled.div`
    width: 45vw;
    height: 75vh;
    background-color: white;
    padding: 10px;
    overflow: auto;
    .tableTitle {
        font-size: 1.3rem;
        margin-bottom: 1rem;
    }
`;

const Label = styled.div`
    text-align: left;
    font-size: 1rem;
    font-weight: bold;
    color: #000000;
    margin-bottom: 0.25rem;
    margin-right: 2rem;
    display: inline-block;
    width: 10%;
`;

const Input = styled.input`
    display: inline-block;
    width: 70%;
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

const SmallButton = styled.button`
    margin-top: 0.5rem;
    border: 2px solid #fe4c8d;
    border-radius: 3px;
    background: white;
    color: #fe4c8d;

    text-align: center;
    font-size: 0.6rem;
    width: 3rem;
    height: 2rem;
    cursor: pointer;
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
        border-right: 1px solid #e0e0e0;
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
        border-right: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        padding: 5px;
        line-height: 22px;
        color: #666666;
        font-size: 0.9rem;
        height: 30px;
        box-sizing: border-box;
        letter-spacing: -0.04em;
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
`;
class Imhome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedCate: { index: -1, _id: -1, itemName: '-' },
            clickedItem: {},
            newCategory: { state: false, newName: '', newDesc: '' },
            newItem: { state: false, newName: '', newVolume: '', newCost: '' },
            editItem: { state: false, _id: -1 },
            categories: props.categories
        };
    }

    _initNew = stateName => {
        if (stateName === 'newCategory') {
            this.setState({ newCategory: { state: false, newName: '', newDesc: '' } });
        } else if (stateName === 'newItem') {
            this.setState({ newItem: { state: false, newName: '', newVolume: '', newCost: '' } });
        } else if (stateName === 'clickedItem') {
            this.setState({ clickedItem: {} });
        } else if (stateName === 'clickedCate') {
            this.setState({ clickedCate: { index: -1, _id: -1, itemName: '' } });
        } else if (stateName === 'editItem') {
            this.setState({ editItem: { state: false, _id: -1 } });
        }
    };

    _clickCategory = (index, _id, itemName) => {
        this._initNew('newItem');
        this._initNew('clickedItem');
        this.setState({ clickedCate: { index: index, _id: _id, itemName: itemName } });
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
     * @param2 body정보. (category와 item이 필요한 정보가 다름)
     * @param2_1
     *   { caategory
     *   itemName: 이름,
     *   itemDepth: 0,
     *   parentId: 0,
     *   itemDesc: 설명
     *   }
     * @param2_2
     *   { item
     *   itemName: 이름,
     *   itemCount: 1,
     *   itemCost: 가격,
     *   itemVolume: 단위,
     *   itemDepth: 1,
     *   parentId: 카테고리 아이디
     *   }
     */
    _createItem = async stateName => {
        const { ProductListActions, form } = this.props;

        // 현재 폼에서 companyCode 조회
        const companyCode = form.toJS().companyCode;

        if (stateName === 'newCategory') {
            const { newCategory } = this.state;

            // 카테고리 생성
            await ProductListActions.createItem(companyCode, {
                itemName: newCategory.newName,
                itemDepth: 0,
                parentId: 0,
                itemDesc: newCategory.newDesc
            });
        } else if (stateName === 'newItem') {
            const { newItem, clickedCate } = this.state;

            // item 생성
            await ProductListActions.createItem(companyCode, {
                itemName: newItem.newName,
                itemCount: 1, // 여기 추후 수정해야함
                itemCost: newItem.newCost,
                itemVolume: newItem.newVolume,
                itemDepth: 1,
                parentId: clickedCate._id
            });
        }
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
        const { clickedCate } = this.state;
        if (type === 'category') {
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
                    await ProductListActions.deleteItem(companyCode, {
                        _id: clickedCate._id
                    });

                    // 클릭 state 초기화
                    this._initNew('clickedCate');
                }
            }
        } else if (type === 'item') {
            const { clickedItem } = this.state;
            const keys = Object.keys(clickedItem);

            if (keys.length === 0) {
                // 클릭한 Item이 없다면
                alert('Item을 선택해주세요');
            } else {
                if (window.confirm('정말 선택하신 Item들을 삭제하시겠습니까?')) {
                    // 클릭한 Item이 있다면
                    const { ProductListActions, form } = this.props;

                    // 현재 폼에서 companyCode 조회
                    const companyCode = form.toJS().companyCode;

                    await keys.map(key => {
                        // Item 삭제
                        ProductListActions.deleteItem(companyCode, {
                            _id: clickedItem[key]._id
                        });
                    });

                    // 클릭 Item 초기화
                    this._initNew('clickedItem');
                }
            }
        }
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
     * updateItem
     */
    _updateItem = async () => {
        const { ProductListActions, form } = this.props;
        const { editItem } = this.state;

        // 현재 폼에서 companyCode 조회
        const companyCode = form.toJS().companyCode;

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
    _boxCheck = async (boxId, detailItem) => {
        // filter로 이미 걸러진 detailItem에서 ID로 조회
        const clickedItem = detailItem.filter(item => item._id === boxId)[0];

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

    render() {
        const items = this.props.product.items;
        const { clickedCate, newCategory, newItem, editItem } = this.state;
        const detailItem = items.filter(item => item.parentId === clickedCate._id);
        const defaultTable = [0, 1, 2, 3, 4];
        return (
            <ContentWrapper>
                <MainContainer>
                    <div className={'productComponent'}>
                        {!!this.props.categories.length > 0 ? (
                            this.props.categories.map((item, index) => (
                                <div
                                    className={
                                        this.state.clickedCate.index === index
                                            ? classNames('category', 'clicked')
                                            : classNames('category')
                                    }
                                    key={index}
                                    onClick={() =>
                                        this._clickCategory(index, item._id, item.itemName)
                                    }
                                >
                                    <div className={'categoryMain'}>
                                        <div className={'name'}>{item.itemName}</div>
                                        <div className={'desc'}>{item.itemDesc}</div>
                                    </div>
                                    <div className={'categorySub'}>
                                        <span>
                                            {this.state.clickedCate.index === index ? '>' : '<'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>로딩중입니다...</div>
                        )}
                        {newCategory.state === true ? (
                            <div className={classNames('category')}>
                                <div className={'categoryMain'}>
                                    <div className={'name'}>
                                        <Label>이름</Label>
                                        <Input
                                            type="text"
                                            name="newName"
                                            placeholder="이름"
                                            onChange={e => this._handleChange('newCategory', e)}
                                            value={newCategory.newName}
                                        />
                                    </div>
                                    <div className={'desc'}>
                                        <Label>설명</Label>
                                        <Input
                                            type="text"
                                            name="newDesc"
                                            placeholder="설명"
                                            onChange={e => this._handleChange('newCategory', e)}
                                            value={newCategory.newDesc}
                                        />
                                    </div>
                                </div>
                                <div className={'categorySubButton'}>
                                    <SmallButton onClick={() => this._createItem('newCategory')}>
                                        확인
                                    </SmallButton>
                                    <SmallButton onClick={() => this._cancelItem('newCategory')}>
                                        취소
                                    </SmallButton>
                                </div>
                            </div>
                        ) : (
                            <div />
                        )}
                    </div>
                    <hr />
                    {!!this.props.categories.length > 0 ? (
                        <div className={'footerContainer'}>
                            <Button onClick={() => this._newItem('newCategory')}>메뉴추가</Button>
                            <Button onClick={() => this._deleteItem('category')}>메뉴삭제</Button>
                        </div>
                    ) : (
                        <div />
                    )}
                </MainContainer>
                <ProductFormContainer>
                    <div className={'tableTitle'}>{this.state.clickedCate.itemName}</div>
                    <div>
                        <Table>
                            <tbody>
                                <tr>
                                    <th>품목</th>
                                    <th>단위</th>
                                    <th>가격</th>
                                    <th>수정</th>
                                </tr>
                                {detailItem.length > 0
                                    ? detailItem.map(child =>
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
                                                      <TableButton
                                                          onClick={() => this._updateItem()}
                                                      >
                                                          확인
                                                      </TableButton>
                                                      <TableButton
                                                          onClick={() =>
                                                              this._cancelItem('editItem')
                                                          }
                                                      >
                                                          취소
                                                      </TableButton>
                                                  </td>
                                              </tr>
                                          ) : (
                                              <tr
                                                  key={child._id}
                                                  onClick={() =>
                                                      this._boxCheck(child._id, detailItem)
                                                  }
                                                  className={
                                                      this.state.clickedItem.hasOwnProperty(
                                                          child._id
                                                      )
                                                          ? classNames('itemOn')
                                                          : classNames('')
                                                  }
                                              >
                                                  <td>{child.itemName}</td>
                                                  <td>{child.itemVolume}</td>
                                                  <td>{child.itemCost}</td>
                                                  <td className={classNames('tableAlignCenter')}>
                                                      <TableButton
                                                          onClick={() => this._editItem(child)}
                                                      >
                                                          수정
                                                      </TableButton>
                                                  </td>
                                              </tr>
                                          )
                                      )
                                    : defaultTable.map((iy, index) => (
                                          <tr key={index}>
                                              <td>-</td>
                                              <td>-</td>
                                              <td>-</td>
                                              <td>-</td>
                                          </tr>
                                      ))}
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
                    {clickedCate._id !== -1 ? (
                        <div className={'footerContainer'}>
                            <Button onClick={() => this._newItem('newItem')}>품목추가</Button>
                            <Button onClick={() => this._deleteItem('item')}>품목삭제</Button>
                        </div>
                    ) : (
                        <div />
                    )}
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
