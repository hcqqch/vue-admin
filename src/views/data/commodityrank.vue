<template>
    <!-- 商品排行 -->
    <section style="padding:20px">
        <div class="infoItem">商品排行</div>
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
                <el-select v-model="rankType" placeholder="请选择">
                    <el-option label="销量" value="1">销量</el-option>
                    <el-option label="销售额" value="2">销售额</el-option>
                    <el-option label="订单额" value="3">订单额</el-option>
                    <el-option label="购买人数" value="4">购买人数</el-option>
                    <el-option label="分享次数" value="5">分享次数</el-option>
                    <el-option label="访问次数" value="6">访问次数</el-option>
                </el-select>
                <el-button @click="onSearch" type="primary">查询</el-button>
            </el-col>
        </el-row>

        <el-table :data="tableData" style="width:100%">
            <el-table-column prop="goods_name" label="商品名称" width="180"></el-table-column>
            <el-table-column prop="sale_time" label="上架时间" width="180"></el-table-column>
            <el-table-column prop="sales_count" label="销售量"></el-table-column>
            <el-table-column prop="orders_count" label="订单量" width="180"></el-table-column>
            <el-table-column prop="orders_money" label="销售额" width="180"></el-table-column>
            <el-table-column prop="visits" label="访问次数"></el-table-column>
            <el-table-column prop="visits" label="购买人数" width="180"></el-table-column>
            <el-table-column prop="buyers" label="分享次数" width="180"></el-table-column>
            <el-table-column prop="shares" label="操作" width="180">
                <template scope="scope">
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                    >置顶商品</el-button>
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>
<script>
import echarts from "echarts";
import { getGoodsRank } from "../../api/api";
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
            rankType:"",
            listLoading:false,
        };
    },
    methods: {
        onSearch(){
            this.getGoodsRank();
        },
        getGoodsRank(){
            let start_time = "";
            let end_time = "";
            if (this.effectiveTime) {
                start_time = utils.formatDate.format(
                    this.effectiveTime[0],
                    "yyyy-MM-dd hh:mm:ss"
                );
                end_time = utils.formatDate.format(
                    this.effectiveTime[1],
                    "yyyy-MM-dd hh:mm:ss"
                );
            }
            const params = {
                start_time,
                end_time,
                order:this.rankType
            }
            this.listLoading = true;
            getGoodsRank(params).then(res=>{
                const data = res.data.data.data;
                this.tableData = data;
                this.listLoading = false;
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    mounted() {
        this.getGoodsRank();
    },
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