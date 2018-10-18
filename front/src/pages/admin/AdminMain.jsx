import React, { Component } from 'react';
import PageTemplate from '../../component/pageTemplate/PageTemplate';

class AdminMain extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <PageTemplate>
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