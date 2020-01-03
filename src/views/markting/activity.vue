<template>
    <!-- 满减活动 -->
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-col :span="6">
                    <el-form-item label="活动名称">
                        <el-input v-model="formInline.name" placeholder="活动名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="活动类型">
                        <el-select v-model="formInline.product_type" placeholder="领取方式">
                            <el-option label="手工领取" value="shanghai"></el-option>
                            <el-option label="自动领取" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="有效期">
                        <el-date-picker
                            v-model="formInline.effectiveTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="有效期"
                            end-placeholder="有效期"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSearch">查询</el-button>
                        <el-button type="primary" @click="resetField">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-col>

        <!--列表-->
        <el-radio-group @change="changeRadio" v-model="status" style="margin-bottom: 10px;">
            <el-radio-button label="0">进行活动中</el-radio-button>
            <el-radio-button label="1">未开始</el-radio-button>
            <el-radio-button label="2">已结束</el-radio-button>
        </el-radio-group>
        <el-button class="addCouponBtn" @click="addActivity" type="primary">新增活动</el-button>
        <el-table
            :data="data"
            highlight-current-row
            v-loading="listLoading"
            @selection-change="selsChange"
            style="width: 100%;"
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="活动名称" width sortable></el-table-column>
            <el-table-column prop="created_at" label="生成时间" width="160" sortable></el-table-column>
            <el-table-column prop="name" label="有效期" width="300" sortable>
                <template slot-scope="scope">
                    <span>{{scope.row.start_time}}-{{scope.row.end_time}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="condition_data" label="优惠方式" width sortable>
                <template slot-scope="scope">
                    <span v-if="scope.row.condition_type==1">
                        <div
                            v-for="(item,i) in scope.row.condition_data"
                            :key="i"
                        >满{{item.limit}}元减{{item.decrease}}元</div>
                    </span>
                    <span v-if="scope.row.condition_type==2">
                        <div
                            v-for="(item,i) in scope.row.condition_data"
                            :key="i"
                        >满{{item.limit}}件减{{item.decrease}}元</div>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="add_coupon" label="叠加优惠券" min-width sortable>
                <template slot-scope="scope">
                    <span v-if="scope.row.add_coupon==1">否</span>
                    <span v-if="scope.row.add_coupon==2">是</span>
                </template>
            </el-table-column>
            <el-table-column prop="product_count" label="参与商品" sortable>
                <template slot-scope="scope">
                    <span v-if="scope.row.product_type==1">全部商品</span>
                    <span v-if="scope.row.product_type==2">{{scope.row.product_count}}件商品</span>
                </template>
            </el-table-column>
            <el-table-column prop="limit" label="参与限制" sortable>
                <template slot-scope="scope">
                    <span v-if="scope.row.limit==0">不限制</span>
                    <span v-if="scope.row.limit>0">{{scope.row.limit}}次/每人</span>
                </template>
            </el-table-column>
            <el-table-column prop="join_count" label="已参与" sortable></el-table-column>
            <el-table-column prop="status" label="活动状态" sortable></el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleOver(scope.row.id)"
                    >结束</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button @click="batchOver" type>批量结束</el-button>
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
import { fullScaleList, fullScaleAdd, OverFullScale } from "../../api/api";
import utils from "@/common/js/util";

export default {
    data() {
        return {
            data: [],
            total: 0,
            page: 1,
            sels: [], //列表选中项
            formInline: {
                name: "",
                product_type: "",
                effectiveTime: ""
            },
            status: 0,
            type: [],
            listLoading: false,
            ids:[]
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
            this.fullScaleList();
        },
        resetField() {
            this.formInline = {};
        },
        handleEdit(index, row) {
            let id = row.id;
            this.$router.push("/editactivity?id=" + row.id);
        },
    
        handleOver(id) {
            const params = {
                id
            }
            OverFullScale(params).then(res=>{
                if(res.data.msg){
                    this.$message({
                        message:res.data.msg,
                        type:'success'
                    })
                }else{
                   this.$message({
                        message:res.data.msg,
                        type:'warning'
                    }) 
                }
            }).catch()
            this.fullScaleList();
        },
        batchOver(){
            const params = {
                id:this.ids.toString()
            }
            OverFullScale(params).then(res=>{
                if(res.data.msg){
                    this.$message({
                        message:res.data.msg,
                        type:'success'
                    })
                }else{
                   this.$message({
                        message:res.data.msg,
                        type:'warning'
                    }) 
                }
            }).catch()
            this.fullScaleList();
        },

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
            this.fullScaleList();
        },
        addActivity() {
            this.$router.push("./editactivity");
        },
        changeRadio(val) {
            this.fullScaleList();
        },
        fullScaleList() {
            let start_time = "";
            let end_time = "";
            if (this.formInline.effectiveTime) {
                start_time = utils.formatDate.format(
                    this.formInline.effectiveTime[0],
                    "yyyy-MM-dd"
                );
                end_time = utils.formatDate.format(
                    this.formInline.effectiveTime[1],
                    "yyyy-MM-dd"
                );
            }
            const params = {
                name: this.formInline.name,
                product_type: this.formInline.product_type,
                start_time,
                end_time,
                status: this.status
            };
            this.listLoading = true;
            fullScaleList(params)
                .then(res => {
                    const data = res.data.data.data;
                    console.log(data);
                    this.data = data.lists;
                    this.total = data.total;
                    this.listLoading = false;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        OverFullScale(){
            OverFullScale
        }
    },
    mounted() {
        this.fullScaleList();
    }
};
</script>

<style scoped>
.addCouponBtn {
    position: relative;
    top: -4px;
    left: 10px;
}
</style>