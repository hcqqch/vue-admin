<template>
<!-- 优惠券列表 -->
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="优惠券名称">
                        <el-input v-model="formInline.name" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="优惠券类型">
                        <el-select v-model="formInline.type" placeholder="请选择">
                            <el-option label="现金券" value="1"></el-option>
                            <el-option label="折扣券" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="领取方式">
                        <el-select v-model="formInline.send_type" placeholder="领取方式">
                            <el-option label="自助领取" value="1"></el-option>
                            <el-option label="手工发送" value="2"></el-option>
                            <el-option label="活动领取" value="3"></el-option>
                        </el-select>
                    </el-form-item>
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
            </el-form>
        </el-col>

        <!--列表-->
        <el-radio-group v-model="status" @change="radioChange" style="margin-bottom: 10px;">
            <el-radio-button label="1">可用优惠券</el-radio-button>
            <el-radio-button label="2">未开始优惠券</el-radio-button>
            <el-radio-button label="3">过期优惠券</el-radio-button>
        </el-radio-group>
       <el-button class="addCouponBtn" @click="addCoupon" type="primary">新增优惠券</el-button>
        <el-table
            :data="data"
            highlight-current-row
            v-loading="listLoading"
            @selection-change="selsChange"
            style="width: 100%;"
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="title" label="优惠卷名称" width="" sortable></el-table-column>
            <el-table-column prop="created_at" label="生成时间" width="" sortable></el-table-column>
            <el-table-column prop="amount" label="面值" width="" sortable></el-table-column>
            <el-table-column prop="use_type" label="使用条件" width="" sortable>
                <template slot-scope="scope">
                    <div v-if="scope.row.use_type==0">不限制</div>
                    <div v-if="scope.row.use_type==1">满减</div>
                    <div v-if="scope.row.use_type==2">满件</div>
                </template>
            </el-table-column>
            <el-table-column prop="exp_start" label="使用期限" min-width="" sortable>
                <template slot-scope="scope">
                    <span>{{scope.row.exp_start}}至{{scope.row.exp_end}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="get_count" label="领取限制" min-width="" sortable></el-table-column>
            <el-table-column prop="count" label="发放总量" min-width="" sortable></el-table-column>
            <el-table-column prop="get_total" label="已领取" min-width="" sortable></el-table-column>
            <el-table-column prop="use_total" label="已使用" min-width="" sortable></el-table-column>
            <!-- <el-table-column prop="addr" label="优惠券链接" min-width="" sortable></el-table-column> -->
            <el-table-column label="操作" width="210">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.row.id)">领取使用记录</el-button>
                    <el-button v-if="status==1||status==2"
                        size="small"
                        type="danger"
                        @click="handleOver(scope.row.id)"
                    >结束</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button @click="handleBatchOver">批量结束</el-button>
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
import { couponList,couponOpreate } from "../../api/api";
import qs from "qs";
import utils from "@/common/js/util";

export default {
    data() {
        return {
            // tabPosition:"0",
            data: [],
            total: 0,
            page: 1,
            sels: [], //列表选中项
            formInline: {
                name: "",
                effectiveTime: "",
                type:"",
                send_type:""
            },
            type: [],
            listLoading: false,
            status:1,
            ids:[]
        };
    },
    methods: {
         selsChange(val) {
            this.ids = [];
            val.map(item => {
                this.ids.push(item.id);
            });
        },
        handleChange() {},
        handleBatchOver(){
            const params = {
                ids:this.ids,
                action:"end"
            }
             couponOpreate(qs.stringify(params)).then(res=>{
                if(res.data.msg){
                    this.$message({
                        type:"success",
                        message:res.data.msg
                    })
                }else{
                    this.$message({
                        type:"warning",
                        message:res.data.msg
                    })
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        radioChange(val){
            this.status = val;
            this.couponList();
        },
        onSearch() {
            this.couponList();
        },
        resetField() {
            this.formInline = {}
        },
        handleEdit(id) {
            this.$router.push('/couponrecord?id='+id)
        },
        handleOver(id) {
            const params = {
                ids:id,
                action:"end"
            }
            couponOpreate(qs.stringify(params)).then(res=>{
                if(res.data.msg){
                    this.$message({
                        type:"success",
                        message:res.data.msg
                    })
                }else{
                    this.$message({
                        type:"warning",
                        message:res.data.msg
                    })
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        handleCurrentChange(val) {
            this.page = val;
        },
        addCoupon(){
           this.$router.push('/editcoupon');
        },
        couponList(){
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
                type: this.formInline.type,
                send_type:this.formInline.send_type,
                start_time,
                end_time,
                status: this.status
            };
            console.log(params)
            this.listLoading = true;
            couponList(params)
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
        }
    },
    mounted() {
        this.couponList()
    }
};
</script>

<style scoped>
.addCouponBtn{
    position: relative;
    top: -4px;
    left: 10px;
}
</style>