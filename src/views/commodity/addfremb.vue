<template>
    <!-- 新建运费模板 -->
    <section style="padding:20px">
        <el-form class="shopInfo" ref="form" :model="form" label-width="80px">
            <el-form-item label="模板名称">
                <el-input v-model="form.name" placeholder="模板名称"></el-input>
            </el-form-item>
            <el-form-item label="计费方式">
                <el-radio v-model="saleType" label="1">按件数</el-radio>
                <el-radio v-model="saleType" label="2">按重量</el-radio>
            </el-form-item>
            <el-button type="primary" @click="showDialog">指定可配送区域和运费</el-button>
        </el-form>
        <edit-table></edit-table>
        <el-dialog title="选择配送区域" :visible.sync="dialogVisible" width="30%">
            <keep-alive include="element-china-checkbox">
                <element-china-checkbox
                    ref="checkbox"
                    @getElData="getElData"
                    :Selected="selectedData"
                >
                    确认选择
                    <!-- 使用slot 可以传入自定义内容来替换默认文字 -->
                </element-china-checkbox>
            </keep-alive>
        </el-dialog>
    </section>
</template>

<script>
import elementChinaCheckbox from "element-china-checkbox"
import EditTable from '../../components/edittable'
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
            }
        };
    },
    methods: {
        getElData() {
            const checkboxData = this.$refs.checkbox;
            this.provinceId = checkboxData.provinceId;
            this.cityId = checkboxData.cityId;
            this.areaId = checkboxData.areaId;
            console.log(this.provinceId);
            console.log(this.cityId);
            console.log(this.areaId);
            this.provinceId = [];
            this.cityId = [];
            this.areaId = [];
            // this.$createElement = [];
            this.dialogVisible = false;
        },
        showDialog() {
            this.dialogVisible = true;
            // this.dialogVisible = false;
        }
    },
    components: {
        elementChinaCheckbox,
        EditTable
    },
    mounted() {}
};
</script>

<style scoped>
/* .el-form-item {
    width: 450px;
} */
</style>