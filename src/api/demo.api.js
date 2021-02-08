export default {
  getTest(data) {
    return {
      url: '/text/get',
      method: 'get',
      data,
    };
  },
  getPost(params) {
    return {
      url: '/test/post',
      method: 'post',
      params,
    };
  },
};
