import React, { Component } from 'react';
import Header from '../header/HeaderContainer';
import Nav from '../nav/NavContainer';

class PageTemplate extends Component {

    render() {
        return (
            <div>
                <Header />
                    {this.props.children}
                <Nav />
            </div>
        );
    }
}

export default PageTemplate;