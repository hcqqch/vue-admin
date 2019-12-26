<template>
    <!-- 商品列表 -->
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="商品名称">
                    <el-input v-model="formInline.name" placeholder="商品名称"></el-input>
                </el-form-item>

                <el-form-item label="商品分类">
                    <el-cascader
                        v-model="formInline.type"
                        :options="options"
                        :props="{ checkStrictly: true }"
                        @change="handleChange"
                    ></el-cascader>
                </el-form-item>

                <el-form-item label="商品编号">
                    <el-input v-model="formInline.num" placeholder="商品编号"></el-input>
                </el-form-item>

                <el-form-item label="创建时间">
                    <el-date-picker
                        v-model="formInline.createtime"
                        type="daterange"
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
        <el-radio-group v-model="tabPosition" @change="radioChange" style="margin-bottom: 10px;">
            <el-radio-button label>全部商品</el-radio-button>
            <el-radio-button label="0">在售商品</el-radio-button>
            <el-radio-button label="1">仓库商品</el-radio-button>
            <el-radio-button label="2">售罄商品</el-radio-button>
            <el-radio-button label="3">强制下架</el-radio-button>
            <el-radio-button label="4">回收站</el-radio-button>
        </el-radio-group>
        <el-table
            :data="data"
            highlight-current-row
            v-loading="listLoading"
            @selection-change="selsChange"
            style="width: 100%;"
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="goods_coding" label="商品编号" width sortable></el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="140px" sortable></el-table-column>
            <el-table-column prop="goods_name" label="商品名称" width sortable>
                <template slot-scope="scope">
                    <img style="width:30px;height:30px" :src="scope.row.img" alt />
                    <span>{{scope.row.goods_name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="goods_price" label="价格" width sortable></el-table-column>
            <el-table-column prop="goods_stock" label="库存" sortable>
                <template slot-scope="scope">
                    <div>{{scope.row.goods_stock}}</div>
                    <div>{{scope.row.goods_norms_stock}}种规格缺货</div>
                </template>
            </el-table-column>
            <el-table-column prop="visits_total" label="访问量" sortable></el-table-column>
            <el-table-column prop="sale_num_z" label="总销量" sortable></el-table-column>
            <el-table-column prop="sort" label="排序" sortable></el-table-column>
            <el-table-column prop="goods_status" label="状态" sortable>
                <template slot-scope="scope">
                    <span v-if="scope.row.goods_status==0">库存里</span>
                    <span v-if="scope.row.goods_status==1">已上架</span>
                    <span v-if="scope.row.goods_status==2">已下架</span>
                    <span v-if="scope.row.goods_status==3">放到回收站</span>
                    <span v-if="scope.row.goods_status==4">已彻底删除</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="360px">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button
                        v-if="scope.row.goods_status==1"
                        size="small"
                        @click="downGoods(scope.row.id,'down')"
                    >下架</el-button>
                    <el-button
                        v-if="scope.row.goods_status==0"
                        size="small"
                        @click="downGoods(scope.row.id,'down')"
                    >上架</el-button>
                    <el-button
                        v-if="scope.row.goods_status==2"
                        size="small"
                        @click="downGoods(scope.row.id,'down')"
                    >上架</el-button>
                    <el-button
                        v-if="scope.row.goods_status==3"
                        size="small"
                        @click="downGoods(scope.row.id,'down')"
                    >申请恢复</el-button>
                    <!-- <el-button type size="small" @click="handleAdj(scope.row.id)">调整库存</el-button> -->
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button @click="downGoods(ids,'down')" type>下架</el-button>
            <el-button @click="upGoods(ids,'up')" type>上架</el-button>
            <el-button type>删除</el-button>
            <el-button @click="sortUpper" type>上架排序</el-button>
            <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :page-size="20"
                :total="total"
                style="float:right;"
            ></el-pagination>
        </el-col>

        <el-dialog :visible="dialogVisible">
            <draggable v-model="goods">
                <transition-group>
                    <!-- <div v-for="element in myArray" :key="element.id">{{element.name}}</div> -->
                    <!-- <el-checkbox-group> -->
                    <el-checkbox v-for="city in goods" :label="city" :key="city">{{city.goods_name}}</el-checkbox>
                    <!-- </el-checkbox-group> -->
                </transition-group>
            </draggable>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sortGoods">确定排序</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import {
    getGoodlist,
    getGoodsCategory,
    goodsOperate,
    getAddgoodsInfo,
    upperGoodsSort
} from "../../api/api";
import axios from "axios";
import qs from "qs";
import utils from "../../common/js/util";
import draggable from "vuedraggable";

export default {
    data() {
        return {
            dialogVisible: false,
            checkedCities: "",
            goods: [],
            tabPosition: "",
            data: [],
            total: 0,
            page: 1,
            sels: [], //列表选中项
            formInline: {
                name: "",
                type: "",
                num: "",
                createtime: ""
            },
            type: [],
            options: [],
            listLoading: false,
            status: "",
            ids: []
        };
    },
    methods: {
        selsChange(val) {
            this.ids = [];
            val.map(item => {
                this.ids.push(item.id);
            });
            console.log(this.ids);
        },
        handleChange() {},
        onSearch() {
            this.getGoodlist();
        },
        resetField() {
            this.formInline = {};
        },
        handleEdit(id) {
            this.$router.push("/addcommodity?id=" + id);
        },
        handleDel() {},
        handleObt() {},
        handleAdj() {},
        sortGoods() {
            console.log(this.goods);
            this.goods.map(item => {
                this.ids.push(item.id);
            });
            const params = {
                ids: this.ids.toString(),
                action: "sort"
            };
            goodsOperate(qs.stringify(params))
                .then(res => {
                    if (res.data.code==200) {
                        this.$message({
                            message: res.data.msg,
                            type: "success"
                        });
                    }else{
                        this.$message({
                            message: res.data.msg,
                            type: "warning"
                        });
                    }
                })
                .catch();
                this.dialogVisible = false;
        },
        sortUpper() {
            this.dialogVisible = true;
            upperGoodsSort()
                .then(res => {
                    const data = res.data.data.data;
                    this.goods = data;
                    // data.map(item => {
                    //     this.goods.push(item.goods_name);
                    // });
                })
                .catch();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getGoodlist();
        },
        radioChange(val) {
            this.status = val;
            this.getGoodlist();
        },
        getGoodlist() {
            let createtime = "";
            let createtime2 = "";
            let type = "";
            if (this.formInline.createtime.length > 0) {
                createtime = utils.formatDate.format(
                    this.formInline.createtime[0],
                    "yyyy-MM-dd"
                );
                createtime2 = utils.formatDate.format(
                    this.formInline.createtime[1],
                    "yyyy-MM-dd"
                );
            }
            if (this.formInline.num.length > 0) {
                type = this.formInline.type.toString();
            }
            console.log(this.formInline.type.toString());

            const params = {
                name: this.formInline.name,
                type: type,
                num: this.formInline.num,
                starttime: createtime,
                endtime: createtime2,
                status: this.tabPosition
            };
            console.log(params);
            this.listLoading = true;
            getGoodlist(params)
                .then(res => {
                    const data = res.data.data.data;
                    this.data = data.lists;
                    this.total = data.total;
                    console.log(data);
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
        // 操作上架下架
        goodsOperate(type) {
            const params = {
                ids: this.ids.toString(),
                action: type
            };
            goodsOperate(qs.stringify(params))
                .then(res => {
                    console.log(res);
                    if (res.data.code==200) {
                        this.$message({
                            message: res.data.msg,
                            type: "success"
                        });
                    }else{
                        this.$message({
                            message: res.data.msg,
                            type: "warning"
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //下架商品
        downGoods(ids, type) {
            this.ids = ids;
            this.goodsOperate(type);
            this.getGoodlist();
        },
        // 上架商品
        upGoods(type) {
            this.goodsOperate(type);
            this.getGoodlist();
        }
    },
    mounted() {
        this.getGoodlist();
        this.getGoodsCategory();
    },
    components: {
        draggable
    }
};
</script>

<style scoped>
</style>