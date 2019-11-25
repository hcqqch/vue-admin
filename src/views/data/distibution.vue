<template>
    <!-- 客户分布 -->
    <section style="padding:20px">
        <div class="infoItem">客户分布</div>
        <el-row style="margin-top:20px">
            <el-col :span="20">
                <div id="chartLine" style="width:100%; height:700px;"></div>
            </el-col>
            <div style="color:#909399">会员数top10省份</div>
            <el-col :span="4">
                <el-table :data="tableData">
                    <el-table-column prop="date" label="地区" width></el-table-column>
                    <el-table-column prop="name" label="数量" width></el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </section>
</template>
<script>
import echarts from "echarts";
import { ChinaData } from "china-map-geojson";

export default {
    data() {
        return {
            chartLine: {},
            tableData: [
                {
                    date: "江苏",
                    name: "3"
                },
                {
                    date: "北京",
                    name: "4"
                },
                {
                    date: "安徽",
                    name: "2"
                },
                {
                    date: "北京",
                    name: "5"
                }
            ]
        };
    },
    methods: {
        drawLineChart() {
            this.chartLine = echarts.init(document.getElementById("chartLine"));
            const map = echarts.registerMap("china", ChinaData);
            this.chartLine.setOption({
                title: {
                    text: "全国各地区会员分布",
                    left: "center"
                },
                tooltip: {
                    formatter: function(params) {
                        if (params.value) {
                            return `${params.name}:${params.value}人`; //地图上展示文字 + 数值
                        } else {
                            return `${params.name}:0人`;
                        }
                    }
                },
                series: [
                    {
                        type: "map",
                        map: "china",
                        zoom: 1.2,
                        data: [
                            {
                                name: "江苏",
                                value: 3
                            },
                            {
                                name: "浙江",
                                value: 3
                            },
                            {
                                name: "上海",
                                value: 113
                            }
                        ]
                    }
                ]
            });
            // console.log(this.chartLine.getOption())
            console.log(this.chartLine);
        }
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
    margin-top: 20px;
}
</style>
