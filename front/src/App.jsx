import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  UserRegister, UserOrderList, UserProduct, UserReleaseList,
} from './pages/user';
import {
  AdminUser, AdminOrderList, AdminReleaseList, AdminProduct,
} from './pages/admin';
import { Login } from './pages/common';
import * as AuthActions from './redux/modules/auth';
import * as OrderListActions from './redux/modules/orderList';

class App extends PureComponent {
  // transform-class-properties 적용
  constructor(props) {
    super(props);

    // Create history
    const customHistory = createBrowserHistory();
    // const checkOrderFunc = setInterval(() => {
    //   props.OrderListActions.getStoreList().then((result) => {
    //     this.setState({
    //       orderList: {
    //         ...result.data,
    //       },
    //     });
    //     this.notify();
    //   });
    // }, 2000);

    this.state = {
      admin: null,
      routeList: null,
      orderList: {},
      customHistory,
    };
  }

  notify = () => toast('주문내역이 업데이트 되었습니다.');

  componentDidMount() {
    // Check Login info(init, updated)
    this.initializeUserInfo();

    window.requestIdleCallback = window.requestIdleCallback
      || function (cb) {
        const start = Date.now();
        return setTimeout(() => {
          cb({
            didTimeout: false,
            timeRemaining() {
              return Math.max(0, 50 - (Date.now() - start));
            },
          });
        }, 1);
      };

    const adminCheck = localStorage.getItem('checkAdmin');
    // adminCheck && this.newOrderCheck();
  }

  newOrderCheck = () => {
    const { OrderListActions } = this.props;

    clearInterval(this.checkOrderFunc);

    this.checkOrderFunc = setInterval(() => {
      OrderListActions.getStoreList().then((result) => {
        if (
          !this.state.orderList.length
          || (this.state.orderList.length > 0
            && this.state.orderList[0].branchCode !== result.data[0].branchCode)
        ) {
          this.setState(prevState => ({
            ...prevState,
            orderList: result.data,
          }));

          this.notify();
        }
      });
    }, 2000);
  };

  // React Add new LifeCycle in version 16.3
  static getDerivedStateFromProps(nextProps, prevState) {
    const { result } = nextProps;
    const { customHistory } = prevState;

    // #3 loggedInfo fail일 경우
    // history가 App.jsx에서 없는 경우 처리 진행 && this 접근이 안됨처리
    // 로그인되지 않은 상태에서 회원가입은 예외처리
    if (result.toJS().fail && customHistory.location.pathname !== '/register') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('checkAdmin');
      localStorage.removeItem('branchName');
      customHistory.push('/login');
    }

    return false;
  }

  componentDidUpdate() {
    // rendering 이전에 이루어지는 것은 getDerivedStateFromProps에서 작동하는 것을 권장
    const { result } = this.props;
    const resultInfo = result.toJS();

    resultInfo.checkAdmin || (resultInfo.info && resultInfo.info.admin)
      ? this.setState({ admin: true })
      : this.setState({ admin: false });
  }

  componentWillUnmount() {
    this.resetLocalStorage();
  }

  initializeUserInfo = async () => {
    const { AuthActions, result } = this.props;
    const { customHistory } = this.props;

    // #1 초기 한번 작동을 하는데 있어서 필요가 없어보여 주석 처리
    // 로그인 정보를 로컬스토리지에서 가져옵니다.
    // const loggedInfo = localStorage.getItem('accessToken');

    // 로그인 정보가 없다면 여기서 멈춥니다.
    // if (!loggedInfo) return;
    try {
      // Auth Check
      await AuthActions.checkStatus();
      // #2 this.props 위에서 선언하도록 변경 진행
      const loggedInfo = result.toJS();

      // Fail login
      // 로그인 관련 정보가 맞지 않을 경우
      if (loggedInfo.success && loggedInfo.success === false) {
        this.resetLocalStorage();
        customHistory.push('/login');
      }
    } catch (e) {
      console.error(e);
      this.resetLocalStorage();
      // customHistory.push('/login');
    }
  };

  // reset localStorage
  resetLocalStorage = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('checkAdmin');
    localStorage.removeItem('branchName');
  };

  render() {
    const { store } = this.props;
    const { customHistory } = this.state;

    return (
      <Provider store={store}>
        <Router history={customHistory}>
          <>
            {/* Common router : 관리자와 사용자 공통 라우터 */}
            <Route exact component={UserRegister} path="/register" />
            <Route component={Login} path="/login" />
            <Route exact component={Login} path="/" />
            {this.state.admin ? <AdminRouter /> : <UserRouter />}
          </>
        </Router>
      </Provider>
    );
  }
}

const AdminRouter = () => {
  const ADMIN_PATH = '/admin';

  return (
    <>
      {/* Admin router : 관리자 라우터 */}
      <Route exact component={AdminUser} path={`${ADMIN_PATH}/users`} />
      <Route exact component={AdminOrderList} path={`${ADMIN_PATH}/orderlist`} />
      <Route exact component={AdminReleaseList} path={`${ADMIN_PATH}/releaselist`} />
      <Route exact component={AdminProduct} path={`${ADMIN_PATH}/product`} />
      <ToastContainer
        position="bottom-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange={false}
        draggable
      />
    </>
  );
};

const UserRouter = () => (
  <>
    {/* User router : 사용자 라우터 */}
    <Route exact component={UserProduct} path="/product" />
    <Route exact component={UserOrderList} path="/orderlist" />
    <Route exact component={UserReleaseList} path="/releaselist" />
  </>
);

export default connect(
  state => ({
    result: state.auth.get('result'),
  }),
  dispatch => ({
    AuthActions: bindActionCreators(AuthActions, dispatch),
    OrderListActions: bindActionCreators(OrderListActions, dispatch),
  }),
)(App);
