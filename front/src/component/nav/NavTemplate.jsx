import React, { Component } from 'react';
import { NavContainer } from './';

class NavTemplate extends Component {
    render() {
        return (
            <>
                <NavContainer>
                    {this.props.navData &&
                        this.props.navData.map((data, index) => {
                            return data.id === this.props.storeId ? (
                                <li className="on" key={index} id={data.id}>
                                    {data.name}
                                </li>
                            ) : (
                                <li key={index} id={data.id}>
                                    {data.name}
                                </li>
                            );
                        })}
                </NavContainer>
            </>
        );
    }
}

export default NavTemplate;
