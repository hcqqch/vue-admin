<template>
    <!-- 店铺概况 -->
    <div class="shop-container">
        <el-tabs type="border-card">
            <el-tab-pane label="今日数据">
                <el-row>
                    <el-col :span="3">
                        <div class>
                            <div class="des">支付订单数</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">未支付订单数</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">取消订单数</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">成交金额（元）</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">待发货订单</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">浏览量</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">访问-支付转化率</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">售后订单</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-top:10px">
                    <el-col :span="3">
                        <div class>
                            <div class="des">分销订单数</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">分销佣金（元）</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">客服咨询数</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">客服回复数</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">咨询成交数</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">圈友下单数</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">圈友分销订单</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">回头客订单</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-top:20px">
                    <i class="el-icon-refresh" @click="refresh">刷新数据</i>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="店铺数据">
                <el-row>
                    <el-col :span="3">
                        <div class>
                            <div class="des">浏览量</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">关注量</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">新增关注</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">累计客户数</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">上架新品数</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">累计下单数</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">支付件数</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">售后订单数</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-top:10px">
                    <el-col :span="3">
                        <div class>
                            <div class="des">客服接待量</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">平均首次响应时长</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">平均响应时长</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">服务满意度</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-top:20px">
                    <i class="el-icon-refresh" @click="refresh">刷新数据</i>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="评价数据">
                <el-row>
                    <el-col :span="3">
                        <div class>
                            <div class="des">一星</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">二星</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">三星</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">四星</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">五星</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">有图</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">默认</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">一星占比率</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-top:10px">
                    <el-col :span="3">
                        <div class>
                            <div class="des">二星占比率</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">三星占比率</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">四星占比率</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">五星占比率</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">咨询成交数</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">有图占比率</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">默认占比率</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-top:20px">
                    <i class="el-icon-refresh" @click="refresh">刷新数据</i>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="财务数据">
                <el-row>
                    <el-col :span="3">
                        <div class>
                            <div class="des">销售总金额</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">可用余额</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">待结算</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">广告投放金额</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">退款总金额</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">客单价</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">保证金</div>
                            <div class="num">18</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-top:20px">
                    <i class="el-icon-refresh" @click="refresh">刷新数据</i>
                </el-row>
            </el-tab-pane>
        </el-tabs>

        <el-row style="margin-top:20px">
            <el-col :span="24">
                <div id="chartLine" style="width:100%; height:500px;"></div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import echarts from "echarts";
export default {
    data() {
        return {
            chartLine: {}
        };
    },
    methods: {
        // 刷新数据
        refresh() {},
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
                    data: ["支付订单数", "成交金额", "浏览量"]
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
                        name: "支付订单数",
                        type: "line",
                        stack: "总量",
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: "成交金额",
                        type: "line",
                        stack: "总量",
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: "浏览量",
                        type: "line",
                        stack: "总量",
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            });
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

<style lang="scss" scoped>
.shop-container {
    .el-col-3 {
        width: 12.5%;
        text-align: center;
    }
    .des {
        color: #666666;
        // font-size: 16px;
        padding: 10px;
    }
    .num {
        font-size: 24px;
    }
    .el-icon-refresh:hover {
        cursor: pointer;
        color: #409eff;
    }
    #chartLine {
        margin-top: 20px;
    }

    #chartLine > div {
        width: 100% !important;
    }
}
</style>