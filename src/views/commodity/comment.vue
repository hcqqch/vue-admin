<template>
<!-- 商品评论 -->
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-col :span="6">
                    <el-form-item label="商品名称">
                        <el-input v-model="formInline.name" placeholder="商品名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="商品分类">
                        <el-cascader
                            v-model="type"
                            :options="options"
                            :props="{ expandTrigger: 'hover' }"
                            @change="handleChange"
                        ></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商品编号">
                        <el-input v-model="formInline.num" placeholder="商品编号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSearch">查询</el-button>
                        <el-button type="primary" @click="resetField">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table
            :data="data"
            highlight-current-row
            v-loading="listLoading"
            style="width: 100%;"
        >
            <el-table-column prop="num" label="商品名称" width="100" sortable></el-table-column>
            <el-table-column prop="createtime" label="规格" width="100" sortable></el-table-column>
            <el-table-column prop="name" label="下单时间" width="100" sortable></el-table-column>
            <el-table-column prop="price" label="收货时间" width="120" sortable></el-table-column>
            <el-table-column prop="stock" label="评论内容" min-width="180" sortable></el-table-column>
            <el-table-column prop="views" label="评论内容" min-width="180" sortable></el-table-column>
            <el-table-column prop="sales" label="评论时间" min-width="180" sortable></el-table-column>
            <el-table-column prop="addr" label="掌柜回复" min-width="180" sortable></el-table-column>
            <el-table-column prop="addr" label="回复人" min-width="180" sortable></el-table-column>
            <el-table-column prop="addr" label="回复时间" min-width="180" sortable></el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                    >删除</el-button>
                    <el-button size="small" @click="handleObt(scope.$index, scope.row)">下架</el-button>
                    <el-button
                        type="danger"
                        size="small"
                        @click="handleAdj(scope.$index, scope.row)"
                    >调整库存</el-button>
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
            tabPosition:"0",
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