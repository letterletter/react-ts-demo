import axios, {AxiosRequestConfig, Method, AxiosResponse, AxiosError} from 'axios';
import {notification} from 'antd';

const key = 'keepOnlyOne';
axios.defaults.headers.common['token'] = localStorage.getItem('authorization')
const request = function getDataFromServer(apiUrl:any, method:Method, data={}, params={}) {

  let timeout = 60000

  /**
   * 返回的Promise对象含有then、catch方法
   */
  return new Promise(function (resolve, reject) {
    const config: AxiosRequestConfig = {
      url:apiUrl,
      method: method,
      params: params,
      data: data,
      timeout: timeout,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token'),
        // 'token': window.sessionStorage.getItem('token') || '',
        'token': localStorage.getItem('authorization')
      }
  }
    axios({
      url:apiUrl,
      method: method,
      params: params,
      data: data,
      timeout: timeout,
      headers: {
        'Content-Type': 'application/json',
        // 'token': window.sessionStorage.getItem('token') || '',
        'token': localStorage.getItem('authorization')
      }
  }).then(function (response: AxiosResponse) {
    if(response){
      // console.log('response', response, apiUrl)
      if (response.data && (response.data.code === 200)) {
        resolve(response.data);
      } else if(response.data && (response.data.code === 401)) {
        // window.location.href = '/#/login';
      }else if(response.data.code === 201) {
        notification.error({
          message: '操作失败',
          description:'操作失败'
        })
      }else if(response.data.code === 207) {//统一用户已登录过，但在该平台未登录
        
      }
       else {
        notification.error({
          key,
          message: '操作失败',
          description: '操作失败'//response.data.msg
        });
        resolve(response);
      }
    } else {
      console.log('sdsds')
      //处理特殊的情况就是response返回什么也没有
      notification.error({
        key,
        message: '操作失败',
        description: '操作失败' 
      });
      resolve(response);
      // window.location='/'
    }
  }
  ).catch((error:AxiosError) => {
    console.log('error',error)
    if(error.response && error.response.status === 405) {
      window.location.href = '/#/login';
    } else {
      notification.error({
        key,
        message: '操作失败',
        description: '网络异常,请稍后重试'
      });
    }
      reject(error);
    })
  })
}

export default request;
