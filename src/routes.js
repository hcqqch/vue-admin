import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import ShopHome from './views/shop/shophome.vue'
import ShopInfo from './views/shop/shopinfo.vue'
import Survey from './views/shop/survey.vue'

import CommodityList from './views/commodity/commoditylist.vue'
import AddCommodity from './views/commodity/addcommodity.vue'
import Classification from './views/commodity/classification.vue'
import SetLabel from './views/commodity/setLabel.vue'
import Comment from './views/commodity/comment.vue'
import ConsultRecord from './views/commodity/consultRecord.vue'
import addFremb from './views/commodity/addfremb.vue'
import TemplateList from './views/commodity/templatelist.vue'
import CustomClassify from './views/commodity/customclassify.vue'
import Order from './views/order/Order.vue'
import BackOrder from './views/order/backorder.vue'
import BackApply from './views/order/backapply.vue'
import CoupleList from './views/markting/coupleList.vue'
import CouponRecord from './views/markting/couponRecord.vue'
import EditCoupon from './views/markting/editcoupon.vue'
import Activity from './views/markting/activity.vue'
import EditActivity from './views/markting/editactivity.vue'
import ShopMail from './views/markting/shopmail.vue'
import Account from './views/assets/account.vue'
import AccountDetail from './views/assets/accountdetail.vue'
import CircleInfo from './views/circle/circleinfo.vue'
import SetCircle from './views/circle/setcircle.vue'
import SideBar from './views/circle/sidebar.vue'
import Dynamic from './views/circle/dynamic.vue'

import Briefing from './views/data/briefing.vue'
import OrderStatic from './views/data/orderstatic.vue'
import CancelRate from './views/data/cancelrate.vue'
import CommodityRank from './views/data/commodityrank.vue'
import ExpandStatic from './views/data/expandstatic.vue'
import Distibution from './views/data/distibution.vue'
import ShopSetting from './views/setting/shopsetting.vue'
import SelfInfomation from './views/setting/selfinfomation.vue'
import DeptManager from './views/setting/deptmanager.vue'
import PersonManage from './views/setting/personmanage.vue'
import OperationLog from './views/setting/operationlog.vue'



let routes = [{
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '店铺管理',
        iconCls: 'el-icon-my-shop', //图标样式class
        children: [
            // { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/survey', component: Survey, name: '店铺概况' },
            { path: '/shopinfo', component: ShopInfo, name: '店铺信息' },
            { path: '/shophome', component: ShopHome, name: '店铺主页' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '商品管理',
        iconCls: 'el-icon-my-goods',
        children: [
            // { path: '/chatroom', component: ChatRoom, name: '聊天室' },
            { path: '/commoditylist', component: CommodityList, name: '商品列表' },
            { path: '/addcommodity', component: AddCommodity, name: '创建新品' },
            { path: '/classification', component: Classification, name: '分类规格' },
            { path: '/label', component: SetLabel, name: '标签管理' },
            { path: '/comment', component: Comment, name: '商品评论' },
            { path: '/consult', component: ConsultRecord, name: '咨询记录' },
            { path: '/addcommodity/addfremb', component: addFremb, name: '模板设置', hidden: true },
            { path: '/addcommodity/addfremb/:id', component: addFremb, name: '模板设置', hidden: true },
            { path: '/addcommodity/templatelist', component: TemplateList, name: '模板管理' },
            { path: '/customclassify', component: CustomClassify, name: '店铺自定义分类' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '订单管理',
        iconCls: 'el-icon-my-order',
        children: [
            { path: '/order', component: Order, name: '订单查询' },
            { path: '/backorder', component: BackOrder, name: '退货订单' },
            { path: '/backapply', component: BackApply, name: '申请详情', hidden: true },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '营销管理',
        iconCls: 'el-icon-my-markting',
        children: [
            { path: '/couple', component: CoupleList, name: '优惠券列表' },
            { path: '/editcoupon/', component: EditCoupon, name: '新增优惠券', hidden: true },
            { path: '/couponrecord/', component: CouponRecord, name: '领取使用记录', hidden: true },
            { path: '/activity', component: Activity, name: '满减活动' },
            { path: '/editactivity/', component: EditActivity, name: '新增活动', hidden: true },
            { path: '/shopmail', component: ShopMail, name: '店铺包邮' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '资产管理',
        iconCls: 'el-icon-my-money',
        children: [
            { path: '/account', component: Account, name: '账户总览' },
            { path: '/accountdetail', component: AccountDetail, name: '账单明细' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '数据管理',
        iconCls: 'el-icon-my-data',
        children: [
            { path: '/briefing', component: Briefing, name: '经营简报' },
            { path: '/orderstatic', component: OrderStatic, name: '订单统计' },
            { path: '/cancelrate', component: CancelRate, name: '复消率' },
            { path: '/commodityrand', component: CommodityRank, name: '商品排行' },
            { path: '/expandstatic', component: ExpandStatic, name: '客户增长统计' },
            { path: '/distibution', component: Distibution, name: '客户分布' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '设置管理',
        iconCls: 'el-icon-my-setting',
        children: [
            { path: '/shopsetting/', component: ShopSetting, name: '店铺设置' },
            { path: '/selfinfomation', component: SelfInfomation, name: '个人信息' },
            { path: '/deptmanage', component: DeptManager, name: '部门管理' },
            { path: '/personmanage', component: PersonManage, name: '人员管理' },
            { path: '/operationlog', component: OperationLog, name: '操作日志' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '商圈管理',
        iconCls: 'el-icon-my-circle',
        children: [
            { path: '/circleinfo', component: CircleInfo, name: '商圈信息' },
            { path: '/setcircle', component: SetCircle, name: '商圈设置' },
            { path: '/sidebar', component: SideBar, name: '商圈侧栏管理' },
            { path: '/dynamic', component: Dynamic, name: '动态管理' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;