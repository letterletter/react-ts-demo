import request from '../utils/request'
//测试接口信息

export function reqLogin(data:object) {
  return request('/doLogin', 'POST', data, {})
}

export function getMenuAndBtnListApi() {
  return request('/role/find/menu/all', 'GET')
}
// export function testInterfaceConApi(params) {
//   let url = `/api/webapi/testCon`
//   // let nurl = encodeURI(url)
//   // console.log(nurl)
//   let obj = {data: params}
//   return request(url, 'GET', {}, obj)
// }

// //获取当前用户的所有webapi连接配置
// export function getWebApiConfigsApi(params) {
//   let url = '/api/connectionConfig/getWebApiConfigs'
//   return request(url, 'GET', {}, params)
// }

// //保存连接配置
// export function saveConApi(params) {
//   let url = '/api/webapi/saveCon'
//   return request(url, 'POST', {}, params)
// }

// //验证字段配置路径
// export function validatePathApi(params) {
//   let url = '/api/webapi/validatePath'
//   return request(url, 'GET', {}, params)
// }


// //获取指定连接配置
// export function getSpecifyConApi(params) {
//   let url = '/api/webapi/getCon'
//   return request(url, 'GET', {}, params)
// }

// //编辑连接配置
// export function editConApi(params) {
//   let url = '/api/webapi/editCon'
//   return request(url, 'PUT', {}, params)
// }