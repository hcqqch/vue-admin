<template>
    <!-- 经营简报 -->
    <section style="padding:20px">
        <div class="infoItem">经营情况</div>
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
        <el-row>
            <el-table :data="tableData" style="width:100%">
                <el-table-column prop="date" label="客单价" width="180"></el-table-column>
                <el-table-column prop="name" label="订单数" width="180"></el-table-column>
                <el-table-column prop="address" label="购买人数"></el-table-column>
                <el-table-column prop="address" label="订单金额"></el-table-column>
            </el-table>
        </el-row>
        <el-row style="margin-top:20px">
            <el-col :span="24">
                <div id="chartLine" style="width:100%; height:500px;"></div>
            </el-col>
        </el-row>
        <div class="infoItem">客户情况</div>
        <el-table :data="tableData2" style="width:100%">
            <el-table-column prop="date" label="新增客户数" width="180"></el-table-column>
            <el-table-column prop="name" label="新增分销人数" width="180"></el-table-column>
        </el-table>
        <el-row style="margin-top:20px">
            <el-col :span="24">
                <div id="chartLine2" style="width:100%; height:500px;"></div>
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
                        name: "订单数",
                        type: "line",
                        stack: "总量",
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: "订单金额",
                        type: "line",
                        stack: "总量",
                        data: [220, 182, 191, 234, 290, 330, 310]
                    }
                ]
            });
        },
         drawLineChart2() {
            this.chartLine2 = echarts.init(document.getElementById("chartLine2"));
            this.chartLine2.setOption({
                title: {
                    text: "本周数据"
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
                        name: "新增会员",
                        type: "line",
                        stack: "总量",
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: "新增分销商",
                        type: "line",
                        stack: "总量",
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                ]
            });
        }
    },
    mounted() {
        this.drawLineChart();
        this.drawLineChart2();
    },
    updated() {
        this.drawLineChart();
        this.drawLineChart2();
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