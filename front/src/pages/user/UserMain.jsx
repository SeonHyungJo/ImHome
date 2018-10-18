import React, { Component } from 'react';
import PageTemplate from '../../component/pageTemplate/PageTemplate';

class UserMain extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <PageTemplate>
                <div className="App">
                    <header className="App-header">
                        <p>UserMain</p>
                    </header>
                </div>
            </PageTemplate>
        );
    }
}

export default UserMain;