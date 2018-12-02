import React, { Component } from 'react';
import { NavContainer } from './';

class NavTemplate extends Component {
    render() {
        return (
            <>
            <NavContainer>
                {this.props.navData &&
                    this.props.navData.map((data, index) => {
                        return data.branchCode === this.props.id ? (
                            <li className="on" key={index} id={data.branchCode} onClick={() => this.props.clickNav && this.props.clickNav(data.branchCode)}>
                                {data.branchName}
                            </li>
                        ) : (
                                <li key={index} id={data.id} onClick={() => this.props.clickNav && this.props.clickNav(data.branchCode)}>
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
