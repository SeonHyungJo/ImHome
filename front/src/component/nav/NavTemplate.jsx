import React, { Component } from 'react';
import { NavContainer } from './';

class NavTemplate extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        let returnVal = true;

        if (nextProps.navData === this.props.navData && nextProps.id === this.props.id && !nextProps.id)
            returnVal = false;

        return returnVal;
    }

    render() {
        // 2018-12-11
        // jinseong 공통수정
        // 넘어온 navData의 정보가 company || store에 따라 분기 작업 실행했음
        // 1-1. navData가 존재할 때 object의 'companyCode' 키를 찾아
        //   변수 isCompany에 company면 true를, store면 false를 할당한다.
        // 1-2. company의 경우 company를 return, store의 경우 branch를 return한다.

        // 1-1
        const navData = this.props.navData;
        const isCompany =
            navData && navData[0] && navData[0].hasOwnProperty('companyCode') ? true : false;
        return (
            <>
            <NavContainer>
                {/* 1-2 */}
                {isCompany
                    ? this.props.navData &&
                    this.props.navData.map((data, index) => {
                        return data.companyCode === this.props.id ? (
                            <li
                                className="on"
                                key={index}
                                id={data.companyCode}
                                onClick={() =>
                                    this.props.clickNav &&
                                    this.props.clickNav(data.companyCode)
                                }
                            >
                                {data.companyName}
                            </li>
                        ) : (
                                <li
                                    key={index}
                                    id={data.id}
                                    onClick={() =>
                                        this.props.clickNav &&
                                        this.props.clickNav(data.companyCode)
                                    }
                                >
                                    {data.companyName}
                                </li>
                            );
                    })
                    : this.props.navData &&
                    this.props.navData.map((data, index) => {
                        return data.branchCode === this.props.id ? (
                            <li
                                className="on"
                                key={index}
                                id={data.branchCode}
                                onClick={() =>
                                    this.props.clickNav &&
                                    this.props.clickNav(data.branchCode)
                                }
                            >
                                {data.branchName}
                            </li>
                        ) : (
                                <li
                                    key={index}
                                    id={data.id}
                                    onClick={() =>
                                        this.props.clickNav &&
                                        this.props.clickNav(data.branchCode)
                                    }
                                >
                                    {data.branchName}
                                </li>
                            );
                    })}
            </NavContainer>
            </>
        );
    }
}

export default NavTemplate;
