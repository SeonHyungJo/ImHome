import React, { Component } from 'react';
import { PageTemplate } from '../../component/template';

class AdminMain extends Component {
    constructor() {
        super();
        this.state = {
            navData: [
                {id: 1, name: '분당점'},
                {id: 2, name: '백현점'},
                {id: 3, name: '광주탄천점'},
                {id: 4, name: '이대본점'},
                {id: 5, name: '용인죽전점'}
            ],
            storeId : 1
        };
    }

    render() {
        return (
            <PageTemplate navData={this.state.navData} storeId={this.state.storeId}>
                <div className="App">
                    <header className="App-header">
                        <p>AdminUser</p>
                    </header>
                </div>
            </PageTemplate>
        );
    }
}

export default AdminMain;