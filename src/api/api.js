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


// 获取店铺主页信息
export const getHomeInformation = params => {
    return axios.get(`${base}shop/homepage`, {
        params: params
    });
};
// 提交店铺主页信息
export const submitHomepageinfo = (params, config) => {
    return axios.post(`${base}shop/homepage`, params, config);
};


// 获取发布商品的基本信息
export const getAddgoodsInfo = params => {
    return axios.get(`${base}goods/add`, {
        params: params
    });
};
// 发布商品
export const submitAddgoods = (params, config) => {
    return axios.post(`${base}goods/add`, params, config);
};

// 获取所有的Tag
export const getTaglist = params => {
    return axios.get(`${base}goods/tag/lists`, {
        params: params
    });
};
// 添加tag
export const addTag = (params, config) => {
    return axios.post(`${base}goods/tag/add`, params, config);
};
// 修改tag
export const updateTag = (params, config) => {
    return axios.post(`${base}goods/tag/update`, params, config);
};
// 删除tag
export const deleteTag = (params, config) => {
    return axios.post(`${base}goods/tag/delete`, params, config);
};


// 获取所有的店铺的分类
export const getCategorylist = params => {
    return axios.get(`${base}shop/category/lists`, {
        params: params
    });
};
// 添加店铺的分类
export const addCategory = (params, config) => {
    return axios.post(`${base}shop/category/add`, params, config);
};
// 修改店铺的分类
export const editCategory = (params, config) => {
    return axios.post(`${base}shop/category/update`, params, config);
};
// 删除店铺的分类
export const deleteCategory = (params, config) => {
    return axios.post(`${base}shop/category/delete`, params, config);
};
// 排序店铺的分类
export const sortCategory = (params, config) => {
    return axios.post(`${base}shop/category/sort`, params, config);
};



// 获取系统规格和自定义规格
export const getNormslist = params => {
    return axios.get(`${base}goods/norms/lists`, {
        params: params
    });
};
// 添加自定义规格
export const addNorms = (params, config) => {
    return axios.post(`${base}goods/norms/add`, params, config);
};
// 获取所有分类列表
export const getKindlist = params => {
    return axios.get(`${base}goods/category/lists`, {
        params: params
    });
};
// 申请商品新分类
export const addGoodsNewlist = (params, config) => {
    return axios.post(`${base}goods/category/addAll`, params, config);
};

// 设置运费模板
export const setFreightTmplate = (params, config) => {
    return axios.post(`${base}goods/add_goods_freight_template`, params, config);
};
// 获取运费模板列表
export const getTemplist = params => {
    return axios.get(`${base}goods/get_freight_template_all`, {
        params: params
    });
};
// 获取编辑运费模板
export const getTempDetail = params => {
    return axios.get(`${base}goods/get_freight_template`, {
        params: params
    });
};
// 更新运费模板
export const editFreightTmplate = (params, config) => {
    return axios.post(`${base}goods/update_freight_template`, params, config);
};
// 删除运费模板
export const delFreightTmplate = (params, config) => {
    return axios.post(`${base}goods/delete_freight_template`, params, config);
};