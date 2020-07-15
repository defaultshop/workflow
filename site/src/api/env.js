let baseURL = "";

switch (process.env.NODE_ENV) {
  case "production":
    // baseURL = "http://ei2020.baitutech.cn:8888/api/services/";
    baseURL = "http://ei.test2.dev.baitu.com/api/services/";
    // baseURL = "https://registry.baitutech.cn/api/services/";
    break;
  case "test":
    baseURL = "http://ei.test2.dev.baitu.com/api/services/";
    break;
  default:
    // baseURL = 'http://ei.test2.dev.baitu.com/api/services/'
    baseURL = "http://ei.test2.dev.baitu.com/api/services/";
    // baseURL = 'http://lsrxbm.baitutech.cn/api/services/'
    // baseURL = '/api/services/';

    break;
}

export default baseURL;
