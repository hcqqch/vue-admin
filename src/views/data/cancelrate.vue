<template>
    <!-- 复消率 -->
    <section style="padding:20px">
        <div class="infoItem">复消率</div>
        <el-row>
            <el-col :span="24">
                操作时间：
                <el-date-picker
                    v-model="value2"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                ></el-date-picker>
                <el-button type="primary">查询</el-button>
            </el-col>
        </el-row>
        <el-row style="margin-top:20px">
            <el-col :span="8">
                <el-card shadow="always" style="margin-right:20px">总购买人数：0</el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="always" style="margin-right:20px">老顾客数：0</el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="always">老顾客占比：0</el-card>
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
export default {
    data() {
        return {
            value2: "", //操作时间
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
            chartLine2:{}
        };
    },
    methods: {
        drawLineChart() {
            this.chartLine = echarts.init(document.getElementById("chartLine"));
            this.chartLine.setOption({
                title: {
                    text: "本周数据"
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
                    data: [
                        "周一",
                        "周二",
                        "周三",
                        "周四",
                        "周五",
                        "周六",
                        "周日"
                    ]
                },
                yAxis: {
                    type: "value"
                },
                series: [
                    {
                        name: "当日购买人数",
                        type: "line",
                        stack: "总量",
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: "老会员",
                        type: "line",
                        stack: "总量",
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: "新会员",
                        type: "line",
                        stack: "总量",
                        data: [320, 112, 191, 234, 290, 330, 310]
                    }
                ]
            });
        },
    },
    mounted() {
        this.drawLineChart();
    },
    updated() {
        this.drawLineChart();
    }
};
</script>
<style lang="scss">
.infoItem {
    width: 99%;
    padding: 10px;
    background: #f2f2f2;
    margin-bottom: 20px;
}
</style>