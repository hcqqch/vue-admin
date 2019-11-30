<template>
    <!-- 新增优惠券 -->
    <section style="padding:20px">
        <div class="infoItem">优惠券卷面信息</div>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="优惠券名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="优惠券类型">
                <el-select v-model="form.type" placeholder="优惠券类型">
                    <el-option label="现金券" value="1"></el-option>
                    <el-option label="折扣卷" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="this.form.type==1" label="面值">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item v-if="this.form.type==2" label="折扣">
                <el-input v-model="form.discount"></el-input>
            </el-form-item>
            <el-form-item label="使用条件">
                <el-radio-group
                    @change="changeRadio"
                    style="padding-top:14px"
                    v-model="form.radioCondition"
                >
                    <div>
                        <el-radio :label="3">不限制</el-radio>
                    </div>
                    <div style="margin-top:10px">
                        <el-radio :label="6">
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
                        <el-radio :label="9">
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
                    <el-checkbox label="自主领取"></el-checkbox>
                    <el-checkbox label="手工发送"></el-checkbox>
                    <el-checkbox label="活动领取"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>

        <div class="infoItem">基本规则</div>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="发放总量（张）">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="适用群体">
                <el-checkbox-group v-model="form.checkList">
                    <el-checkbox label="全部用户"></el-checkbox>
                    <el-checkbox label="首次进店用户"></el-checkbox>
                    <el-checkbox label="圈友专享"></el-checkbox>
                    <el-checkbox label="店铺会员"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="每人限领（张）">
                <el-select v-model="form.type" placeholder="请选择">
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动商品">
                <el-radio-group style="padding-top:14px" v-model="form.radioCondition">
                    <div>
                        <el-radio :label="3">全部商品参与</el-radio>
                    </div>
                    <div style="margin-top:10px">
                        <el-radio :label="6">仅指定商品参与</el-radio>
                    </div>
                </el-radio-group>
            </el-form-item>

            <div>
                <el-row>
                    <el-col :span="24" class="toolbar">
                        <el-form ref="form2" :model="form2" label-width="120px">
                            <el-col :span="6">
                                <el-form-item style="width:320px" label="商品名称">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item style="width:420px" label="价格区间">
                                    <el-input v-model="form.name" style="width:30%"></el-input>至
                                    <el-input v-model="form.cname" style="width:30%"></el-input>
                                    <el-button type="primary">查询</el-button>
                                </el-form-item>
                            </el-col>
                        </el-form>
                    </el-col>
                </el-row>
            </div>

            <div class="infoItem">
                已选
            </div>

            <div>
                 <el-table
            :data="data"
            highlight-current-row
            v-loading="listLoading"
            @selection-change="selsChange"
            style="width: 100%;"
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="num" label="商品名称" width="" sortable></el-table-column>
            <el-table-column prop="createtime" label="价格" width="" sortable></el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">选取加入</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="">批量加入</el-button>
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
export default {
    data() {
        return {
            form: {
                type: "1",
                discount: "", //折扣
                radioCondition: "", //使用条件
                fullReducePrice: "", //满减
                fullReduceNum: "", //满件
                effectiveTime: "", //有效时间
                checkList: [] //发送方式
            },
            isPriceUse: true, //满减是否可用
            isNumUse: true //满件是否可用
        };
    },
    methods: {
        //使用条件
        changeRadio(value) {
            if (value == 6) {
                this.isPriceUse = false;
            } else {
                this.isPriceUse = true;
                this.form.fullReducePrice = "";
            }
            if (value == 9) {
                this.isNumUse = false;
            } else {
                this.isNumUse = true;
                this.form.fullReduceNum = "";
            }
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
</style>