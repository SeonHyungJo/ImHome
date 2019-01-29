import React, { Component } from 'react';
import { PageTemplate } from '../../component/template';

class AdminMain extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <PageTemplate role="admin">
        <div className="App">
          <header className="App-header">
            <p>AdminMain</p>
          </header>
        </div>
      </PageTemplate>
    );
  }
}

export default AdminMain;
