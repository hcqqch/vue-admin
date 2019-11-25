import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import ShopHome from './views/shop/shophome.vue'
import ShopInfo from './views/shop/shopinfo.vue'
import Survey from './views/shop/survey.vue'
import CommodityList from './views/commodity/commoditylist.vue'
import AddCommodity from './views/commodity/addcommodity.vue'
import SetLabel from './views/commodity/setLabel.vue'
import Comment from './views/commodity/comment.vue'
import ConsultRecord from './views/commodity/consultRecord.vue'
import addFremb from './views/commodity/addfremb.vue'
import Order from './views/order/Order.vue'
import CoupleList from './views/markting/coupleList.vue'
import Activity from './views/markting/activity.vue'
import Account from './views/assets/account.vue'
import AccountDetail from './views/assets/accountdetail.vue'
import CircleInfo from './views/circle/circleinfo.vue'
import SetCircle from './views/circle/setcircle.vue'
import Briefing from './views/data/briefing.vue'
import OrderStatic from './views/data/orderstatic.vue'
import CancelRate from './views/data/cancelrate.vue'
import CommodityRank from './views/data/commodityrank.vue'
import ExpandStatic from './views/data/expandstatic.vue'
import Distibution from './views/data/distibution.vue'

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
        iconCls: 'el-icon-message', //图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/survey', component: Survey, name: '店铺概况' },
            { path: '/shophome', component: ShopHome, name: '店铺主页' },
            { path: '/shopinfo', component: ShopInfo, name: '店铺信息' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '商品管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/commoditylist', component: CommodityList, name: '商品列表' },
            { path: '/addcommodity', component: AddCommodity, name: '创建新品' },
            { path: '/label', component: SetLabel, name: '标签管理' },
            { path: '/comment', component: Comment, name: '商品评论' },
            { path: '/consult', component: ConsultRecord, name: '咨询记录' },
            { path: '/addcommodity/addfremb', component: addFremb, name: '模板设置', hidden: true },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '订单管理',
        iconCls: 'fa fa-address-card',
        children: [
            { path: '/order', component: Order, name: '订单查询' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '营销管理',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/couple', component: CoupleList, name: '优惠券列表' },
            { path: '/activity', component: Activity, name: '满减活动' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '资产管理',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/account', component: Account, name: '账户总览' },
            { path: '/accountdetail', component: AccountDetail, name: '账单明细' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '数据管理',
        iconCls: 'fa fa-bar-chart',
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
        name: '商圈管理',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/circleinfo', component: CircleInfo, name: '商圈信息' },
            { path: '/setcircle', component: SetCircle, name: '商圈设置' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;