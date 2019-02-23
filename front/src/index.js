import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import configureStore from './redux/configureStore';

import './index.scss';

// Create Redux
const store = configureStore();

ReactDOM.render(<App store={store} />, document.getElementById('imhome'));
