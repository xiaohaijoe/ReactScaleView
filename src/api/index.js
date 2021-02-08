import { formatAxios } from './agent';
/**
 * 创建api对象
 */
const Api = {};

const requireContext = require.context('./', false, /\.api.js$/);
requireContext.keys().forEach(path => {
  const apiObject = requireContext(path).default;
  if (apiObject) {
    const key = path.match(/\.\/(\w+).api/)[1];
    Api[key] = apiObject;

    for (const name in apiObject) {
      const singleConfig = apiObject[name];
      // 区分两种业务，支持函数直接请求，直接对象写法
      if (typeof singleConfig === 'function') {
        apiObject[name] = (arg = {}) => {
          // 调用的时候传入 Api.xxx
          return formatAxios({ ...singleConfig(arg) });
          // return $axios({ ...singleConfig(arg) });
        };
      } else {
        apiObject[name] = (arg = {}) =>
          formatAxios({ ...singleConfig, data: arg });
      }
    }
  }
});

export default Api;
