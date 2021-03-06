import axios from 'axios'
let base = 'https://office.pintaihui.cn';

// 登录
export const requestLogin = params => {
    return axios.post(`${base}/api/v1/login`, params, config);
};
// 登出
export const requestLogout = (params, config) => {
    return axios.post(`${base}/api/v1/logout`, params, config);
};
// 根据账号查询店铺
export const getShops = (params, config) => {
    return axios.post(`${base}/api/getshops`, params, config);
};
// 根据店铺查询员工
export const checkAccount = (params, config) => {
    return axios.post(`${base}/api/v1/checkaccount`, params, config);
};


// 店铺概况
export const getShopInfo = params => {
    return axios.get(`${base}/api/v1/statistics/information`, {
        params: params
    });
};
// 获取店铺信息
export const getInformation = params => {
    return axios.get(`${base}/api/v1/shop/information`, {
        params: params
    });
};
// 提交店铺信息
export const submitInformation = (params, config) => {
    return axios.post(`${base}/api/v1/shop/information`, params, config);
};


// 获取店铺主页信息
export const getHomeInformation = params => {
    return axios.get(`${base}/api/v1/shop/homepage`, {
        params: params
    });
};
// 提交店铺主页信息
export const submitHomepageinfo = (params, config) => {
    return axios.post(`${base}/api/v1/shop/homepage`, params, config);
};


// 获取发布商品的基本信息
export const getAddgoodsInfo = params => {
    return axios.get(`${base}/api/v1/goods/add`, {
        params: params
    });
};
// 发布商品
export const submitAddgoods = (params, config) => {
    return axios.post(`${base}/api/v1/goods/add`, params, config);
};

// 获取所有的Tag
export const getTaglist = params => {
    return axios.get(`${base}/api/v1/goods/tag/lists`, {
        params: params
    });
};
// 添加tag
export const addTag = (params, config) => {
    return axios.post(`${base}/api/v1/goods/tag/add`, params, config);
};
// 修改tag
export const updateTag = (params, config) => {
    return axios.post(`${base}/api/v1/goods/tag/update`, params, config);
};
// 删除tag
export const deleteTag = (params, config) => {
    return axios.post(`${base}/api/v1/goods/tag/delete`, params, config);
};


// 获取所有的店铺的分类
export const getCategorylist = params => {
    return axios.get(`${base}/api/v1/shop/category/lists`, {
        params: params
    });
};
// 添加店铺的分类
export const addCategory = (params, config) => {
    return axios.post(`${base}/api/v1/shop/category/add`, params, config);
};
// 修改店铺的分类
export const editCategory = (params, config) => {
    return axios.post(`${base}/api/v1/shop/category/update`, params, config);
};
// 删除店铺的分类
export const deleteCategory = (params, config) => {
    return axios.post(`${base}/api/v1/shop/category/delete`, params, config);
};
// 排序店铺的分类
export const sortCategory = (params, config) => {
    return axios.post(`${base}/api/v1/shop/category/sort`, params, config);
};



// 获取系统规格和自定义规格
export const getNormslist = params => {
    return axios.get(`${base}/api/v1/goods/norms/lists`, {
        params: params
    });
};
// 添加自定义规格
export const addNorms = (params, config) => {
    return axios.post(`${base}/api/v1/goods/norms/add`, params, config);
};
// 获取所有分类列表
export const getKindlist = params => {
    return axios.get(`${base}/api/v1/goods/category/lists`, {
        params: params
    });
};
// 申请商品新分类
export const addGoodsNewlist = (params, config) => {
    return axios.post(`${base}/api/v1/goods/category/addAll`, params, config);
};

// 设置运费模板
export const setFreightTmplate = (params, config) => {
    return axios.post(`${base}/api/v1/goods/add_goods_freight_template`, params, config);
};
// 获取运费模板列表
export const getTemplist = params => {
    return axios.get(`${base}/api/v1/goods/get_freight_template_all`, {
        params: params
    });
};
// 获取编辑运费模板
export const getTempDetail = params => {
    return axios.get(`${base}/api/v1/goods/get_freight_template`, {
        params: params
    });
};
// 更新运费模板
export const editFreightTmplate = (params, config) => {
    return axios.post(`${base}/api/v1/goods/update_freight_template`, params, config);
};
// 删除运费模板
export const delFreightTmplate = (params, config) => {
    return axios.post(`${base}/api/v1/goods/delete_freight_template`, params, config);
};

//商品列表
export const getGoodlist = (params, config) => {
    return axios.get(`${base}/api/v1/goods/lists`, {
        params: params
    }, config);
};
// 商品列表获取商品分类
export const getGoodsCategory = params => {
    return axios.get(`${base}/api/v1/goods/get_category_list`, {
        params: params
    });
};
// 获取编辑商品信息
export const getEditGoods = params => {
    return axios.get(`${base}/api/v1/goods/update`, {
        params
    });
};
// 编辑商品
// export const editGoods = params => {
//     return axios.get(`${base}/api/v1/goods/update`, {
//         params
//     });
// };
// 商品列表上架下架
export const goodsOperate = params => {
    return axios.post(`${base}/api/v1/goods/operate`, params);
};

// 上架商品排序
export const upperGoodsSort = params => {
    return axios.get(`${base}/api/v1/goods/listsname`, {
        params
    });
};


//满减活动管理
export const fullScaleAdd = (params, config) => {
    return axios.post(`${base}/api/v1/shop/full_scale/add`, params, config);
};
//编辑满减活动
export const getFullScaleDetail = (params, config) => {
    return axios.get(`${base}/api/v1/shop/full_scale/update`, {
        params
    }, config);
};
//编辑满减活动
export const fullScaleEdit = (params, config) => {
    return axios.post(`${base}/api/v1/shop/full_scale/update`, params, config);
};
// 满减活动列表
export const fullScaleList = params => {
    return axios.get(`${base}/api/v1/shop/full_scale/lists`, {
        params
    });
};
// 结束活动
export const OverFullScale = params => {
    return axios.post(`${base}/api/v1/shop/full_scale/update_end`, params);
};

// 优惠券列表
// export const OverFullScale = params => {
//     return axios.post(`${base}/api/v1/shop/full_scale/update_end`, params);
// };
//新增优惠券
export const couponAdd = (params, config) => {
    return axios.post(`${base}/api/v1/shop/coupon/add`, params, config);
};
//编辑优惠券
export const couponEdit = params => {
    return axios.post(`${base}/api/v1/shop/coupon/edit`, params);
};
// 优惠券列表
export const couponList = params => {
    return axios.get(`${base}/api/v1/shop/coupon/lists`, {
        params
    });
};
// 优惠券批量操作
export const couponOpreate = params => {
    return axios.post(`${base}/api/v1/shop/coupon/operate`, params);
};
// 优惠券领取使用记录
export const couponRecordList = params => {
    return axios.get(`${base}/api/v1/shop/coupon/get_lists`, {
        params
    });
};

// 获取店铺包邮 
export const getShopmail = params => {
    return axios.get(`${base}/api/v1/shop/free_shipping/add`, {
        params
    });
};
// 提交店铺包邮
export const addShopmail = (params, config) => {
    return axios.post(`${base}/api/v1/shop/free_shipping/add`, params, config);
};

// 店铺设置
export const shopSetting = (params, config) => {
    return axios.post(`${base}/api/v1/shop/setting`, params, config);
};
// 获取店铺设置
export const getshopSetting = (params, config) => {
    return axios.get(`${base}/api/v1/shop/setting`, {
        params
    }, config);
};


// 获取所有部门
export const getDeptList = (params, config) => {
    return axios.get(`${base}/api/v1/shop/department/lists`, {
        params
    }, config);
};
// 获取权限树
export const getPermission = (params, config) => {
    return axios.get(`${base}/api/v1/shop/department/permission`, {
        params
    }, config);
};
// 添加新部门
export const addDept = (params, config) => {
    return axios.post(`${base}/api/v1/shop/department/add`, params, config);
};
// 给部门添加权限
export const addPermission = (params, config) => {
    return axios.post(`${base}/api/v1/shop/department/permission`, params, config);
};
// 删除部门
export const delDept = (params, config) => {
    return axios.post(`${base}/api/v1/shop/department/delete`, params, config);
};
// 修改部门
export const updateDept = (params, config) => {
    return axios.post(`${base}/api/v1/shop/department/update`, params, config);
};
// 获取单条部门信息
export const getUpdateDept = (params, config) => {
    return axios.get(`${base}/api/v1/shop/department/update`, {
        params
    }, config);
};


// 添加员工
export const addEmployee = (params, config) => {
    return axios.post(`${base}/api/v1/shop/employee/add`, params, config);
};
// 修改员工
export const updateEmployee = (params, config) => {
    return axios.post(`${base}/api/v1/shop/employee/update`, params, config);
};
// 获取单条员工信息
export const getUpdateEmployee = (params, config) => {
    return axios.get(`${base}/api/v1/shop/employee/update`, {
        params
    }, config);
};
// 获取员工列表
export const getEmployeeList = (params, config) => {
    return axios.get(`${base}/api/v1/shop/employee/lists`, {
        params
    }, config);
};
// 删除员工
export const delEmployee = (params, config) => {
    return axios.post(`${base}/api/v1/shop/employee/delete`, params, config);
};



// 操作日志
export const getLoglist = (params, config) => {
    return axios.get(`${base}/api/v1/shop/log/lists`, {
        params
    }, config);
};
// 删除日志
export const delLog = (params, config) => {
    return axios.post(`${base}/api/v1/shop/log/operate`, params, config);
};


// 获取个人信息
export const getEmployeeInfo = (params, config) => {
    return axios.get(`${base}/api/v1/shop/employee/information`, {
        params
    }, config);
};
// 修改个人密码
export const updatePsd = (params, config) => {
    return axios.post(`${base}/api/v1/shop/employee/update_password`, params, config);
};
// 修改联系电话
export const updateMobile = (params, config) => {
    return axios.post(`${base}/api/v1/shop/employee/update_phone`, params, config);
};
// 绑定账号
export const bindAccount = (params, config) => {
    return axios.post(`${base}/api/v1/shop/employee/bind_user`, params, config);
};
// 解绑账号
export const unbindAccount = (params, config) => {
    return axios.post(`${base}/api/v1/shop/employee/unbind_user`, params, config);
};


// 设置圈子
export const setCircle = (params, config) => {
    return axios.post(`${base}/api/v1/shop/circle/setting`, params, config);
};
// 获取圈子信息
export const getCircleInfo = (params, config) => {
    return axios.get(`${base}/api/v1/shop/circle/setting`, {
        params
    }, config);
};
// 商圈信息
export const getCircle = (params, config) => {
    return axios.get(`${base}/api/v1/shop/circle/information`, {
        params
    }, config);
}



// 添加商圈侧栏商品
export const addCircleRight = (params, config) => {
    return axios.post(`${base}/api/v1/shop/circle/add_goods`, params, config);
};
// 获取侧栏商品列表
export const getCircleRightList = (params, config) => {
    return axios.get(`${base}/api/v1/shop/circle/get_goods`, {
        params
    }, config);
};
// 删除侧栏右侧商品
export const delCircleRight = (params, config) => {
    return axios.post(`${base}/api/v1/shop/circle/delete_goods`, params, config);
};
// 排序侧栏右侧商品
export const sortCircleRight = (params, config) => {
    return axios.post(`${base}/api/v1/shop/circle/sort`, params, config);
};


// 获取动态列表
export const getDynamicList = (params, config) => {
        return axios.get(`${base}/api/v1/shop/circle/get_feeds`, {
            params
        }, config);
    }
    // 商圈动态批量操作
export const circleOperate = (params, config) => {
    return axios.post(`${base}/api/v1/shop/circle/operate`, params, config);
};


// 商品评论
export const getCommentList = (params, config) => {
        return axios.get(`${base}/api/v1/order/comment/lists`, {
            params
        }, config);
    }
    // 回复商品评论
export const replyComment = (params, config) => {
    return axios.post(`${base}/api/v1/order/comment/reply`, params, config);
};

// 咨询记录
export const talkList = (params, config) => {
    return axios.get(`${base}/api/v1/goods/talk/lists`, {
        params
    }, config);
}

// 订单管理
export const orderList = (params, config) => {
        return axios.get(`${base}/api/v1/order/lists`, {
            params
        }, config);
    }
    // 订单发货
export const sendGoods = (params, config) => {
    return axios.post(`${base}/api/v1/order/send_goods`, params, config);
};
// 获取快递公司
export const getOrderExpress = (params, config) => {
        return axios.get(`${base}/api/v1/order/express`, {
            params
        }, config);
    }
    // 退货订单列表
export const getRefundlist = (params, config) => {
        return axios.get(`${base}/api/v1/order/return_lists`, {
            params
        }, config);
    }
    // 退货订单操作
export const backOrderOperate = (params, config) => {
    return axios.post(`${base}/api/v1/order/operate`, params, config);
};
// 退换申请
export const getRefundApply = (params, config) => {
    return axios.get(`${base}/api/v1/order/refund_lists`, {
        params
    }, config);
}


// 账户总览
export const getWallet = (params, config) => {
        return axios.get(`${base}/api/v1/shop/wallet/get`, {
            params
        }, config);
    }
    // 账单明细
export const getBillDetail = (params, config) => {
        return axios.get(`${base}/api/v1/shop/bill_log/get`, {
            params
        }, config);
    }
    // 提现
export const postWallet = (params, config) => {
    return axios.post(`${base}/api/v1/shop/wallet/post`, params, config);
};


// 地区分布
export const areaDistribution = (params, config) => {
    return axios.get(`${base}/api/v1/statistics/customer_area`, {
        params
    }, config);
}

// 客户增长统计
export const getCustomerInc = (params, config) => {
    return axios.get(`${base}/api/v1/statistics/customer_incr`, {
        params
    }, config);
}

// 商品排行
export const getGoodsRank = (params, config) => {
        return axios.get(`${base}/api/v1/statistics/goods_top`, {
            params
        }, config);
    }
    // 负消率
export const getBuyers = (params, config) => {
        return axios.get(`${base}/api/v1/statistics/buyers`, {
            params
        }, config);
    }
    // 经营简报
export const getReport = (params, config) => {
        return axios.get(`${base}/api/v1/statistics/report`, {
            params
        }, config);
    }
    // 订单统计
export const getOrderStatic = (params, config) => {
        return axios.get(`${base}/api/v1/statistics/total`, {
            params
        }, config);
    }
    // 交换名片
export const changeCard = (params, config) => {
    return axios.post(`${base}/api/v1/statistics/exchange_card`, params, config);
};