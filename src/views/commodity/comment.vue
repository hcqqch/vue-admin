<template>
    <!-- 商品评论 -->
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
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                    <el-button type="primary" @click="resetField">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="data" highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column prop="goods_name" label="商品名称" width="100" sortable></el-table-column>
            <el-table-column prop="norms_name" label="规格" width="100" sortable></el-table-column>
            <el-table-column prop="paytime" label="下单时间" width="100" sortable></el-table-column>
            <el-table-column prop="confirm_time" label="收货时间" width="120" sortable></el-table-column>
            <el-table-column prop="content" label="评论内容" min-width="180" sortable></el-table-column>
            <el-table-column prop="created_at" label="评论时间" min-width="180" sortable></el-table-column>
            <el-table-column prop="reply" label="掌柜回复" min-width="180" sortable></el-table-column>
            <el-table-column prop="reply_user_name" label="回复人" min-width="180" sortable></el-table-column>
            <el-table-column prop="reply_at" label="回复时间" min-width="180" sortable></el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleReply(scope.row.id)">回复</el-button>
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

        <el-dialog width="30%" title="回复评论" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="回复评论">
                    <el-input type="textarea" v-model="form.comment" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitComment">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import { getCommentList, getGoodsCategory, replyComment } from "../../api/api";

export default {
    data() {
        return {
            data: [],
            total: 0,
            page: 1,
            formInline: {
                name: "",
                cid: "",
                num: ""
            },
            type: [],
            options: [],
            listLoading: false,
            cid: "",
            form: {
                comment: ""
            },
            dialogFormVisible: false,
            id: ""
        };
    },
    methods: {
        handleChange(val) {
            this.cid = val.toString();
        },
        onSearch() {
            this.getCommentList();
        },
        resetField() {
            this.formInline = {};
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getdata();
        },
        getCommentList() {
            const params = {
                name: this.formInline.name,
                cid: this.cid,
                goods_no: this.formInline.num
            };
            this.listLoading = true;
            getCommentList(params)
                .then(res => {
                    const data = res.data.data.data;
                    this.data = data.lists;
                    this.listLoading = false;
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
        },
        handleReply(id) {
            this.dialogFormVisible = true;
            this.id = id;
        },
        submitComment() {
            const params = {
                id: this.id,
                content: this.form.comment
            };
            replyComment(params)
                .then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: res.data.msg,
                            type: "success"
                        });
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: "warning"
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            this.dialogFormVisible = false;
        }
    },
    mounted() {
        this.getCommentList();
        this.getGoodsCategory();
    }
};
</script>

<style scoped>
</style>