import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import Loadable from 'react-loadable';
import { AppContainer } from 'react-hot-loader';
// import { useStrict } from 'mobx';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import Uuid from 'uuid';
import { clientCreateStore } from './stores';
import App from './containers/app';

// useStrict(true);
const store = clientCreateStore();
const browserHistory = createBrowserHistory();

// 设置请求超时
axios.defaults.timeout = 6000;
axios.defaults.withCredentials = true;
// 拦截axios 处理token信息
axios.interceptors.request.use(
  axiosConfig => {
    if (!axiosConfig.isCancelTocken) {
      axiosConfig.headers['auth-id'] = Uuid.v4();
      axiosConfig.headers['auth-token'] = 'sc-pl';
      axiosConfig.headers['Cache-Control'] = 'no-cache';
    }
    if (!axiosConfig.params) {
      axiosConfig.params = {
        timestamp: new Date().getTime()
      };
    } else {
      axiosConfig.params.timestamp = new Date().getTime();
    }
    return axiosConfig;
  },
  error => {
    console.log('request error', error);
  }
);

axios.interceptors.response.use((response) => response, (error) => {
  if (axios.isCancel(error)) {
    return Promise.reject(error);
  }
  if (error && error.response) {
    // window.location.href = '/';
  }
  return Promise.reject(error);
});

const target = document.getElementById('root');
const renderApp = Component => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <AppContainer>
        <Provider {...store}>
          <BrowserRouter>
            <Component />
          </BrowserRouter>
        </Provider>
      </AppContainer>,
      target
    );
  });
};
renderApp(App);

if (module.hot) {
  module.hot.accept('./containers/app', () => {
    const NextApp = require('./containers/app').default;
    renderApp(NextApp);
  });
}