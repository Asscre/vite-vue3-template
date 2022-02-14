import axios from 'axios';

import { ElNotification, ElMessageBox } from 'element-plus';
// import { getCookie, removeCookie } from './cookie';

let debounceTime = null;

/**
 * 配置文件上传下载、业务增删改查接口
 */

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASEURL,
  timeout: 30000,
  validateStatus: (status) => status === 200, // 200 外的状态码都认定为失败
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) =>
    // if (store.getters.token) {
    //   config.headers["Authentication"] = getCookie("token");
    // }
    config,
  (error) => Promise.reject(error)
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.code !== 200) {
      const { data, url, method, params } = response.config;

      const errorInfo = `错误消息：${res.message}；失败Code：${
        res.code
      }；失败接口地址：${url}；参数：${
        method === 'get' ? JSON.stringify(params) : data
      }；`;
      ElNotification({
        title: '错误',
        message: res.message,
        type: 'error',
      });
      return Promise.reject(new Error(errorInfo || 'Error'));
    }
    if (res.status === 'error') {
      ElNotification({
        title: '错误',
        message: res.message,
        type: 'error',
      });
    } else {
      res.message &&
        ElNotification({
          title: '成功',
          message: res.message,
          type: 'success',
        });
      return res;
    }
  },
  (error) => {
    const { status, data } = error.response;
    // const {status, config, data} = error.response
    console.log(error.response);

    debounceTime && clearTimeout(debounceTime);
    debounceTime = setTimeout(() => {
      // 401 没token
      if (status === 401) {
        ElNotification({
          title: '错误',
          message: `系统提示：${status}，当前请求未带token`,
          type: 'error',
        });
      } else if (status === 402) {
        // 402 被登出
        // removeCookie('token');
        ElMessageBox.confirm(
          `系统提示：${status}，很抱歉，您的账号已再其他地方登录，请点击提示弹框“重新登录”按钮', '挤退下线重新登录`,
          '警告',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
          .then(() => {
            location.reload();
          })
          .catch(() => {
            console.log('取消删除');
          });
      } else if (status === 500) {
        ElNotification({
          title: '错误',
          message: `系统提示：${status}，${data.message}`,
          type: 'error',
        });
      }
    }, 100);
    return Promise.reject(error);
  }
);

export default service;
