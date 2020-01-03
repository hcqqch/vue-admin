<template>
<!-- 优惠券使用记录 -->
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <!-- <el-form-item label="优惠券名称">
                        <el-input v-model="formInline.name" placeholder=""></el-input>
                    </el-form-item> -->
                    <el-form-item label="领取方式">
                        <el-select v-model="formInline.send_type" placeholder="领取方式">
                            <el-option label="自助领取" value="1"></el-option>
                            <el-option label="手工发送" value="2"></el-option>
                            <el-option label="活动领取" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用状态">
                        <el-select v-model="formInline.use_state" placeholder="请选择">
                            <el-option label="未开始" value="1"></el-option>
                            <el-option label="已开始" value="2"></el-option>
                            <el-option label="已结束" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSearch">查询</el-button>
                        <el-button type="primary" @click="resetField">重置</el-button>
                    </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <!-- <el-radio-group v-model="status" @change="radioChange" style="margin-bottom: 10px;">
            <el-radio-button label="1">可用优惠券</el-radio-button>
            <el-radio-button label="2">未开始优惠券</el-radio-button>
            <el-radio-button label="3">过期优惠券</el-radio-button>
        </el-radio-group> -->
       <!-- <el-button class="addCouponBtn" @click="addCoupon" type="primary">新增优惠券</el-button> -->
        <el-table
            :data="data"
            highlight-current-row
            v-loading="listLoading"
            style="width: 100%;"
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <!-- <el-table-column prop="title" label="优惠卷名称" width="" sortable></el-table-column> -->
            <el-table-column prop="username" label="领取人" min-width="" sortable></el-table-column>
            <el-table-column prop="bindtime" label="领劵时间" min-width="" sortable></el-table-column>
            <el-table-column prop="usetime" label="使用时间" min-width="" sortable>
                <template slot-scope="scope">
                    <span v-if="scope.row.status==1">未使用</span>
                    <span v-if="scope.row.status==2">{{scope.row.usetime}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="order_no" label="订单编号" min-width="" sortable></el-table-column>
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
import { couponRecordList } from "../../api/api";
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
                // name: "",
                send_type:"",
                use_state:""
            },
            type: [],
            listLoading: false,
            status:0
        };
    },
    methods: {
        // radioChange(val){
        //     this.status = val;
        //     this.couponRecordList();
        // },
        onSearch() {
            this.couponRecordList();
        },
        resetField() {
            this.formInline = {}
        },
        handleCurrentChange(val) {
            this.page = val;
        },
        // addCoupon(){
        //    this.$router.push('/editcoupon');
        // },
        couponRecordList(){
            const params = {
                id:this.$route.query.id,    
                // name: this.formInline.name,
                type: this.formInline.send_type,
                use_type:this.formInline.use_state,
            };
            console.log(params)
            this.listLoading = true;
            couponRecordList(params)
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
        this.couponRecordList()
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