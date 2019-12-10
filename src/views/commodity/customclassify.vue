<template>
    <!-- 店铺自定义分类 -->
    <section class="classify" style="padding:20px">
        <div class="infoItem">商品分类</div>
        <div style="margin-bottom:10px">
            <el-button type="primary" @click="addNewType">添加商品分类</el-button>
        </div>

        <el-table
            :data="tableData1"
            style="width: 100%"
            row-key="id"
            border
            lazy
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
            <el-table-column prop="name" label="分类名称" width="180"></el-table-column>
            <el-table-column prop="index" label="排序" width="180">
                <template slot-scope="scope">
                    <el-select
                        style="width:50%"
                        size="mini"
                        v-model="scope.row.sort"
                        placeholder="请选择"
                    >
                        <template v-if="scope.row.children">
                            <el-option
                                v-for="item in sortOptions"
                                :key="item.sort"
                                :label="item.label"
                                :value="item.sort"
                            ></el-option>
                        </template>
                        <template v-else>
                            <el-option
                                v-for="item in sortChildOptions"
                                :key="item.sort"
                                :label="item.label"
                                :value="item.sort"
                            ></el-option>
                        </template>
                    </el-select>
                    <el-button @click="submitSort(scope.row)" size="mini">确定</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="operat" label="操作">
                <template slot-scope="scope">
                    <el-button
                        v-if="scope.row.children"
                        size="mini"
                        @click="addNewType2(scope.row.id)"
                    >添加子分类</el-button>
                    <el-button
                        v-if="!scope.row.children"
                        @click="transferGood(scope.row.id)"
                        size="mini"
                    >转移商品</el-button>
                    <el-button @click="editType(scope.row)" size="mini">编辑</el-button>
                    <el-button @click="handDel(scope.row.id)" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog width="30%" title="添加分类" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="分类名称">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitType">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog width="30%" title="转移商品" :visible.sync="dialogFormVisible2">
            <el-transfer
                filterable
                :filter-method="filterMethod"
                filter-placeholder="请输入城市拼音"
                v-model="value"
                :data="data"
            ></el-transfer>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitType">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
 
<script>
import {
    getCategorylist,
    addCategory,
    editCategory,
    deleteCategory,
    sortCategory
} from "../../api/api";
import axios from "axios";
import qs from "qs";
// import Sortable from "sortablejs";

export default {
    data() {
        // return {
        //     dialogFormVisible: false,
        //     dialogFormVisible2:false,
        //     form: {
        //         name: "" //分类名称
        //     },
        //     tableData1: [],
        //     id: 0,
        //     isEdit: false,
        //     rowName: "",
        //     sortOptions: []
        // };
        const generateData = _ => {
            const data = [];
            const cities = [
                "上海",
                "北京",
                "广州",
                "深圳",
                "南京",
                "西安",
                "成都"
            ];
            const pinyin = [
                "shanghai",
                "beijing",
                "guangzhou",
                "shenzhen",
                "nanjing",
                "xian",
                "chengdu"
            ];
            cities.forEach((city, index) => {
                data.push({
                    label: city,
                    key: index,
                    pinyin: pinyin[index]
                });
            });
            return data;
        };
        return {
            data: generateData(),
            value: [],
            filterMethod(query, item) {
                return item.pinyin.indexOf(query) > -1;
            },
            dialogFormVisible: false,
            dialogFormVisible2: false,
            form: {
                name: "" //分类名称
            },
            tableData1: [],
            id: 0,
            isEdit: false,
            rowName: "",
            sortOptions: [],
            sortChildOptions: []
        };
    },
    methods: {
        // 获取商品分类
        getCategorylist() {
            getCategorylist()
                .then(res => {
                    const data = res.data.data.data;
                    // console.log(data);
                    this.tableData1 = data;

                    this.sortOptions = [];
                    this.sortChildOptions = []
                    data.map(item => {
                        if (item.children.length > 0) {
                            item.children.map(child => {
                                this.sortChildOptions.push({
                                    label: child.sort,
                                    value: child.sort
                                });
                            });
                        }
                        // item.children.length == 0;
                        if (item.children) {
                            this.sortOptions.push({
                                label: item.sort,
                                value: item.sort
                            });
                        }
                        // this.sortOptions.push()

                        // if (item.children.length > 0) {
                        //     // this.sortOptions = [];
                        //     item.children.map(item => {
                        //         this.sortOptions.push({
                        //             label: item.sort,
                        //             value: item.sort
                        //         });
                        //     });
                        // } else {
                        //     this.sortOptions = [];
                        //     this.sortOptions.push({
                        //         label: item.sort,
                        //         value: item.sort
                        //     });
                        // }
                    });
                    console.log(this.sortOptions)
                    console.log(this.sortChildOptions)
                    // console.log(this.sortOptions);
                })
                .catch();
        },
        //添加一级分类
        addNewType() {
            this.isEdit = false;
            this.form.name = "";
            this.id = 0;
            this.dialogFormVisible = true;
        },
        //添加二级分类
        addNewType2(id) {
            this.isEdit = false;
            this.form.name = "";
            this.id = id;
            this.dialogFormVisible = true;
        },
        // 编辑分类
        editType(row) {
            this.isEdit = true;
            this.id = row.id;
            this.form.name = row.name;
            this.dialogFormVisible = true;
        },
        async submitSort(row) {
            // console.log(row);
            const params = {
                id: row.id,
                sort: row.sort
            };
            await sortCategory(qs.stringify(params))
                .then(res => {
                    if (res.data.msg) {
                        this.$message({
                            message: res.data.msg,
                            type: "success"
                        });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: "error"
                        });
                    }
                })
                .catch();

            this.getCategorylist();
        },
        transferGood(id) {
            this.dialogFormVisible2 = true;
        },
        handDel(id) {
            const params = {
                id
            };
            deleteCategory(qs.stringify(params))
                .then(res => {
                    if (res.data.msg) {
                        this.$message({
                            message: res.data.msg,
                            type: "success"
                        });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: "error"
                        });
                    }
                })
                .catch();
            this.getCategorylist();
        },
        async submitType() {
            if (this.isEdit == true) {
                const params = {
                    name: this.form.name,
                    id: this.id
                };
                await editCategory(qs.stringify(params))
                    .then(res => {
                        if (res.data.msg) {
                            this.$message({
                                message: res.data.msg,
                                type: "success"
                            });
                        } else {
                            this.$message({
                                message: res.msg,
                                type: "error"
                            });
                        }
                    })
                    .catch();
            } else {
                const params = {
                    name: this.form.name,
                    pid: this.id
                };
                await addCategory(qs.stringify(params))
                    .then(res => {
                        if (res.data.msg) {
                            this.$message({
                                message: res.data.msg,
                                type: "success"
                            });
                        } else {
                            this.$message({
                                message: res.msg,
                                type: "error"
                            });
                        }
                    })
                    .catch();
            }
            this.dialogFormVisible = false;
            this.getCategorylist();
        }
    },
    mounted() {
        this.getCategorylist();
    }
};
</script> 

<style lang="scss" scoped>
.classify {
    .infoItem {
        width: 99%;
        padding: 10px;
        background: #f2f2f2;
        margin-bottom: 20px;
    }
}
</style> 
 