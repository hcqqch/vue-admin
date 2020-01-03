<template>
    <!-- 复消率 -->
    <section style="padding:20px">
        <div class="infoItem">复消率</div>
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
            <el-col :span="8">
                <el-card shadow="always" style="margin-right:20px">总购买人数：{{total}}</el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="always" style="margin-right:20px">老顾客数：{{old}}</el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="always">老顾客占比：{{old_percent}}</el-card>
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
import { getBuyers } from "../../api/api";
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
            chartLine: {},
            total: "",
            old: "",
            old_percent: "",
            xdata: null,
            ydata: null
        };
    },
    methods: {
        onSearch(){
            this.getBuyers();
        },
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
                    data: ["当日购买数", "老顾客数","老顾客占比"]
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
        getBuyers() {
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
            getBuyers(params)
                .then(res => {
                    const data = res.data.data;
                    console.log(data);
                    this.total = data.summary.total;
                    this.old = data.summary.old;
                    this.old_percent = data.summary.old_percent;
                    data.value.map(item=>{
                        item.type = "line"
                    })
                    this.xdata = data.date;
                    this.ydata = data.value;
                    this.drawLineChart();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.getBuyers();
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
}
</style>