<template>
    <!-- 商品订单 -->
    <section>
        <!--工具条-->
        <div class="toolbar">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="订单号">
                    <el-input v-model="formInline.name" placeholder="订单号"></el-input>
                </el-form-item>

                <el-form-item label="买家账号">
                    <el-input v-model="formInline.num" placeholder="买家账号"></el-input>
                </el-form-item>

                <el-form-item label="支付时间">
                    <el-date-picker
                        v-model="createtime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    ></el-date-picker>
                </el-form-item>

                <el-form-item label="支付方式">
                    <el-select v-model="formInline.brand" placeholder>
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="商品名称">
                    <el-input v-model="formInline.num" placeholder="姓名/手机号"></el-input>
                </el-form-item>

                <el-form-item label="收货人">
                    <el-input v-model="formInline.num" placeholder="快递单号"></el-input>
                </el-form-item>

                <el-form-item label="快递单号">
                    <el-input v-model="formInline.num" placeholder="快递单号"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                    <el-button type="primary" @click="resetField">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!--列表-->
        <el-table
            :data="data"
            highlight-current-row
            v-loading="listLoading"
            @selection-change="selsChange"
            style="width: 100%;"
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="num" label="订单号" width="100" sortable></el-table-column>
            <el-table-column prop="name" label="商品名称" width="100" sortable></el-table-column>
            <el-table-column prop="price" label="规格型号" width="120" sortable></el-table-column>
            <el-table-column prop="addr" label="买家账号" min-width="180" sortable></el-table-column>
            <el-table-column prop="stock" label="价格" min-width="180" sortable></el-table-column>
            <el-table-column prop="views" label="购买数量" min-width="180" sortable></el-table-column>
            <el-table-column prop="sales" label="优惠券抵扣" min-width="180" sortable></el-table-column>
            <el-table-column prop="addr" label="活动抵扣" min-width="180" sortable></el-table-column>
            <el-table-column prop="addr" label="支付时间" min-width="180" sortable></el-table-column>
            <el-table-column prop="addr" label="分销佣金" min-width="180" sortable></el-table-column>
            <el-table-column prop="addr" label="平台佣金" min-width="180" sortable></el-table-column>
            <el-table-column prop="addr" label="实际到账" min-width="180" sortable></el-table-column>
            <el-table-column prop="addr" label="收货信息" min-width="180" sortable></el-table-column>
            <el-table-column prop="addr" label="订单状态" min-width="180" sortable></el-table-column>
            <el-table-column prop="addr" label="状态更新时间" min-width="180" sortable></el-table-column>
            <el-table-column prop="addr" label="快递单号" min-width="180" sortable></el-table-column>
            <el-table-column prop="addr" label="退换方式" min-width="180" sortable></el-table-column>
            <el-table-column prop="addr" label="退换原因" min-width="180" sortable></el-table-column>
            <el-table-column prop="addr" label="申请次数" min-width="180" sortable></el-table-column>
            <el-table-column prop="addr" label="回退快递" min-width="180" sortable></el-table-column>
            <el-table-column prop="addr" label="退换结果" min-width="180" sortable></el-table-column>
            <el-table-column prop="addr" label="处理时间" min-width="180" sortable></el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                    >商品详情</el-button>
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
import { getUserList } from "../../api/api";
export default {
    data() {
        return {
            tabPosition: "0",
            data: [],
            total: 0,
            page: 1,
            sels: [], //列表选中项
            formInline: {
                name: "",
                createtime: "",
                brand: ""
            },
            type: [],
            options: [
                {
                    value: 1,
                    label: "东南",
                    children: [
                        {
                            value: 2,
                            label: "上海",
                            children: [
                                { value: 3, label: "普陀" },
                                { value: 4, label: "黄埔" },
                                { value: 5, label: "徐汇" }
                            ]
                        },
                        {
                            value: 7,
                            label: "江苏",
                            children: [
                                { value: 8, label: "南京" },
                                { value: 9, label: "苏州" },
                                { value: 10, label: "无锡" }
                            ]
                        },
                        {
                            value: 12,
                            label: "浙江",
                            children: [
                                { value: 13, label: "杭州" },
                                { value: 14, label: "宁波" },
                                { value: 15, label: "嘉兴" }
                            ]
                        }
                    ]
                },
                {
                    value: 17,
                    label: "西北",
                    children: [
                        {
                            value: 18,
                            label: "陕西",
                            children: [
                                { value: 19, label: "西安" },
                                { value: 20, label: "延安" }
                            ]
                        },
                        {
                            value: 21,
                            label: "新疆维吾尔族自治区",
                            children: [
                                { value: 22, label: "乌鲁木齐" },
                                { value: 23, label: "克拉玛依" }
                            ]
                        }
                    ]
                }
            ],
            createtime: "",
            listLoading: false
        };
    },
    methods: {
        selsChange() {},
        handleChange() {},
        onSearch() {},
        resetField() {},
        handleEdit() {},
        handleDel() {},
        handleObt() {},
        handleAdj() {},
        getdata() {
            let para = {};
            this.listLoading = true;
            getUserList(para).then(data => {
                this.total = res.data.total;
                this.data = res.data.users;
                this.listLoading = false;
            });
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getdata();
        }
    },
    mounted() {}
};
</script>

<style scoped>
</style>