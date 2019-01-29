import React, { Component } from 'react';

class RegisterTemplate extends Component {
  render() {
    return <div className="register-background">{this.props.children}</div>;
  }
}

export default RegisterTemplate;
