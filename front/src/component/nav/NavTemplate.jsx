import React, { PureComponent } from 'react';
import { NavContainer } from '.';

class NavTemplate extends PureComponent {
  render() {
    // 2018-12-11
    // jinseong 공통수정
    // 1-1. navData가 존재할 때 object의 'companyCode' 키를 찾아 변수 isCompany에 company면 true를, store면 false를 할당한다.
    // 1-2. company의 경우 company를 return, store의 경우 branch를 return한다.

    // 2019-02-25 Refactoring 진행
    // 1. 코드 간소화, 2. 필요없는 소스제거

    const {
      navData = [], clickNav, id, changeModeInfo, changeMode,
    } = this.props;
    const isCompany = !!(navData[0] && navData[0].hasOwnProperty('companyCode'));

    return (
      <NavContainer changeModeInfo={changeModeInfo} changeMode={changeMode}>
        {/* 1-2 */}
        {navData.map((data, index) => (
          <NavList
            key={index}
            {...data}
            mainCompare={isCompany ? data.companyCode : data.branchCode}
            compareId={id}
            clickNav={clickNav}
          />
        ))}
      </NavContainer>
    );
  }
}

/**
 * @description Nav Detail List
 * @param {*} Object
 */
const NavList = ({
  mainCompare,
  companyCode,
  companyName,
  branchName,
  id,
  compareId,
  clickNav,
}) => (
  <li
    className={mainCompare === compareId ? 'on' : ''}
    key={branchName}
    id={companyCode === id ? companyCode : id}
    onClick={() => clickNav && clickNav(mainCompare)}
  >
    {branchName || companyName}
  </li>
);

export default NavTemplate;
