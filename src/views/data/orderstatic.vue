<template>
    <!-- 订单统计 -->
    <section style="padding:20px">
        <div class="infoItem">订单统计</div>
        <el-row>
            <el-col :span="24">
                操作时间：
                <el-date-picker
                    v-model="effectiveTime"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                ></el-date-picker>
                <el-button @click="onSearch" type="primary">查询</el-button>
            </el-col>
        </el-row>
        <el-row style="margin-top:20px">
            <el-col :span="12">
                <el-card shadow="always" style="margin-right:20px">订单总数：{{order_count}}</el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="always">分销金额：{{order_money}}</el-card>
            </el-col>
        </el-row>
        <el-row style="margin-top:20px">
            <el-col :span="6">
                <el-card shadow="always" style="margin-right:20px">分销订单数：{{distribution_count}}</el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always" style="margin-right:20px">分销订单金额：{{distribution_money}}</el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always" style="margin-right:20px">分销业绩占比：{{distribution_percent}}</el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always">产生佣金：{{charges}}</el-card>
            </el-col>
        </el-row>
        <el-row style="margin-top:20px">
            <el-col :span="8">
                <el-card shadow="always" style="margin-right:20px">圈友订单数：{{circle_count}}</el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="always" style="margin-right:20px">圈友订单金额：{{circle_money}}</el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="always">圈友订单业绩占比：{{circle_percent}}</el-card>
            </el-col>
        </el-row>
        <div class="infoItem">分销业绩</div>
        <el-table :data="tableData" style="width:100%">
            <el-table-column prop="username" label="用户名" width></el-table-column>
            <el-table-column prop="identity" label="身份" width></el-table-column>
            <el-table-column prop="mobile" label="联系电话"></el-table-column>
            <el-table-column prop="sales" label="销售额" width></el-table-column>
            <el-table-column prop="orders" label="订单数" width></el-table-column>
            <el-table-column prop="users" label="成交用户数"></el-table-column>
            <el-table-column prop="customer_price" label="客单价" width></el-table-column>
            <el-table-column prop="charges" label="佣金收入" width></el-table-column>
            <el-table-column prop="shares" label="分享次数"></el-table-column>
            <el-table-column prop="shares_percent" label="分享成交率" width></el-table-column>
            <el-table-column prop label="操作" width>
                <template scope="scope">
                    <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button> -->
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleChange(scope.row.id)"
                    >交换名片</el-button>
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>
<script>
import echarts from "echarts";
import { getOrderStatic, changeCard } from "../../api/api";
import utils from "@/common/js/util";

export default {
    data() {
        return {
            effectiveTime: "", //操作时间
            pickerOptions: {
                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    }
                ]
            },
            tableData: [],
            listLoading: false,
            order_count: "",
            order_money: "",
            distribution_count: "",
            distribution_money: "",
            distribution_percent: "",
            distribution_percent: "",
            charges: "",
            circle_count: "",
            circle_money: "",
            distribution_percent: "",
            charges: "",
            circle_count: "",
            circle_money: "",
            circle_percent: ""
        };
    },
    methods: {
        onSearch() {
            this.getOrderStatic();
        },
        handleChange(id){
            const params = {
                id
            }
            changeCard(params).then(res=>{
                if(res.data.code ==200){
                    this.$message({
                        type:"success",
                        message:res.data.msg
                    })
                }else{
                    this.$message({
                        type:"warning",
                        message:res.data.msg
                    })
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        getOrderStatic() {
            let start_time = "";
            let end_time = "";
            if (this.effectiveTime) {
                start_time = utils.formatDate.format(
                    this.effectiveTime[0],
                    "yyyy-MM-dd"
                );
                end_time = utils.formatDate.format(
                    this.effectiveTime[1],
                    "yyyy-MM-dd"
                );
            }
            const params = {
                start_date:start_time,
                end_date:end_time
            }   
            this.listLoading = true;
            getOrderStatic(params)
                .then(res => {
                    const data = res.data.data.data;
                    this.tableData = data.list;
                    for (let prop in data) {
                        if (this.hasOwnProperty(prop)) {
                            this[prop] = data[prop];
                        }
                    }
                    this.listLoading = false;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.getOrderStatic();
    }
};
</script>
<style lang="scss" scoped>
.infoItem {
    width: 99%;
    padding: 10px;
    background: #f2f2f2;
    margin-bottom: 20px;
    margin-top: 20px;
}
</style>