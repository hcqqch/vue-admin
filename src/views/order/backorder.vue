<template>
    <!-- 商品订单 -->
    <section>
        <!--工具条-->
        <div class="toolbar">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="订单号">
                    <el-input v-model="formInline.order_no" placeholder="订单号"></el-input>
                </el-form-item>

                <el-form-item label="买家账号">
                    <el-input v-model="formInline.username" placeholder="买家账号"></el-input>
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

                <el-form-item label="支付方式">
                    <el-select v-model="formInline.waybill" placeholder="支付方式">
                        <el-option label="支付宝" value="0"></el-option>
                        <el-option label="银行卡" value="1"></el-option>
                        <el-option label="微信支付" value="2"></el-option>
                        <el-option label="表示余额" value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="商品名称">
                    <el-input v-model="formInline.goods_name" placeholder="姓名/手机号"></el-input>
                </el-form-item>

                <el-form-item label="退换结果">
                    <el-select v-model="formInline.result" placeholder="支付方式">
                        <el-option label="全部" value="0"></el-option>
                        <el-option label="平台强退" value="1"></el-option>
                        <el-option label="待退换" value="2"></el-option>
                        <el-option label="已拒绝" value="3"></el-option>
                        <el-option label="已同意待寄回" value="4"></el-option>
                        <el-option label="已退还" value="5"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="退换方式">
                    <el-select v-model="formInline.way" placeholder="支付方式">
                        <el-option label="全部" value="1"></el-option>
                        <el-option label="退货退款" value="2"></el-option>
                        <el-option label="退货" value="3"></el-option>
                        <el-option label="退款" value="4"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                    <el-button type="primary" @click="resetField">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!--列表-->
        <el-table :data="data" highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column prop="order_no" label="订单号" width="200" sortable></el-table-column>
            <el-table-column prop="goods_name" label="商品名称" width="100" sortable></el-table-column>
            <el-table-column prop="norms_name" label="规格型号" width="120" sortable></el-table-column>
            <el-table-column prop="username" label="买家账号" min-width="120" sortable></el-table-column>
            <el-table-column prop="goods_price" label="价格" min-width="100" sortable></el-table-column>
            <el-table-column prop="num" label="购买数量" min-width="100" sortable></el-table-column>
            <el-table-column prop="coupon_price" label="优惠券抵扣" min-width="120" sortable></el-table-column>
            <el-table-column prop="activity_price" label="活动抵扣" min-width="100" sortable></el-table-column>
            <el-table-column prop="paytime" label="支付时间" min-width="180" sortable></el-table-column>
            <el-table-column prop="sale_money" label="分销佣金" min-width="100" sortable></el-table-column>
            <el-table-column prop="platform_money" label="平台佣金" min-width="100" sortable></el-table-column>
            <el-table-column prop="get_money" label="实际到账" min-width="100" sortable></el-table-column>
            <el-table-column prop="addr" label="收货信息" min-width="200" sortable></el-table-column>
            <el-table-column prop="status_name" label="订单状态" min-width="100" sortable></el-table-column>
            <el-table-column prop="statustime" label="状态更新时间" min-width="200" sortable></el-table-column>
            <el-table-column prop="wl_no" label="快递单号" min-width="200" sortable></el-table-column>
            <el-table-column prop="refund_name" label="退换方式" min-width="100" sortable></el-table-column>
            <el-table-column prop="refund_reason" label="退换原因" min-width="200" sortable></el-table-column>
            <el-table-column prop="apply_count" label="申请次数" min-width="100" sortable></el-table-column>
            <el-table-column prop="wl_company" label="回退快递" min-width="120" sortable></el-table-column>
            <el-table-column prop="refund_result_name" label="退换结果" min-width="120" sortable></el-table-column>
            <el-table-column label="操作" width="250">
                <template scope="scope">
                    <el-button size="small" @click="handleView(scope.row.id)">商品详情</el-button>
                    <el-button
                        size="small"
                        @click="backApply(scope.row.id, scope.row.order_id)"
                    >申请详情</el-button>
                    <el-button
                        v-if="scope.row.refund_result_name==2"
                        size="small"
                        @click="confirmBack(scope.row.id, scope.row.order_id)"
                    >确认退款</el-button>
                    <el-button
                        v-if="scope.row.refund_result_name==4"
                        size="small"
                        @click="handleBack(scope.row.id, scope.row.order_id)"
                    >处理退换</el-button>
                    <el-button
                        v-if="scope.row.refund_result_name==5"
                        size="small"
                        @click="finishChange(scope.row.id, scope.row.order_id)"
                    >换货完成</el-button>
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

        <el-dialog width="30%" title="拒绝原因" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="拒绝原因">
                    <el-input style="width:80%" v-model="form.reason" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitReason('refuse')">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import { getRefundlist, backOrderOperate } from "../../api/api";
import utils from "@/common/js/util";

export default {
    data() {
        return {
            data: [],
            total: 0,
            page: 1,
            formInline: {},
            form: {},
            type: [],
            options: [],
            createtime: "",
            listLoading: false,
            dialogFormVisible: false,
            id: "",
            order_id: ""
        };
    },
    methods: {
        handleChange() {},
        onSearch() {
            this.getRefundlist();
        },
        resetField() {
            this.formInline = {};
        },
        handleView(id) {
            this.$router.push("/addcommodity?id=" + id);
        },
        handleCurrentChange(val) {
            this.page = val;
        },
        getRefundlist() {
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
                goods_name: this.formInline.goods_name,
                result: this.formInline.reuslt,
                way: this.formInline.way
            };
            this.listLoading = true;
            getRefundlist(params)
                .then(res => {
                    const data = res.data.data.data;
                    this.data = data.lists;
                    this.total = data.total;
                    this.listLoading = false;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        backApply(id, order_id) {
            this.$router.push(`./backapply?id=${id}&&order_id=${order_id}`);
        },
        confirmBack(id, order_id) {
            const _this = this;
            this.$confirm("是否已收到退货", "提示", {
                confirmButtonText: "已收到，确认退款",
                cancelButtonText: "暂未收到"
            })
                .then(() => {
                    _this.submitReason("success");
                })
                .catch(() => {});
        },
        handleBack(id, order_id) {
            const _this = this;
            this.id = id;
            this.order_id = order_id;
            this.$confirm("处理退换", "提示", {
                confirmButtonText: "同意退换",
                cancelButtonText: "拒接退换"
            })
                .then(() => {
                    _this.submitReason("agree");
                })
                .catch(() => {
                    _this.dialogFormVisible = true;
                });
        },
        submitReason(type) {
            const params = {
                id: this.id,
                order_id: this.order_id,
                action: type
            };
            backOrderOperate(params)
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
        finishChange(id, order_id) {
            const _this = this;
            this.$confirm("是否已更换货物并发出", "提示", {
                confirmButtonText: "已重新发货",
                cancelButtonText: "暂未发货"
            })
                .then(() => {
                    _this.submitReason("success");
                })
                .catch(() => {});
        }
    },
    mounted() {
        this.getRefundlist();
    }
};
</script>

<style scoped>
</style>