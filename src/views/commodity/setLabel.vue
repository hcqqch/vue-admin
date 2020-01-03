<template>
    <!-- 标签管理 -->
    <section>
        <el-col :span="24" class="toolbar">
            <el-button type="primary" @click="addTag('add')">添加标签</el-button>
        </el-col>
        <!--列表-->
        <el-table
            :data="data"
            highlight-current-row
            v-loading="listLoading"
            @selection-change="selsChange"
            style="width: 100%;"
        >
            <el-table-column prop="name" label="标签名称" sortable></el-table-column>

            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDel(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="添加商品标签" width="20%" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="标签名称">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitTag(type)">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import { getTaglist, addTag, updateTag, deleteTag } from "../../api/api";
import axios from "axios";

export default {
    data() {
        return {
            data: [],
            total: 0,
            page: 1,
            sels: [], //列表选中项
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
            listLoading: false,
            dialogFormVisible: false,
            form: {
                name: ""
            },
            isEdit: 0,
            id:""
        };
    },
    methods: {
        selsChange() {},
        addTag() {
            this.dialogFormVisible = true;
            this.isEdit = 0;
        },
        // 获取标签列表
        getTaglist() {
            this.listLoading = true;
            getTaglist()
                .then(res => {
                    this.data = res.data.data.data;
                    this.listLoading = false;
                })
                .catch();
        },
        // 新增标签
        submitTag() {
            if (this.isEdit == 0) {
                const params = {
                    name: this.form.name
                };
                addTag(params)
                    .then(res => {
                        console.log(res.data);
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
                        this.dialogFormVisible = false;
                    })
                    .catch();
                this.getTaglist();
            }else{
                const params = {
                    id:this.id,
                    name: this.form.name
                };
                updateTag(params)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.code==200) {
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
                        this.dialogFormVisible = false;
                    })
                    .catch();
                this.getTaglist();
            }
        },
        // 删除标签
        handleDel(id) {
            const params = {
                id
            };
            deleteTag(params)
                .then(res => {
                    if (res.data.code ==200) {
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
                .catch();
            this.getTaglist();
        },
        // 修改标签
        handleEdit(row) {
            console.log(row)
            this.dialogFormVisible = true;
            this.isEdit = 1;
            this.id = row.id;
            this.form.name = row.name;
        }
    },
    mounted() {
        this.getTaglist();
    }
};
</script>

<style scoped>
</style>