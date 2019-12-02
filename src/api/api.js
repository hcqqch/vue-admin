import axios from 'axios';

let base = 'http://office.pintaihui.cn/api/v1/';
// 登录
export const requestLogin = params => {
    return axios.post(`${base}login`, {
        params: params
    });
};
// 登出
export const requestLogout = (params, config) => {
    // return axios.post(`${base}logout`,data: {}, config);
};
// 根据账号查询店铺
export const getShops = (params, config) => {
    return axios.post(`${base}getshops`, {
        data: params
    }, config);
};
// 根据店铺查询员工
export const checkAccount = (params, config) => {
    return axios.post(`${base}checkaccount`, {
        data: params
    }, config);
};
// 获取店铺信息
export const getInformation = params => {
    return axios.get(`${base}shop/information`, {
        params: params
    });
};
// 提交店铺信息
export const submitInformation = (params, config) => {
    return axios.post(`${base}shop/information`, params, config);
};
// 提交店铺主页信息
export const submitHomepageinfo = (params, config) => {
    return axios.post(`${base}shop/homepage`, params, config);
};