<template>
    <!-- 个人信息 -->
    <section style="padding:20px">
        <div class="infoItem">个人信息</div>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="用户名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="所属部门">
                <el-select></el-select>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input style="width:77%"></el-input>
                <el-button>更换</el-button>
            </el-form-item>
            <el-form-item label="创建日期">
                <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="密码">
                <el-input style="width:77%"></el-input>
                <el-button>修改</el-button>
            </el-form-item>
            <el-form-item label="绑定圈助账号">
                <el-input style="width:77%" v-model="form.address" placeholder></el-input>
                <el-button>绑定</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>
<script>
export default {
    data() {
        return {
            form: {
                address: ""
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
            ],
            value1:""
        };
    },
    methods: {
        handleChange() {}
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.el-form-item {
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