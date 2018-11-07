import React, { Component } from 'react';

class LoginTemplate extends Component {

    render() {
        return (
            <div className='login-background'>
                {this.props.children}
            </div>
        );
    }
}

export default LoginTemplate;