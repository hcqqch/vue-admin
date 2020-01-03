<template>
    <!-- 店铺包邮 -->
    <section style="padding:20px">
        <div class="infoItem">店铺包邮</div>
        <!-- 指定包邮 -->
        <div style="margin:30px 0 20px 0">
            <!-- <el-checkbox v-model="isShiping">指定包邮</el-checkbox> -->
        </div>

        <div>
            <el-table
                :data="areaData"
                style="width:100%"
                :header-row-style="{
                    'background-color': '#f2f2f2',
                }"
            >
                <el-table-column prop="area" label="可配送区域" width="500"></el-table-column>
                <el-table-column prop="condition" label="设置包邮条件" width>
                    <template slot-scope="scope">
                        <div>
                            满
                            <el-input v-model="scope.row.money" style="width:20%"></el-input>元包邮
                        </div>
                    </template>
                </el-table-column>

                <el-table-column prop="operate" label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button
                            @click.native.prevent="editArea(scope.$index, areaData)"
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
            <div style="margin-top:20px">
                <el-button type="primary" @click="showDialog()">指定可配送区域和包邮条件</el-button>
                <el-button type="primary" @click="submit">保存</el-button>
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
    </section>
</template>

<script>
import elementChinaCheckbox from "element-china-checkbox";
import { editFreightTmplate, addShopmail, getShopmail } from "../../api/api";
export default {
    data() {
        return {
            dialogVisible: false,
            provinceId: [],
            cityId: [],
            areaId: [],
            selectedData: {
                provinceId: [], // 省份ID
                cityId: [], // 城市ID
                areaId: [] // 区县ID
            },
            areaData: [],
            money: "",
            isEdit: false,
            index: ""
        };
    },
    methods: {
        getElData() {
            const checkboxData = this.$refs.checkbox;
            this.provinceId = checkboxData.provinceId;
            this.cityId = checkboxData.cityId;
            this.areaId = checkboxData.areaId;

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
            console.log(areaArr3);
            if (this.isEdit == true) {
                this.areaData.splice(this.index, 1, {
                    area: areaArr.toString(),
                    provinceId: this.provinceId,
                    cityId: this.cityId,
                    money: this.money
                });
            } else {
                this.areaData.push({
                    area: areaArr.toString(),
                    provinceId: this.provinceId,
                    cityId: this.cityId,
                    money: this.money
                });
            }

            this.provinceId = [];
            this.cityId = [];
            this.areaId = [];
            this.dialogVisible = false;
        },
        editArea(index) {
            this.index = index;
            this.dialogVisible = true;
            this.isEdit = true;
        },
        deleteRow(index) {
            this.areaData.splice(index, 1);
        },

        showDialog() {
            this.isEdit = false;
            this.dialogVisible = true;
        },
        handleCurrentChange() {},
        submit() {
            const params = {
                data: this.areaData
                // firstName: '1,2',
                // lastName: "Flintstone"
            };

            console.log(params);

            addShopmail(
                // {data:JSON.stringify(params)},
                params,
                {
                    headers:{
                        'Content-type':'application/json'
                    }
                }
                // {
                //     transformRequest: [
                //         function(data) {
                //             var str = "";
                //             for (var key in data) {
                //                 str +=
                //                     encodeURIComponent(key) +
                //                     "=" +
                //                     encodeURIComponent(data[key]) +
                //                     "&";
                //             }
                //             return str;
                //         }
                //     ]
                // }
            )
                .then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            type: "success",
                            message: res.data.msg
                        });
                    } else {
                        this.$message({
                            type: "warning",
                            message: res.data.msg
                        });
                    }
                })
                .catch(err => {});
        },
        getShopmail() {
            getShopmail()
                .then(res => {
                    if (res.data.code == 200) {
                        console.log(res.data.data);
                        const data = res.data.data.data;
                        this.areaData = data;
                    } else {
                        this.$message({
                            type: "warning",
                            message: res.data.msg
                        });
                    }
                })
                .catch();
        }
    },
    components: {
        elementChinaCheckbox
    },
    mounted() {
        this.getShopmail();
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