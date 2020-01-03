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
                    <el-table-column prop="name" label="地区" width></el-table-column>
                    <el-table-column prop="value" label="数量" width></el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </section>
</template>
<script>
import echarts from "echarts";
import { ChinaData } from "china-map-geojson";
import { areaDistribution } from "../../api/api";
    
export default {
    data() {
        return {
            chartLine: {},
            tableData: [],
            data:[]
        };
    },
    methods: {
        drawLineChart() {
            const that = this;
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
                        data: that.data
                    }
                ]
            });
            // console.log(this.chartLine.getOption())
            console.log(this.chartLine);
        },
        areaDistribution(){
            areaDistribution().then(res=>{
                let data = res.data.data.data;
                this.data = data;
                if(data.length>10){
                    data = data.splice(9,data.length-10)
                }
                this.tableData = data;
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    mounted() {
        this.drawLineChart();
        this.areaDistribution();
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
