import axios from 'axios';
// import { Toast } from 'antd';
import { API_ROOT, API_CONTEXT, MOCK_ROOT } from '@/config';

import authStore from '@/stores/authStore';

const requestConfigAdapter = config => {
  const { isMock, ...arg } = config;
  let API_BASE = API_ROOT + API_CONTEXT;
  if (isMock) {
    API_BASE = MOCK_ROOT;
  }
  return {
    ...arg,
    url: `${API_BASE}${arg.url}`,
  };
};

axios.interceptors.request.use(config => {
  if (authStore.token) {
    config.headers['token'] = `${authStore.token}`;
  }
  // Toast.loading('加载中...', 0);
  return config;
});

axios.interceptors.response.use(
  response => {
    // Toast.hide();
    const body = response.data;
    if (body.code === 0 || body.code === 200) {
      // 请求成功
      return body.data || true;
    } else if (body.code === 403) {
      // token失效
      authStore.logout();
      return Promise.reject();
    } else {
      // Toast.fail(body.message);
      return Promise.reject();
    }
  },
  error => {
    // Toast.hide();
    // Toast.fail('服务器异常，请稍后再试');
    return Promise.reject();
  }
);

export const formatAxios = arg => {
  arg = requestConfigAdapter(arg);
  return axios(arg).then(res => res);
};
