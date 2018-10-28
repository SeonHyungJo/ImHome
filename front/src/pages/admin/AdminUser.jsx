import React, { Component } from 'react';
import { PageTemplate } from '../../component/template';

class AdminMain extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <PageTemplate>
                <div  style={{backgroundColor: 'black'}}>
                    <p>AdminUser</p>
                </div>        
            </PageTemplate>
        );
    }
}

export default AdminMain;