<template>
    <!-- 编辑满减活动 -->
    <section style="padding:20px">
        <div class="infoItem">活动信息</div>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <div class="infoItem">基本规则</div>
            <el-form-item label="活动时间">
                <el-date-picker
                    v-model="form.effectiveTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="适用群体" style="width:900px">
                <el-checkbox-group v-model="form.groups">
                    <!-- <el-checkbox value="1" label="1">全部用户</el-checkbox> -->
                    <el-checkbox label="1">首次进店用户</el-checkbox>
                    <el-checkbox label="2">圈友专享</el-checkbox>
                    <el-checkbox label="3">店铺会员</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="参与限制">
                <el-select v-model="form.limitTimes" placeholder="请选择">
                    <el-option label="1次" value="1"></el-option>
                    <el-option label="2次" value="2"></el-option>
                    <el-option label="3次" value="3"></el-option>
                    <el-option label="4次" value="4"></el-option>
                    <el-option label="5次" value="5"></el-option>
                    <el-option label="6次" value="6"></el-option>
                    <el-option label="7次" value="7"></el-option>
                    <el-option label="8次" value="8"></el-option>
                    <el-option label="9次" value="9"></el-option>
                    <el-option label="10次" value="10"></el-option>
                    <el-option label="不限制" value="0"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否叠加优惠券">
                <el-radio-group @change="changeRadio" v-model="form.radioCondition">
                    <div>
                        <el-radio :label="1">否</el-radio>
                        <el-radio :label="2">是，活动价后仍可适用优惠券</el-radio>
                    </div>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="优惠条件">
                <el-radio-group @change="changeRadio2" v-model="form.radioCondition2">
                    <div>
                        <el-radio :label="1">满额</el-radio>
                        <el-radio :label="2">满件</el-radio>
                    </div>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="优惠方式">
                <el-radio-group @change="changeRadio4" v-model="form.radioCondition4">
                    <div>
                        <el-radio :label="1">折扣</el-radio>
                        <el-radio :label="2">减额</el-radio>
                    </div>
                </el-radio-group>
            </el-form-item>
            <el-table :data="tableData2">
                <el-table-column type="index" label="层级" width="200"></el-table-column>
                <el-table-column prop="yhmk" label="优惠门槛" width>
                    <template slot-scope="scope">
                        满
                        <el-input
                            size="mini"
                            style="width:30%"
                            :disabled="(scope.row.disabled)"
                            v-model="scope.row.limit"
                        ></el-input>
                        <span v-if="form.radioCondition2==2">件</span>
                        <span v-if="form.radioCondition2==1">元</span>
                    </template>
                </el-table-column>
                <el-table-column prop="yhje" label="优惠金额" width>
                    <template slot-scope="scope">
                        <span v-if="form.radioCondition4==2">减</span>
                        <el-input
                            size="mini"
                            style="width:30%"
                            :disabled="(scope.row.disabled)"
                            v-model="scope.row.decrease"
                        ></el-input>
                        <span v-if="form.radioCondition4==2">元</span>
                        <span v-if="form.radioCondition4==1">折</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width>
                    <template slot-scope="scope">
                        <el-button
                            @click="handSave(scope.$index,tableData2)"
                            type="text"
                            size="small"
                        >保存</el-button>
                        <el-button
                            @click="handDel(scope.$index,tableData2)"
                            type="text"
                            size="small"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <el-button class="table-button" @click="addRange">新增一级优惠</el-button>
            </div>
            <el-form-item label="活动商品">
                <el-radio-group @change="changeRadio3" v-model="form.radioCondition3">
                    <div>
                        <el-radio :label="1">全店活动</el-radio>
                        <el-radio :label="2">仅指定商品参与</el-radio>
                    </div>
                </el-radio-group>
            </el-form-item>
        </el-form>

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
                                <el-button type="primary" @click="submitActivity">确定新增此活动</el-button>
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
                <el-button @click="handleBatchAdd">批量加入</el-button>
                <el-pagination
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :page-size="10"
                    :total="total"
                    style="float:right;"
                ></el-pagination>
            </el-col>
        </div>
    </section>
</template>

<script>
import {
    fullScaleAdd,
    getGoodlist,
    fullScaleEdit,
    getFullScaleDetail
} from "../../api/api";
import utils from "@/common/js/util";

export default {
    data() {
        return {
            form: {
                name: "",
                effectiveTime: [], //有效时间
                groups: [], //使用群体
                radioCondition: "", //是否叠加优惠券
                radioCondition2: "",
                radioCondition3: "",
                radioCondition4: "",
                fullReducePrice: "", //满减
                fullReduceNum: "", //满件
                limitTimes: "" //限制次数
            },
            listLoading: false,
            isPriceUse: true, //满减是否可用
            isNumUse: true, //满件是否可用
            tableData: [],
            tableData2: [{}], //新增表格数据
            form2: {},
            data: [],
            total: 0,
            checkedGoods: [],
            selArr: []
        };
    },
    methods: {
        changeRadio(value) {},
        changeRadio2() {},
        changeRadio3() {},
        changeRadio4(){},
        addRange() {
            this.tableData2.push({});
        },
        handDel(index, rows) {
            console.log(index);
            console.log(rows);
            this.tableData2.splice(index, 1);
        },
        handSave(index, rows) {
            rows[0].disabled = false;
        },
        handleCurrentChange() {},
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
        //提交此活动
        submitActivity() {
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
                name: this.form.name,
                start_time: start_time,
                end_time: end_time,
                groups: this.form.groups.toString(),
                limit: this.form.limitTimes,
                add_coupon: this.form.radioCondition,
                condition_type: this.form.radioCondition2,
                discount_type:this.form.radioCondition4,
                condition_data: this.tableData2,
                product_type: this.form.radioCondition3,
                pids: ids.toString()
            };

            console.log(params);
            if (this.$route.query.id) {
                fullScaleEdit(
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
                fullScaleAdd(
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
        changeRadio2(value) {
            console.log(value);
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
        fullScaleEdit() {
            const params = {
                id: this.$route.query.id
            };

            getFullScaleDetail(params)
                .then(res => {
                    const data = res.data.data.data;
                    this.form.name = data.name;
                    let effectiveTime = [];
                    effectiveTime[0] = new Date(data.start_time);
                    effectiveTime[1] = new Date(data.end_time);
                    this.form.effectiveTime = effectiveTime;
                    this.form.groups = JSON.parse(data.json_raw).groups.split(
                        ","
                    );

                    console.log(this.form.groups);
                    this.form.limitTimes = data.limit;
                    this.form.radioCondition = Number(data.add_coupon);
                    this.form.radioCondition2 = Number(data.condition_type);
                    this.form.radioCondition4 = Number(data.discount_type);
                    this.tableData2 = JSON.parse(data.condition_data);
                    this.form.radioCondition3 = Number(data.product_type);
                    this.checkedGoods = [];
                    for (let i = 0; i < data.pids.length; i++) {
                        this.tableData.map(item => {
                            if (data.pids[i] == item.id) {
                                this.checkedGoods.push(item);
                            }
                        });
                    }
                    console.log(this.checkedGoods);
                })
                .catch(err => {
                    console.log(err);
                });
        }
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
.table-button {
    width: 100%;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid #ebeef5;
    color: #409eff;
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