<template>
    <!-- 店铺概况 -->
    <div class="shop-container">
        <el-tabs type="border-card">
            <el-tab-pane label="今日数据">
                <el-row>
                    <el-col :span="3">
                        <div class>
                            <div class="des">支付订单数</div>
                            <div class="num">{{today.pay_order_num}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">未支付订单数</div>
                            <div class="num">{{today.unpaid_order_num}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">取消订单数</div>
                            <div class="num">{{today.cancel_order_num}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">成交金额（元）</div>
                            <div class="num">{{today.amount}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">待发货订单</div>
                            <div class="num">{{today.send_order_num}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">浏览量</div>
                            <div class="num">{{today.visit}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">访问-支付转化率</div>
                            <div class="num">{{today.pay_percent}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">售后订单</div>
                            <div class="num">{{today.after_sale_num}}</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-top:10px">
                    <el-col :span="3">
                        <div class>
                            <div class="des">分销订单数</div>
                            <div class="num">{{today.distribution_order_num}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">分销佣金（元）</div>
                            <div class="num">{{today.distribution_money}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">客服咨询数</div>
                            <div class="num">{{today.service_num}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">客服回复数</div>
                            <div class="num">{{today.reply_num}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">咨询成交数</div>
                            <div class="num">{{today.consult_num}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">圈友下单数</div>
                            <div class="num">{{today.circle_order_num}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">圈友分销订单</div>
                            <div class="num">{{today.circle_distribution_order_num}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">回头客订单</div>
                            <div class="num">{{today.repeat_order_num}}</div>
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
                            <div class="num">{{shop.visit}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">关注量</div>
                            <div class="num">{{shop.attention}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">新增关注</div>
                            <div class="num">{{shop.new_attention}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">累计客户数</div>
                            <div class="num">{{shop.customer}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">上架新品数</div>
                            <div class="num">{{shop.up_product}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">累计下单数</div>
                            <div class="num">{{shop.order_total}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">支付件数</div>
                            <div class="num">{{shop.pay_num}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">售后订单数</div>
                            <div class="num">{{shop.after_sale_num}}</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-top:10px">
                    <el-col :span="3">
                        <div class>
                            <div class="des">客服接待量</div>
                            <div class="num">{{shop.service_num}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">平均首次响应时长</div>
                            <div class="num">{{shop.first_reply_time}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">平均响应时长</div>
                            <div class="num">{{shop.reply_time}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">服务满意度</div>
                            <div class="num">{{shop.service}}</div>
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
                            <div class="num">{{evaluate.one}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">二星</div>
                            <div class="num">{{evaluate.two}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">三星</div>
                            <div class="num">{{evaluate.three}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">四星</div>
                            <div class="num">{{evaluate.four}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">五星</div>
                            <div class="num">{{evaluate.five}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">有图</div>
                            <div class="num">{{evaluate.pic}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">默认</div>
                            <div class="num">{{evaluate.default}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">一星占比率</div>
                            <div class="num">{{evaluate.one_percent}}</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-top:10px">
                    <el-col :span="3">
                        <div class>
                            <div class="des">二星占比率</div>
                            <div class="num">{{evaluate.two_percent}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">三星占比率</div>
                            <div class="num">{{evaluate.three_percent}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">四星占比率</div>
                            <div class="num">{{evaluate.four_percent}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">五星占比率</div>
                            <div class="num">{{evaluate.five_percent}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">有图占比率</div>
                            <div class="num">{{evaluate.pic_percent}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">默认占比率</div>
                            <div class="num">{{evaluate.default_percent}}</div>
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
                            <div class="num">{{finance.total_money}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">可用余额</div>
                            <div class="num">{{finance.available_money}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">待结算</div>
                            <div class="num">{{finance.stay_money}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">广告投放金额</div>
                            <div class="num">{{finance.ad_money}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">退款总金额</div>
                            <div class="num">{{finance.refund_money}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">客单价</div>
                            <div class="num">{{finance.total_money}}</div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class>
                            <div class="des">保证金</div>
                            <div class="num">{{finance.customer_money}}</div>
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
import { getShopInfo } from "../../api/api";
import utils from "@/common/js/util";

export default {
    data() {
        return {
            chartLine: {},
            xdata: null,
            ydata: null,
            today: {
                pay_order_num: "",
                unpaid_order_num: "",
                cancel_order_num: "",
                amount: "",
                send_order_num: "",
                visit: "",
                pay_percent: "",
                after_sale_num: "",
                distribution_order_num: "",
                distribution_money: "",
                service_num: "",
                reply_num: "",
                consult_num: "",
                circle_order_num: "",
                circle_distribution_order_num: "",
                repeat_order_num: ""
            },
            shop: {
                visit: "",
                attention: "",
                new_attention: "",
                customer: "",
                up_product: "",
                pay_num: "",
                after_sale_num: "",
                service_num: "",
                first_reply_time: "",
                reply_time: ""
            },
            evaluate: {
                one: "",
                two: "",
                three: "",
                four: "",
                five: "",
                pic: "",
                one_percent: "",
                two_percent: "",
                three_percent: "",
                four_percent: "",
                five_percent: "",
                pic_percent: ""
            },
            finance: {
                total_money: "",
                available_money: "",
                stay_money: "",
                ad_money: "",
                refund_money: "",
                customer_money: ""
            }
        };
    },
    methods: {
        // 刷新数据
        refresh() {
            this.getShopInfo();
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
                    data: this.xdata
                },
                yAxis: {
                    type: "value"
                },
                series: this.ydata
            });
        },
        getShopInfo() {
            getShopInfo()
                .then(res => {
                    const data = res.data.data;
                    this.xdata = data.date;
                    data.value.map(item => {
                        item.type = "line";
                    });
                    this.ydata = data.value;
                    this.drawLineChart();
                    this.today = data.report.today;
                    this.shop = data.report.shop;
                    this.evaluate = data.report.evaluate;
                    this.finance = data.report.finance;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.getShopInfo();
    },
    updated() {
        this.drawLineChart();
    }
};
</script>

<style lang="scss" scoped>
.shop-container {
    padding: 20px;
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