<template>
    <!-- 商品订单 -->
    <section>
        <div class="toolbar">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="订单号">
                    <el-input v-model="formInline.order_no" placeholder="订单号"></el-input>
                </el-form-item>

                <el-form-item label="支付时间">
                    <el-date-picker
                        v-model="formInline.effectiveTime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input v-model="formInline.goods_name" placeholder="姓名/手机号"></el-input>
                </el-form-item>

                <el-form-item label="订单状态">
                    <el-select v-model="formInline.status" placeholder="订单状态">
                        <el-option label="取消订单" value="1"></el-option>
                        <el-option label="待支付" value="2"></el-option>
                        <el-option label="待发货" value="3"></el-option>
                        <el-option label="待收货" value="4"></el-option>
                        <el-option label="已收货" value="5"></el-option>
                        <el-option label="已完成" value="6"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="买家账号">
                    <el-input v-model="formInline.username" placeholder="买家账号"></el-input>
                </el-form-item>
                <el-form-item label="收货人">
                    <el-input v-model="formInline.name" placeholder="收货人"></el-input>
                </el-form-item>

                <el-form-item label="支付方式">
                    <el-select v-model="formInline.waybill" placeholder="支付方式">
                        <el-option label="支付宝" value="1"></el-option>
                        <el-option label="银行卡" value="2"></el-option>
                        <el-option label="微信支付" value="3"></el-option>
                        <el-option label="表示余额" value="4"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="快递单号">
                    <el-input v-model="formInline.wl_no" placeholder="快递单号"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                    <el-button type="primary" @click="resetField">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!--列表-->
        <el-table :data="data" highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column prop="order_no" label="订单号" width="180" sortable></el-table-column>
            <el-table-column prop="goods_coding" label="商品编号" width="100" sortable></el-table-column>
            <el-table-column prop="goods_name" label="商品名称" width="100" sortable></el-table-column>
            <el-table-column prop="norms_name" label="规格型号" width="120" sortable></el-table-column>
            <el-table-column prop="goods_price" label="单价" min-width="180" sortable></el-table-column>
            <el-table-column prop="num" label="数量" min-width="180" sortable></el-table-column>
            <el-table-column prop="coupon_price" label="优惠券抵扣" min-width="180" sortable></el-table-column>
            <el-table-column prop="activity_price" label="活动抵扣" min-width="180" sortable></el-table-column>
            <el-table-column prop="pay_price" label="实际支付" min-width="180" sortable></el-table-column>
            <el-table-column prop="paytime" label="支付时间" min-width="180" sortable></el-table-column>
            <el-table-column prop="waybill" label="支付方式" min-width="180" sortable>
                <template slot-scope="scope">
                    <span v-if="scope.row.waybill==1">支付宝</span>
                    <span v-if="scope.row.waybill==2">银行卡</span>
                    <span v-if="scope.row.waybill==3">微信支付</span>
                    <span v-if="scope.row.waybill==4">余额支付</span>
                </template>
            </el-table-column>
            <el-table-column prop="sale_money" label="分销佣金" min-width="180" sortable></el-table-column>
            <el-table-column prop="platform_money" label="平台佣金" min-width="180" sortable></el-table-column>
            <el-table-column prop="get_money" label="实际到账" min-width="180" sortable></el-table-column>
            <el-table-column prop="username" label="买家账号" min-width="180" sortable></el-table-column>
            <el-table-column prop="addr" label="收货信息" min-width="180" sortable>
                <template slot-scope="scope">
                    <div>{{scope.row.name}}</div>
                    <div>{{scope.row.phone}}</div>
                    <div>{{scope.row.address}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="订单状态" min-width="180" sortable>
                <template slot-scope="scope">
                    <span v-if="scope.row.status==1">取消订单</span>
                    <span v-if="scope.row.status==2">待支付</span>
                    <span v-if="scope.row.status==3">待发货</span>
                    <span v-if="scope.row.status==4">待收货</span>
                    <span v-if="scope.row.status==5">已收货</span>
                    <span v-if="scope.row.status==6">已完成</span>
                </template>
            </el-table-column>
            <el-table-column prop="status_time" label="状态更新时间" min-width="180" sortable></el-table-column>
            <el-table-column prop="wl_no" label="快递单号" min-width="180" sortable></el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.row.id)">详情</el-button>
                    <el-button v-if="scope.row.status==3" size="small" @click="handleSend(scope.row.id,scope.row.order_id)">发货</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :page-size="20"
                :total="total"
                style="float:right;"
            ></el-pagination>
        </el-col>

        <el-dialog width="30%" title="添加分类" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="快递公司">
                    <el-select v-model="form.wl_company" placeholder="支付方式">
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :value="item.id"
                            :label="item.name"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="快递单号">
                    <el-input style="width:80%" v-model="form.wl_no" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitType">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import { orderList, sendGoods, getOrderExpress } from "../../api/api";
import utils from "@/common/js/util";

export default {
    data() {
        return {
            data: [],
            total: 0,
            page: 1,
            formInline: {
                name: "",
                effectiveTime: ""
            },
            type: [],
            options: [],
            listLoading: false,
            dialogFormVisible: false,
            form: {},
            id:"",
            order_id:""
        };
    },
    methods: {
        onSearch() {
            this.orderList();
        },
        resetField() {
            this.formInline = {};
        },
        handleSend(id,order_id) {
            this.dialogFormVisible = true;
            this.id = id;
            this.order_id = order_id;
        },
        submitType() {
            const params = {
                id:this.id,
                order_id:this.order_id,
                wl_company: this.form.wl_company,
                wl_no: this.form.wl_no
            };
            sendGoods(params)
                .then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: res.data.msg,
                            type: "success"
                        });
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: "warning"
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            this.dialogFormVisible = false;
        },
        handleEdit(id) {
            this.$router.push("/addcommodity?id=" + id);
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getdata();
        },
        orderList() {
            let start_time = "";
            let end_time = "";
            if (this.formInline.effectiveTime) {
                start_time = utils.formatDate.format(
                    this.formInline.effectiveTime[0],
                    "yyyy-MM-dd hh:mm:ss"
                );
                end_time = utils.formatDate.format(
                    this.formInline.effectiveTime[1],
                    "yyyy-MM-dd hh:mm:ss"
                );
            }
            const params = {
                order_no: this.formInline.order_no,
                username: this.formInline.username,
                start_time: start_time,
                end_time: end_time,
                waybill: this.formInline.waybill,
                status: this.formInline.status,
                goods_name: this.formInline.goods_name,
                name: this.formInline.name,
                wl_no: this.formInline.wl_no
            };
            this.listLoading = true;
            orderList(params)
                .then(res => {
                    const data = res.data.data.data;
                    this.data = data.lists;
                    this.listLoading = false;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getOrderExpress() {
            getOrderExpress()
                .then(res => {
                    this.options = res.data.data.data;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.orderList();
        this.getOrderExpress();
    }
};
</script>

<style scoped>
</style>
