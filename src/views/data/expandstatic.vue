<template>
    <!-- 客户增长统计 -->
    <section style="padding:20px">
        <div class="infoItem">客户增长统计</div>
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
            <el-col :span="24">
                <div id="chartLine" style="width:100%; height:500px;"></div>
            </el-col>
        </el-row>
    </section>
</template>
<script>
import echarts from "echarts";
import { getCustomerInc } from "../../api/api";
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
            tableData: [
                {
                    date: "2016-05-02",
                    name: "1",
                    address: "1 1518 弄"
                }
            ],
            chartLine: {},
            chartLine2: {},
            options: [
                {
                    value: "选项1",
                    label: "top10"
                },
                {
                    value: "选项2",
                    label: "top20"
                }
            ],
            value: "",
            xdata: null,
            ydata: null
        };
    },
    methods: {
        onSearch(){
            this.getCustomerInc();
        },
        drawLineChart() {
            let that = this;
            this.chartLine = echarts.init(document.getElementById("chartLine"));
            this.chartLine.setOption({
                title: {
                    text: ""
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["新增会员数"]
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
                series: [
                    {
                        name: "新增会员数",
                        type: "line",
                        stack: "总量",
                        data: this.ydata
                    }
                ]
            });
        },
        getCustomerInc() {
            let end_time = new Date();
            let start_time = new Date();
            start_time.setTime(start_time.getTime() - 3600 * 1000 * 24 * 7);
            end_time = utils.formatDate.format(end_time,"yyyy-MM-dd")
            start_time = utils.formatDate.format(start_time,"yyyy-MM-dd")
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
            getCustomerInc(params)
                .then(res => {
                    const data = res.data.data;
                    this.xdata = data[0];
                    this.ydata = data[1].data;
                    this.drawLineChart();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.getCustomerInc();
    },
    updated() {
        this.drawLineChart();
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