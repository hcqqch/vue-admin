<template>
    <!-- 新建运费模板 -->
    <section style="padding:20px">
        <el-form class="shopInfo" ref="form" :model="form" label-width="80px">
            <el-form-item label="模板名称">
                <el-input v-model="form.name" placeholder="模板名称"></el-input>
            </el-form-item>
            <el-form-item label="计费方式">
                <el-radio v-model="saleType" label="1">按件数</el-radio>
                <!-- <el-radio v-model="saleType" label="2">按重量</el-radio> -->
            </el-form-item>
            <el-form-item style="width:100%" label="配送区域">
                <el-table
                    :data="areaData"
                    style="width:100%"
                    :header-row-style="{
                    'background-color': '#f2f2f2',
                }"
                >
                    <el-table-column prop="area" label="可配送区域" width="500"></el-table-column>
                    <el-table-column prop="first" label="首件(个)" width>
                        <template slot-scope="scope">
                            <el-input
                                v-model="scope.row.firstNum"
                                @input="changeInput(scope.$index,scope.row)"
                                size="mini"
                                style="width:40%"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cost" label="运费(元)" width>
                        <template slot-scope="scope">
                            <el-input
                                v-model="scope.row.firstPrice"
                                @input="changeInput(scope.$index,scope.row)"
                                size="mini"
                                style="width:40%"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="next" label="续件(个)" width>
                        <template slot-scope="scope">
                            <el-input
                                v-model="scope.row.nextNum"
                                @input="changeInput(scope.$index,scope.row)"
                                size="mini"
                                style="width:40%"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="nextcost" label="续费(元)" width>
                        <template slot-scope="scope">
                            <el-input
                                v-model="scope.row.nextPrice"
                                @input="changeInput(scope.$index,scope.row)"
                                size="mini"
                                style="width:40%"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="date" label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button
                                @click.native.prevent="editArea(scope.$index, areaData,'spec')"
                                type="text"
                                size="small"
                            >修改</el-button>
                            <el-button
                                @click.native.prevent="deleteRow(scope.$index, areaData)"
                                type="text"
                                size="small"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-button type="primary" @click="showDialog('spec')">指定可配送区域和运费</el-button>

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
                            <el-select
                                v-model="scope.row.mode"
                                @change="selectChange(scope.$index,scope.row)"
                                placeholder="请选择"
                            >
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
                            <div v-if="scope.row.mode==1">
                                满
                                <el-input
                                    v-model="scope.row.num"
                                    @input="changeInput2(scope.$index,scope.row)"
                                    style="width:20%"
                                ></el-input>件包邮
                            </div>
                            <div v-if="scope.row.mode==2">
                                满
                                <el-input
                                    v-model="scope.row.price"
                                    @input="changeInput2(scope.$index,scope.row)"
                                    style="width:20%"
                                ></el-input>元包邮
                            </div>
                            <div v-if="scope.row.mode==3">
                                满
                                <el-input
                                    v-model="scope.row.num"
                                    @input="changeInput2(scope.$index,scope.row)"
                                    style="width:20%"
                                ></el-input>件包邮 满
                                <el-input
                                    v-model="scope.row.price"
                                    @input="changeInput2(scope.$index,scope.row)"
                                    style="width:20%"
                                ></el-input>元包邮
                            </div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column></el-table-column> -->

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
                    <el-button type="primary" @click="showDialog('free')">指定可配送区域和包邮条件</el-button>
                </div>
            </div>
            <div style="margin-top:20px">
                <el-button @click="submitTemplate" type="primary">保存</el-button>
                <el-button @click="back" type>返回</el-button>
            </div>
        </el-form>
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
    </section>
</template>

<script>
import elementChinaCheckbox from "element-china-checkbox";
import {
    setFreightTmplate,
    getTempDetail,
    editFreightTmplate
} from "../../api/api";
import axios from "axios";
import qs from "qs";

export default {
    data() {
        return {
            form: {
                name: ""
            },
            dialogVisible: false,
            saleType: "1",
            provinceId: [],
            cityId: [],
            areaId: [],
            selectedData: {
                provinceId: [], // 省份ID
                cityId: [], // 城市ID
                areaId: [] // 区县ID
            },
            areaData: [],
            areaData2: [],
            isShiping: false, //是否包邮
            areaType: 0, //区域打开类型
            index: 0, //表格当前行
            isEdit: false,
            byoptions: [
                {
                    value: "1",
                    label: "件数"
                },
                {
                    value: "2",
                    label: "金额"
                },
                {
                    value: "3",
                    label: "件数+金额"
                }
            ]
        };
    },
    methods: {
        getElData() {
            const checkboxData = this.$refs.checkbox;
            this.provinceId = checkboxData.provinceId;
            this.cityId = checkboxData.cityId;
            this.areaId = checkboxData.areaId;
            // console.log(this.provinceId);
            // console.log(this.cityId);
            // console.log(this.areaId);
            const areaArr = [];
            const areaArr2 = [];
            const areaArr3 = [];

            this.provinceId.map(id => {
                areaArr.push(checkboxData.REGION_DATA[86][id]);
            });

            this.cityId.map(id => {
                this.provinceId.map(pid => {
                    if (checkboxData.REGION_DATA[pid][id]) {
                        areaArr2.push(checkboxData.REGION_DATA[pid][id]);
                    }
                });
            });

            console.log(areaArr);
            console.log(areaArr2);
            if (this.areaType == 0) {
                if (this.isEdit == true) {
                    this.areaData.splice(this.index, 1, {
                        area: areaArr.toString(),
                        provinceId: this.provinceId,
                        cityId: this.cityId,
                        firstNum: this.firstNum,
                        firstPrice: this.firstPrice,
                        nextNum: this.nextNum,
                        nextPrice: this.nextPrice
                    });
                } else {
                    this.areaData.push({
                        area: areaArr.toString(),
                        provinceId: this.provinceId,
                        cityId: this.cityId,
                        firstNum: this.firstNum,
                        firstPrice: this.firstPrice,
                        nextNum: this.nextNum,
                        nextPrice: this.nextPrice
                    });
                }
            }
            if (this.areaType == 1) {
                if (this.isEdit == true) {
                    this.areaData2.splice(this.index, 1, {
                        area: areaArr.toString(),
                        provinceId: this.provinceId,
                        cityId: this.cityId,
                        mode: "",
                        num: "",
                        price: ""
                    });
                } else {
                    this.areaData2.push({
                        area: areaArr.toString(),
                        provinceId: this.provinceId,
                        cityId: this.cityId,
                        mode: "",
                        num: "",
                        price: ""
                    });
                }
            }

            this.provinceId = [];
            this.cityId = [];
            this.areaId = [];
            this.dialogVisible = false;
            console.log(this.areaData);
        },
        showDialog(type) {
            this.isEdit = false;
            if (type == "spec") {
                this.areaType = 0;
            } else {
                this.areaType = 1;
            }
            this.dialogVisible = true;
        },
        changeInput(index, row) {
            this.areaData[index] = row;
        },
        changeInput2(index, row) {
            this.areaData2[index] = row;
        },
        selectChange(index, row) {
            this.areaData2[index] = row;
        },
        // 编辑区域
        editArea(index, data, type) {
            console.log(type);
            this.dialogVisible = true;
            if (type == "spec") {
                this.areaType = 0;
            } else {
                this.areaType = 1;
            }
            this.isEdit = true;
            this.index = index;
        },
        // 删除表格当前行
        deleteRow(index) {
            this.areaData.splice(index, 1);
        },
        deleteRow2(index) {
            this.areaData2.splice(index, 1);
            this.areaData2.splice(index, 1);
            // this.$router.push(index,1)
        },
        back() {
            this.$router.go(-1);
        },
        async submitTemplate() {
            let id = this.$router.history.current.params.id;
            let config = {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                }
            };
            const params = {
                data: [{ model: this.form.name }, { rowData: this.areaData }],
                free_data: [{ rowData: this.areaData2 }]
            };

            if (id) {
                id = id.substr(1);
                await editFreightTmplate(
                    { data: JSON.stringify(params), id: id },
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
                    .then(res => {
                        if (res.data.msg) {
                            this.$message({
                                message: res.data.msg,
                                type: "success"
                            });
                        }
                    })
                    .catch();
            } else {
                await setFreightTmplate(
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
                    .then(res => {
                        if (res.data.msg) {
                            this.$message({
                                message: res.data.msg,
                                type: "success"
                            });
                        }
                    })
                    .catch();
            }

            setTimeout(() => {
                this.$router.push("/addcommodity/templatelist");
            }, 1000);
        },
        getTempDetail() {
            const _this = this;
            const id = this.$router.history.current.params.id.substr(1);
            const params = { id };
            getTempDetail(params)
                .then(res => {
                    const data = res.data.data.data;
                    _this.form.name = data.data[0].model;
                    _this.areaData = data.data[1].rowData;
                    _this.areaData2 = data.free_data[0].rowData;
                    if (_this.areaData2.length > 0) {
                        _this.isShiping = true;
                    }
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    components: {
        elementChinaCheckbox
    },
    computed: {},
    mounted() {
        const id = this.$router.history.current.params.id;
        if (id) {
            this.getTempDetail();
        }
    }
};
</script>

<style scoped>
.el-form-item {
    width: 450px;
}
</style>