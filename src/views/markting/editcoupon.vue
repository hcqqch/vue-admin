<template>
    <!-- 新增优惠券 -->
    <section style="padding:20px">
        <div class="infoItem">优惠券卷面信息</div>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="优惠券名称">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="优惠券类型">
                <el-select v-model="form.type" placeholder="优惠券类型">
                    <el-option label="现金券" value="1"></el-option>
                    <el-option label="折扣卷" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="form.type==1" label="面值">
                <el-input v-model="form.amount"></el-input>
            </el-form-item>
            <el-form-item v-if="form.type==2" label="折扣">
                <el-input v-model="form.discount"></el-input>
            </el-form-item>
            <el-form-item label="使用条件">
                <el-radio-group
                    @change="changeRadio"
                    style="padding-top:14px"
                    v-model="form.radioCondition"
                >
                    <div>
                        <el-radio :label="1">不限制</el-radio>
                    </div>
                    <div style="margin-top:10px">
                        <el-radio :label="2">
                            订单满
                            <el-input
                                :disabled="isPriceUse"
                                v-model="form.fullReducePrice"
                                style="width:80px"
                                size="mini"
                            ></el-input>元可用
                        </el-radio>
                    </div>
                    <div style="margin-top:10px">
                        <el-radio :label="3">
                            订单满
                            <el-input
                                :disabled="isNumUse"
                                v-model="form.fullReduceNum"
                                style="width:80px"
                                size="mini"
                            ></el-input>件可用
                        </el-radio>
                    </div>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="有效期限">
                <el-date-picker
                    v-model="form.effectiveTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="发放方式">
                <el-checkbox-group v-model="form.checkList">
                    <el-checkbox label="1">自主领取</el-checkbox>
                    <el-checkbox label="2">手工发送</el-checkbox>
                    <el-checkbox label="3">活动领取</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>

        <div class="infoItem">基本规则</div>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="发放总量（张）">
                <el-input v-model="form.count"></el-input>
            </el-form-item>
            <el-form-item label="适用群体">
                <el-checkbox-group v-model="form.checkList2">
                    <!-- <el-checkbox label="全部用户">全部用户</el-checkbox> -->
                    <el-checkbox label="1">首次进店用户</el-checkbox>
                    <el-checkbox label="2">圈友专享</el-checkbox>
                    <el-checkbox label="3">店铺会员</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="每人限领（张）">
                <el-select v-model="form.get_count" placeholder="请选择">
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动商品">
                <el-radio-group style="padding-top:14px" v-model="form.product_type">
                    <div>
                        <el-radio :label="1">全部商品参与</el-radio>
                    </div>
                    <div style="margin-top:10px">
                        <el-radio :label="2">仅指定商品参与</el-radio>
                    </div>
                </el-radio-group>
            </el-form-item>

            <div style="margin-top:10px">
                <el-row>
                    <el-col :span="24" class="toolbar">
                        <el-form ref="form2" :model="form2">
                            <el-col :span="6">
                                <el-form-item label="商品名称" style="margin:0">
                                    <el-input style="width:200px" v-model="form2.name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item style="width:620px;margin:0" label="价格区间">
                                    <el-input v-model="form2.name" style="width:20%"></el-input>至
                                    <el-input v-model="form2.cname" style="width:20%"></el-input>
                                    <el-button type="primary">查询</el-button>
                                    <el-button type="primary" @click="submitCoupon">确定新增此优惠券</el-button>
                                </el-form-item>
                            </el-col>
                        </el-form>
                    </el-col>
                </el-row>
            </div>

            <div class="infoItem">
            已选:
            <div v-for="(item,i) in checkedGoods" :key="i" class="gooditem">
                <img :src="item.big_img" alt />
                <i @click="delThisGood(item.id)" class="el-icon-close"></i>
                <span>{{item.goods_name}}</span>
            </div>
        </div>

            <div>
                <el-table
                :data="tableData"
                highlight-current-row
                v-loading="listLoading"
                @selection-change="selsChange"
                style="width: 100%;"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="goods_name" label="商品名称" width sortable>
                    <template slot-scope="scope">
                        <span>{{scope.row.goods_name}}</span>
                        <img style="width:30px;height:30px" :src="scope.row.big_img" alt />
                    </template>
                </el-table-column>
                <el-table-column prop="goods_price" label="价格" width sortable></el-table-column>
                <el-table-column label="操作" width="150">
                    <template scope="scope">
                        <el-button size="small" @click="handleAdd(scope.$index, scope.row)">选取加入</el-button>
                    </template>
                </el-table-column>
            </el-table>

                <!--工具条-->
                <el-col :span="24" class="toolbar">
                    <el-button @click="handleBatchAdd" type>批量加入</el-button>
                    <el-pagination
                        layout="prev, pager, next"
                        @current-change="handleCurrentChange"
                        :page-size="20"
                        :total="total"
                        style="float:right;"
                    ></el-pagination>
                </el-col>
            </div>
        </el-form>
    </section>
</template>

<script>
import {
    couponAdd,
    getGoodlist,
    couponEdit
} from "../../api/api";
import qs from "qs";
import utils from "@/common/js/util";

export default {
    data() {
        return {
            form: {
                title:"",
                type: "1",
                amount:"",//面值
                discount: "", //折扣
                radioCondition: "", //使用条件
                fullReducePrice: "", //满减
                fullReduceNum: "", //满件
                effectiveTime: "", //有效时间
                checkList: [], //发送方式
                checkList2:[],
                product_type:""
            },
            listLoading:false,
            checkedGoods:[],
            tableData:[],
            selArr:[],
            total: 0,
            form2:{},
            isPriceUse: true, //满减是否可用
            isNumUse: true //满件是否可用
        };
    },
    methods: {
        handleCurrentChange(){},
        //使用条件
        changeRadio(value) {
            if (value == 2) {
                this.isPriceUse = false;
            } else {
                this.isPriceUse = true;
                this.form.fullReducePrice = "";
            }
            if (value == 3) {
                this.isNumUse = false;
            } else {
                this.isNumUse = true;
                this.form.fullReduceNum = "";
            }
        },
        selsChange(val) {
            this.selArr = [];
            val.map(item => {
                this.selArr.push({
                    id: item.id,
                    goods_name: item.goods_name,
                    big_img: item.big_img
                });
            });
            console.log(this.checkedGoods);
        },
        // 选取加入
        handleAdd(index, row) {
            console.log(index);
            console.log(row.big_img);
            console.log(this.checkedGoods);
            this.checkedGoods.push({
                id: row.id,
                goods_name: row.goods_name,
                big_img: row.big_img
            });
        },
        // 批量加入
        handleBatchAdd() {
            this.checkedGoods = this.selArr;
        },
        // 撤销当前商品
        delThisGood(id) {
            this.checkedGoods.forEach((item, index) => {
                if (item.id == id) {
                    this.checkedGoods.splice(index, 1);
                }
            });
        },
        // 获取商品列表
        getGoodlist() {
            this.listLoading = true;
            getGoodlist()
                .then(res => {
                    const data = res.data.data.data;
                    console.log(data);
                    this.tableData = data.lists;
                    this.listLoading = false;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //提交此优惠券
        submitCoupon() {
            let start_time = "";
            let end_time = "";
            if (this.form.effectiveTime) {
                start_time = utils.formatDate.format(
                    this.form.effectiveTime[0],
                    "yyyy-MM-dd"
                );
                end_time = utils.formatDate.format(
                    this.form.effectiveTime[1],
                    "yyyy-MM-dd"
                );
            }
            console.log(this.form.groups);
            let ids = [];
            if (this.checkedGoods.length > 0) {
                this.checkedGoods.map(item => {
                    ids.push(item.id);
                });
            }

            const params = {
                title: this.form.title,
                coupon_type:this.form.type,
                exp_start: start_time,
                exp_end: end_time,
                amount:this.form.amount,
                discount:this.form.discount,
                condition:this.form.radioCondition,
                full_reduce_num:this.form.fullReduceNum,
                full_reduce_price:this.form.fullReducePrice,
                send_type:this.form.checkList.toString(),
                count:this.form.count,
                people:this.form.checkList2.toString(),
                get_count:this.form.get_count,
                product_type: this.form.product_type,
                pids: ids.toString()
            };

            console.log(params);
            if (this.$route.query.id) {
                    couponEdit(
                    { data: JSON.stringify(params), id: this.$route.query.id },
                    {
                        transformRequest: [
                            function(data) {
                                var str = "";
                                for (var key in data) {
                                    str +=
                                        encodeURIComponent(key) +
                                        "=" +
                                        encodeURIComponent(data[key]) +
                                        "&";
                                }
                                return str;
                            }
                        ]
                    }
                )
                    .then(res => {})
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                couponAdd(
                    { data: JSON.stringify(params) },
                    {
                        transformRequest: [
                            function(data) {
                                var str = "";
                                for (var key in data) {
                                    str +=
                                        encodeURIComponent(key) +
                                        "=" +
                                        encodeURIComponent(data[key]) +
                                        "&";
                                }
                                return str;
                            }
                        ]
                    }
                )
                    .then(res => {})
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
    },
    mounted() {
        let id = this.$route.query.id;
        this.getGoodlist();
        if (id) {
            this.fullScaleEdit();
        }
    }
};
</script>

<style lang="scss" scoped>
.infoItem {
    width: 99%;
    padding: 10px;
    background: #f2f2f2;
    margin-bottom: 20px;
}
.el-form-item {
    width: 450px;
}

.gooditem {
    width: 40px;
    height: 80px;
    display: inline-block;
    margin-right: 20px;
    position: relative;
    .el-icon-close {
        position: absolute;
        top: -6px;
        right: -6px;
        background: #f2f2f2;
    }
    .el-icon-close:hover {
        position: absolute;
        top: -6px;
        right: -6px;
        background: #409eff;
        border-radius: 50%;
    }
    img {
        width: 40px;
        height: 40px;
    }
}
</style>