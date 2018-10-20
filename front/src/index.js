import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import configureStore from './redux/configureStore';

const store = configureStore();

ReactDOM.render(<App store={store}/>, document.getElementById('root'));
