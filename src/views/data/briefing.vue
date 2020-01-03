<template>
    <!-- 经营简报 -->
    <section style="padding:20px">
        <div class="infoItem">经营情况</div>
        <el-row>
            <el-col :span="24" style="margin-bottom:20px">
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
            <el-col :span="6">
                <el-card shadow="always" style="margin-right:20px">客单价{{per_sales}}</el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always" style="margin-right:20px">订单数{{orders}}</el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always" style="margin-right:20px">购买人数{{buyers}}</el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always">订单金额{{money}}</el-card>
            </el-col>
        </el-row>
        <el-row style="margin-top:20px">
            <el-col :span="24">
                <div id="chartLine" style="width:100%; height:500px;"></div>
            </el-col>
        </el-row>
        <div class="infoItem" style="margin-top:30px">客户情况</div>
        <el-row style="margin-top:20px">
            <el-col :span="12">
                <el-card shadow="always" style="margin-right:20px">新增客户数{{user}}</el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="always" style="margin-right:20px">新增分销人数{{distribution}}</el-card>
            </el-col>
        </el-row>
        <el-row style="margin-top:20px">
            <el-col :span="24">
                <div id="chartLine2" style="width:100%; height:500px;"></div>
            </el-col>
        </el-row>
    </section>
</template>
<script>
import echarts from "echarts";
import { getReport } from "../../api/api";
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
            per_sales: "",
            orders: "",
            buyers: "",
            money: "",
            user: "",
            distribution: "",
            chartLine: {},
            chartLine2: {},
            xdata: null,
            ydata: null,
            u_xdata: null,
            u_ydata: null
        };
    },
    methods: {
        drawLineChart() {
            this.chartLine = echarts.init(document.getElementById("chartLine"));
            this.chartLine.setOption({
                title: {
                    text: ""
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["订单数", "订单金额"]
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: this.xdata
                },
                yAxis: {
                    type: "value"
                },
                series: this.ydata
            });
        },
        drawLineChart2() {
            this.chartLine2 = echarts.init(
                document.getElementById("chartLine2")
            );
            this.chartLine2.setOption({
                title: {
                    text: ""
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["新增会员", "新增分销商"]
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: this.xdata
                },
                yAxis: {
                    type: "value"
                },
                series: this.u_ydata
            });
        },
        onSearch() {
            this.getReport();
        },
        getReport() {
            let end_time = new Date();
            let start_time = new Date();
            start_time.setTime(start_time.getTime() - 3600 * 1000 * 24 * 7);
            end_time = utils.formatDate.format(end_time, "yyyy-MM-dd");
            start_time = utils.formatDate.format(start_time, "yyyy-MM-dd");
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
                start_date: start_time,
                end_date: end_time
            };
            getReport(params)
                .then(res => {
                    const data = res.data.data;
                    this.per_sales = data.report.per_sales;
                    this.orders = data.report.orders;
                    this.buyers = data.report.buyers;
                    this.money = data.report.money;
                    this.user = data.incr_report.user;
                    this.distribution = data.incr_report.distribution;
                    data.order.map(item => {
                        item.type = "line";
                    });
                    this.xdata = data.date;
                    this.ydata = data.order;
                    data.incr.map(item => {
                        item.type = "line";
                    });
                    this.u_ydata = data.incr;
                    this.drawLineChart();
                    this.drawLineChart2();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.getReport();
    },
    updated() {
        this.drawLineChart();
        this.drawLineChart2();
    }
};
</script>
<style lang="scss" scoped>
.infoItem {
    width: 99%;
    padding: 10px;
    background: #f2f2f2;
    margin-bottom: 20px;
}
</style>