let baseUrl = "";// 设置请求地址
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = "http://test.local.helianhealth.com:9696/manager"  //这里是本地开发的请求url
    break
  case 'test':
    baseUrl = "http://test.com/"  //这里是测试环境中的url
    break
  case 'production':
    baseUrl = "https://www.prod.com/"   //生产环境url
    break
}

export default baseUrl;
