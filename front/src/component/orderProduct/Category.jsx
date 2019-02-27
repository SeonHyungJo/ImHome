import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import IosArrowUp from 'react-ionicons/lib/IosArrowUp';
import IosArrowDown from 'react-ionicons/lib/IosArrowDown';
import ProductTable from './ProductTable';

const ProductComponent = styled.div`
  overflow-y: auto;

  .category {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0px 10px 0px 0px;
    padding: 0px 0px 0px 0px;
    height: 6rem;
    .categoryMain {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 65%;
      margin-left: 1rem;
      .name {
        font-weight: bold;
        margin-bottom: 0.5rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .desc {
        color: #7e8387;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    .categorySub {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30%;
      cursor: pointer;
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
`;

const Category = ({ categories, clickedCate, _clickCategory }) => (
  <ProductComponent>
    {!!categories.length > 0 ? (
      categories.map((item, index) => (
          clickedCate.includes(item._id) ? (
            <div key={index}>
              <div
                className={classNames('category', 'clicked')}
                onClick={() => _clickCategory(item._id)}
              >
                <div className="categoryMain">
                  <div className="name">{item.itemName}</div>
                  <div className="desc">{item.itemDesc}</div>
                </div>
                <div className="categorySub">
                  <span>
                    <IosArrowDown fontSize="2.5rem" color="#ffffff" />
                  </span>
                </div>
              </div>
              <ProductTable categoryId={item._id} />
            </div>
          ) : (
            <div
              className={classNames('category')}
              key={index}
              onClick={() => _clickCategory(item._id)}
            >
              <div className="categoryMain">
                <div className="name">{item.itemName}</div>
                <div className="desc">{item.itemDesc}</div>
              </div>
              <div className="categorySub">
                <span>
                  <IosArrowUp fontSize="2.5rem" />
                </span>
              </div>
            </div>
          )
      ))
    ) : (
      <div>로딩중입니다...</div>
    )}
  </ProductComponent>
);

export default Category;
