<template>
    <!-- 店铺包邮 -->
    <section style="padding:20px">
        <div class="infoItem">店铺包邮</div>
            <!-- 指定包邮 -->
            <div style="margin:30px 0 20px 0">
                <el-checkbox v-model="isShiping">指定包邮</el-checkbox>
            </div>
            
            <div v-if="isShiping">
                <el-table
                    :data="areaData2"
                    style="width:100%"
                    :header-row-style="{
                    'background-color': '#f2f2f2',
                }"
                >
                    <el-table-column prop="area" label="可配送区域" width="500"></el-table-column>
                    <el-table-column prop label="包邮方式" width>
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.type" placeholder="请选择">
                                <el-option
                                    v-for="item in byoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="condition" label="设置包邮条件" width>
                        <template slot-scope="scope">
                            <div v-if="scope.row.type==1">
                                满
                                <el-input v-model="scope.row.num" style="width:20%"></el-input>件包邮
                            </div>
                            <div v-if="scope.row.type==2">
                                满
                                <el-input v-model="scope.row.money" style="width:20%"></el-input>元包邮
                            </div>
                            <div v-if="scope.row.type==3">
                                满
                                <el-input v-model="scope.row.num" style="width:20%"></el-input>件包邮 满
                                <el-input v-model="scope.row.money" style="width:20%"></el-input>元包邮
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="operate" label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button
                                @click.native.prevent="editArea(scope.$index, areaData,'free')"
                                type="text"
                                size="small"
                            >修改</el-button>
                            <el-button
                                @click.native.prevent="deleteRow2(scope.$index, areaData2)"
                                type="text"
                                size="small"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="margin-top:20px">
                    <el-button type="primary" @click="showDialog()">指定可配送区域和包邮条件</el-button>
                </div>
            </div>
            
        <el-dialog
            :destroy-on-close="true"
            title="选择配送区域"
            :visible.sync="dialogVisible"
            width="50%"
        >
            <element-china-checkbox ref="checkbox" @getElData="getElData" :Selected="selectedData">
                确认选择
                <!-- 使用slot 可以传入自定义内容来替换默认文字 -->
            </element-china-checkbox>
        </el-dialog>


        <!-- 参与商品 -->
        <el-form ref="form" :model="form">
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
                        <el-form ref="form2" :model="form2">
                            <el-col :span="6">
                                <el-form-item label="商品名称" style="margin:0">
                                    <el-input style="width:200px" v-model="form2.name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item  style="width:420px;margin:0" label="价格区间">
                                    <el-input v-model="form2.name" style="width:30%"></el-input>至
                                    <el-input v-model="form2.cname" style="width:30%"></el-input>
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
import elementChinaCheckbox from "element-china-checkbox";
export default {
    data() {
        return {
            form: {
                
            },
            data:[],
            total:0,
            isShiping:false,
            areaData2:[],
            byoptions:[],
            dialogVisible:false,
            provinceId: [],
            cityId: [],
            areaId: [],
            selectedData: {
                provinceId: [], // 省份ID
                cityId: [], // 城市ID
                areaId: [] // 区县ID
            },
            form2:{}
        };
    },
    methods: {
        getElData(){},
        editArea(){

        },
        deleteRow2(){},
        showDialog(){
            this.dialogVisible = true
        },
        back(){},
        selsChange(){},
        handleCurrentChange(){}
    },
    components: {
        elementChinaCheckbox
    },
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