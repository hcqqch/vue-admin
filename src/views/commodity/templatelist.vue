<template>
    <!-- 运费模板列表 -->
    <section>
        <el-col :span="24" class="toolbar">
            <el-button type="primary" @click="addTemplate">添加运费模板</el-button>
        </el-col>
        <!--列表-->
        <el-table :data="data" highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column prop="name" label="模板名称" sortable></el-table-column>

            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDel(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
import { getTemplist, delFreightTmplate} from "../../api/api";
import axios from "axios";

export default {
    data() {
        return {
            listLoading: false,
            data: []
        };
    },
    methods: {
        addTemplate() {
            this.$router.push("/addcommodity/addfremb");
        },
        // 获取标签列表
        getTemplist() {
            this.listLoading = true;
            getTemplist()
                .then(res => {
                    this.data = res.data.data.data;
                    this.listLoading = false;
                })
                .catch();
        },
        handleDel(id) {
            const params = {
                id
            };
            delFreightTmplate(params)
                .then(res => {
                    if (res.data.msg) {
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
            this.getTemplist();
        },
        handleEdit(row) {
            this.$router.push("/addcommodity/addfremb/:" + row.id);
        }
    },
    mounted() {
        this.getTemplist();
    }
};
</script>

<style scoped>
</style>