import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
// import { configure } from 'mobx';
// import { Provider } from 'mobx-react';

import '@/assets/index.less';
import '@/assets/App.less';

import App from './App';
import * as serviceWorker from './serviceWorker';

// import commonStore from './stores/commonStore';
// import authStore from './stores/authStore';

// const stores = {
//   commonStore,
//   authStore,
// };

// For easier debugging
// if (process.env.NODE_ENV === 'development') {
//   window.__APP_STATE__ = stores;
// }

// configure({
//   enforceActions: 'always',
// });

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
