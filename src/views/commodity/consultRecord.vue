
<template>
    <!-- 咨询记录 -->
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="商品名称">
                    <el-input v-model="formInline.name" placeholder="商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品分类">
                    <el-cascader
                        v-model="type"
                        :options="options"
                        :props="{ checkStrictly: true }"
                        @change="handleChange"
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="商品编号">
                    <el-input v-model="formInline.num" placeholder="商品编号"></el-input>
                </el-form-item>
                <el-form-item label="咨询时间">
                    <el-date-picker
                        v-model="formInline.effectiveTime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                    <el-button type="primary" @click="resetField">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-radio-group v-model="status" @change="radioChange" style="margin-bottom: 10px;">
            <el-radio-button label="0">全部咨询</el-radio-button>
            <el-radio-button label="1">已回复咨询</el-radio-button>
            <el-radio-button label="2">未回复咨询</el-radio-button>
        </el-radio-group>
        <el-table :data="data" highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column prop="goods_coding" label="商品编号" width sortable></el-table-column>
            <el-table-column prop="last_created_at" label="咨询时间" width sortable></el-table-column>
            <el-table-column prop="goods_name" label="商品名称" width sortable></el-table-column>
            <el-table-column prop="price" label="价格" width="120" sortable>
                <template slot-scope="scope">
                    <div>原价：{{scope.row.market_price}}</div>
                    <div>现价：{{scope.row.goods_price}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="goods_status" label="商品状态" min-width sortable>
                <template slot-scope="scope">
                    <span v-if="scope.row.goods_status==0">库存里</span>
                    <span v-if="scope.row.goods_status==1">已上架</span>
                    <span v-if="scope.row.goods_status==2">已下架</span>
                </template>
            </el-table-column>
            <el-table-column prop="kefu_user_name" label="负责客服" min-width sortable></el-table-column>
            <el-table-column prop="reply_status" label="回复状态" min-width sortable></el-table-column>
            <el-table-column prop="last_reply_at" label="回复时间" min-width sortable></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                    >会话详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :page-size="20"
                :total="total"
                style="float:right;"
            ></el-pagination>
        </el-col>
    </section>
</template>

<script>
import { getUserList, talkList, getGoodsCategory } from "../../api/api";
import utils from "@/common/js/util";

export default {
    data() {
        return {
            status: "0",
            data: [],
            total: 0,
            page: 1,
            formInline: {
                name: "",
                num: "",
                effectiveTime: ""
            },
            type: "",
            options: [],
            listLoading: false,
            cid: ""
        };
    },
    methods: {
        handleChange(val) {
            this.cid = val.toString();
        },
        radioChange(val) {
            this.status = val;
            this.talkList();
        },
        onSearch() {
            this.talkList();
        },
        resetField() {
            this.formInline = {};
            this.type = "";
        },
        handleCurrentChange(val) {
            this.page = val;
            this.talkList();
        },
        talkList() {
            let start_time = "";
            let end_time = "";
            if (this.formInline.effectiveTime) {
                start_time = utils.formatDate.format(
                    this.formInline.effectiveTime[0],
                    "yyyy-MM-dd hh:mm:ss"
                );
                end_time = utils.formatDate.format(
                    this.formInline.effectiveTime[1],
                    "yyyy-MM-dd hh:mm:ss"
                );
            }
            const params = {
                name: this.formInline.name,
                cid: this.cid,
                goods_no: this.formInline.num,
                start_time,
                end_time,
                status: this.status
            };
            talkList(params)
                .then(res => {
                    const data = res.data.data.data;
                    this.data = data.lists;
                    this.total = data.total;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getGoodsCategory() {
            getGoodsCategory()
                .then(res => {
                    const data = res.data.data.data;
                    this.options = data;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.talkList();  
        this.getGoodsCategory();
    }
};
</script>

<style scoped>
</style>