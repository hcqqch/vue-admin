<template>
    <!-- 编辑满减活动 -->
    <section style="padding:20px">
        <div class="infoItem">活动信息</div>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="满减类型">
                <el-select v-model="form.type" placeholder="优惠券类型">
                    <el-option label="单品满减" value="1"></el-option>
                    <el-option label="店铺满减" value="2"></el-option>
                </el-select>
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
            <el-form-item label="适用群体">
                <el-checkbox-group v-model="form.checkList">
                    <el-checkbox label="自主领取"></el-checkbox>
                    <el-checkbox label="手工发送"></el-checkbox>
                    <el-checkbox label="活动领取"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="参与限制">
                <el-select v-model="form.type" placeholder="请选择">
                    <el-option label="1次" value="1"></el-option>
                    <el-option label="2次" value="2"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否叠加优惠券">
                <el-radio-group @change="changeRadio" v-model="form.radioCondition">
                    <div>
                        <el-radio :label="3">否</el-radio>
                        <el-radio :label="6">是，活动价后仍可适用优惠券</el-radio>
                    </div>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="优惠设置">
                <el-radio-group @change="changeRadio" v-model="form.radioCondition">
                    <div>
                        <el-radio :label="3">满额</el-radio>
                        <el-radio :label="6">满件</el-radio>
                    </div>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <el-button @click="addRange" type="succuss">新增</el-button>
        <el-table :data="tableData2">
            <el-table-column type="index" label="层级" width="200"></el-table-column>
            <el-table-column prop="yhmk" label="优惠门槛" width="">
                <template slot-scope="scope"> 
                    满<el-input size="mini" style="width:40%" :disabled="(scope.row.disabled)" v-model="scope.row.limit"></el-input>元
                </template>
            </el-table-column>
            <el-table-column prop="yhje" label="优惠金额" width="">
                <template slot-scope="scope">
                    减<el-input size="mini" style="width:40%" :disabled="(scope.row.disabled)" v-model="scope.row.money"></el-input>元
                </template>
            </el-table-column>
            <el-table-column  label="操作" width="">
                <template slot-scope="scope">
                    <el-button @click="handSave(scope.$index,tableData2)" type="text" size="small">保存</el-button>
                   <el-button @click="handDel(scope.$index,tableData2)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

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

        <div class="infoItem">已选</div>

        <div>
            <el-table
                :data="data"
                highlight-current-row
                v-loading="listLoading"
                @selection-change="selsChange"
                style="width: 100%;"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="num" label="商品名称" width sortable></el-table-column>
                <el-table-column prop="createtime" label="价格" width sortable></el-table-column>
                <el-table-column label="操作" width="150">
                    <template scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">选取加入</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--工具条-->
            <el-col :span="24" class="toolbar">
                <el-button type>批量加入</el-button>
                <el-pagination
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :page-size="20"
                    :total="total"
                    style="float:right;"
                ></el-pagination>
            </el-col>
        </div>
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
            listLoading:false,
            isPriceUse: true, //满减是否可用
            isNumUse: true, //满件是否可用
            tableData: [],
            tableData2:[{

            }],//新增表格数据
            form2:{},
            data:[],
            total:0
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
        },
        addRange(){
            this.tableData2.push({})
        },
        handDel(index,rows){
            console.log(index);
             console.log(rows);
            this.tableData2.splice(index,1);
            // this.tableData2.pop();
        },
        handSave(index,rows){
            console.log(rows);
            rows[0].disabled = false;
            
        },
        handleCurrentChange(){},
        selsChange(){},
        cals(){
            if(this.tableData2.length==0){
                this.tableData2.push({
                    rows
                })
            }
        },
        selsChange(){
            this.tableData2.length == 0
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