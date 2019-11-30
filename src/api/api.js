import axios from 'axios';

let base = 'http://office.pintaihui.cn/api/v1/';
// 登录
export const requestLogin = params => { return axios.post(`${base}login`, { params: params }); };
// 获取店铺信息
export const getInformation = params => { return axios.get(`${base}shop/information`, { params: params }); };
// 提交店铺信息
export const submitInformation = params => { return axios.post(`${base}shop/information`, { params: params }); };