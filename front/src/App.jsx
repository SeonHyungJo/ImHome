import React, { Component } from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import {BrowserRouter , Route} from 'react-router-dom';
import { UserMain } from './pages/user/';
import { AdminMain } from './pages/admin/';
import { Login } from './pages/common/auth';

class App extends Component {

  render() {
    const PATH = '/admin';
    const {store} = this.props;

    return (
      <Provider store={store}>
        <div>
          <BrowserRouter>
            <div>
              {/* Admin router : 관리자 라우터*/}
              <Route exact={true} component={AdminMain} path={PATH}/>
              {/* User router : 사용자 라우터*/}
              <Route exact={true} component={UserMain} path='/'/>
              {/* Common router : 관리자와 사용자 공통 라우터*/}
              <Route component={Login} path='/login'/>
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
