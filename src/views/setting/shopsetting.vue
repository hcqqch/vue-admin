<template>
    <!-- 店铺设置 -->
    <section style="padding:20px">
        <div class="infoItem">经营设置</div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="经营状态">
                <el-radio-group v-model="form.resource">
                    <el-radio label="营业"></el-radio>
                    <el-radio label="休息"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="营业时间">
                <el-radio-group v-model="form.resource">
                    <el-radio label="全天"></el-radio>
                    <el-radio label="自定义"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="下单门槛">
                <el-radio-group v-model="form.resource">
                    <el-radio label="全部用户可以购买"></el-radio>
                    <el-radio label="仅圈内用户可以购买"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="售罄商品">
                <el-radio-group v-model="form.resource">
                    <el-radio label="展示"></el-radio>
                    <el-radio label="不展示"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="发货地址">
                <el-cascader
                    v-model="type"
                    :options="options"
                    :props="{ expandTrigger: 'hover' }"
                    @change="handleChange"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址">
                <el-input v-model="form.address" placeholder="请输入详细地址"></el-input>
            </el-form-item>
        </el-form>
    </section>
</template>
<script>
export default {
    data() {
        return {
            form: {
                address:""
            },
            resource: "",
            options: [
                {
                    value: 1,
                    label: "东南",
                    children: [
                        {
                            value: 2,
                            label: "上海",
                            children: [
                                { value: 3, label: "普陀" },
                                { value: 4, label: "黄埔" },
                                { value: 5, label: "徐汇" }
                            ]
                        },
                        {
                            value: 7,
                            label: "江苏",
                            children: [
                                { value: 8, label: "南京" },
                                { value: 9, label: "苏州" },
                                { value: 10, label: "无锡" }
                            ]
                        },
                        {
                            value: 12,
                            label: "浙江",
                            children: [
                                { value: 13, label: "杭州" },
                                { value: 14, label: "宁波" },
                                { value: 15, label: "嘉兴" }
                            ]
                        }
                    ]
                },
                {
                    value: 17,
                    label: "西北",
                    children: [
                        {
                            value: 18,
                            label: "陕西",
                            children: [
                                { value: 19, label: "西安" },
                                { value: 20, label: "延安" }
                            ]
                        },
                        {
                            value: 21,
                            label: "新疆维吾尔族自治区",
                            children: [
                                { value: 22, label: "乌鲁木齐" },
                                { value: 23, label: "克拉玛依" }
                            ]
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        handleChange() {}
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.el-form-item{
    width: 450px;
}
.infoItem {
    width: 99%;
    padding: 10px;
    background: #f2f2f2;
    margin-bottom: 20px;
    margin-top: 20px;
}
</style>