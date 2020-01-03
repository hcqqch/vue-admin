<template>
<!-- 账单明细 -->
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="账单状态">
                    <el-select v-model="formInline.log_type" placeholder="状态">
                        <!-- <el-option label="全部" value="0"></el-option> -->
                        <el-option label="已入账" value="1"></el-option>
                        <el-option label="待结算" value="2"></el-option>
                        <el-option label="提现申请" value="3"></el-option>
                        <el-option label="提现到账" value="4"></el-option>
                        <el-option label="退款" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="formInline.type" placeholder="类型">
                        <el-option label="收入" value="1"></el-option>
                        <el-option label="支出" value="2"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="账户">
                    <el-select v-model="formInline.account_type" placeholder="账户">
                        <el-option label="账户余额" value="1"></el-option>
                        <el-option label="待结算余额" value="2"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="订单号">
                    <el-input v-model="formInline.order_sn" placeholder="订单号"></el-input>
                </el-form-item>

                <el-col :span="12">
                    <el-form-item label="账单时间">
                        <el-date-picker
                            v-model="formInline.effectiveTime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSearch">查询</el-button>
                        <el-button type="primary" @click="resetField">重置</el-button>
                        <el-button type="primary" @click="resetField">导出报表</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="data" highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column prop="type" label="类型" width="100" sortable>
                <template slot-scope="scope">
                    <span v-if="scope.row.type==1">收入</span>
                    <span v-if="scope.row.type==2">支出</span>
                </template>
            </el-table-column>
            <el-table-column prop="account_type_name" label="操作账户" width="" sortable></el-table-column>
            <el-table-column prop="created_at" label="时间" width="" sortable></el-table-column>
            <el-table-column prop="record_sn" label="流水号" width="" sortable></el-table-column>
            <el-table-column prop="order_sn" label="订单号" min-width="" sortable></el-table-column>
            <el-table-column prop="money" label="操作金额" min-width="" sortable></el-table-column>
            <el-table-column prop="procedures" label="手续费" min-width="" sortable></el-table-column>
            <el-table-column prop="real_money" label="实际到账" min-width="" sortable></el-table-column>
            <el-table-column prop="log_type" label="状态" min-width="" sortable>
                <template slot-scope="scope">
                    <span v-if="scope.row.type==1">已入账</span>
                    <span v-if="scope.row.type==2">待结算</span>
                    <span v-if="scope.row.type==3">提现申请</span>
                    <span v-if="scope.row.type==4">提现到账</span>
                    <span v-if="scope.row.type==5">退款</span>
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
    </section>
</template>

<script>
import { getBillDetail } from "../../api/api";
import utils from "@/common/js/util";

export default {
    data() {
        return {
            data: [],
            total: 0,
            page: 1,
            sels: [], //列表选中项
            formInline: {
                log_type: "",
                type: "",
                account_type: "",
                order_sn: "",
                effectiveTime: ""
            },
            listLoading: false
        };
    },
    methods: {
        onSearch() {
            this.getBillDetail();
        },
        resetField() {
            this.formInline = {};
        },
        handleCurrentChange(val) {
            this.page = val;
        },
        getBillDetail() {
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
                log_type: this.formInline.log_type,
                type: this.formInline.type,
                account_type: this.formInline.account_type,
                order_sn: this.formInline.order_sn,
                starttime: start_time,
                endtime: end_time
            };
            getBillDetail(params)
                .then(res => {
                    const data = res.data.data.data;
                    this.data = data.lists;
                    this.total = data.total;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.getBillDetail();
    }
};
</script>

<style scoped>
</style>