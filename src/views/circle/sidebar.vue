<template>
    <!-- 商圈侧栏商品 -->
    <section>
        <el-col :span="24" class="toolbar">
            <el-button type="primary" @click="addGoods">添加商品</el-button>
        </el-col>
        <!--列表-->
        <el-table :data="data" highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column prop="goods_coding" label="商品编号" sortable></el-table-column>
            <el-table-column prop="goods_name" label="商品名称" sortable></el-table-column>
            <el-table-column prop="goods_name" label="排序" sortable>
                <template slot-scope="scope">
                    <!-- <el-select size="mini" v-model="scope.row.address" placeholder="请选择">
                        <el-option
                        v-for="item in option"
                        :key="item.id"
                        :label="item.text"
                        :value="item.id">
                        </el-option>
                    </el-select> -->
                    <el-select
                        style="width:20%"
                        size="mini"
                        v-model="scope.row.sort"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in sortOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-button @click="submitSort(scope.row)" size="mini">确定</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" type="danger" @click="handleDel(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="添加商品" width="20%" :visible.sync="dialogFormVisible">
            <el-checkbox-group v-model="ids" @change="changeChecked">
                <el-checkbox v-for="(item,i) in goods" :label="item.id" :key="i">{{item.goods_name}}</el-checkbox>
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitGoods">确定添加</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import {
    upperGoodsSort,
    addCircleRight,
    getCircleRightList,
    delCircleRight,
    sortCircleRight
} from "../../api/api";
import axios from "axios";

export default {
    data() {
        return {
            data: [],
            total: 0,
            page: 1,
            listLoading: false,
            ids: [],
            dialogFormVisible: false,
            goods: [],
            sortOptions: []
        };
    },
    methods: {
        changeChecked(val) {
            this.ids = val;
        },
        addGoods() {
            this.dialogFormVisible = true;
        },
        handleDel(id) {
            const params = {
                id
            };
            delCircleRight(params)
                .then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            type: "success",
                            message: res.data.msg
                        });
                    } else {
                        this.$message({
                            type: "warning",
                            message: res.data.msg
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            this.getCircleRightList();
        },
         submitSort(row) {
            console.log(this.sortOptions)
            console.log(this.data)
            console.log(row);
            const params = {
                id: row.id,
                sort: row.sort
            };
           
             sortCircleRight(params)
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
                .catch();
            this.getCircleRightList();
        },
        submitGoods() {
            const params = {
                ids: this.ids.toString()
            };
            addCircleRight(params)
                .then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            type: "success",
                            message: res.data.msg
                        });
                    } else {
                        this.$message({
                            type: "warning",
                            message: res.data.msg
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            this.dialogFormVisible = false;
            this.getCircleRightList();
        },
        upperGoodsSort() {
            upperGoodsSort()
                .then(res => {
                    const data = res.data.data.data;
                    this.goods = data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getCircleRightList() {
            getCircleRightList()
                .then(res => {
                    const data = res.data.data.data;
                    this.data = data;
                    this.sortOptions = [];
                    data.map(item => {
                        this.sortOptions.push({
                            label: item.sort,
                            value: item.sort
                        });
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.upperGoodsSort();
        this.getCircleRightList();
    }
};
</script>

<style scoped>
</style>