<template>
    <!-- 分类规格 -->
    <section style="padding:20px">
        <div class="infoItem">商品分类</div>商品分类：
        <el-cascader
            v-model="type"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
        ></el-cascader>                                                                                                      
        <el-button type="primary" @click="appNewType">申请新分类</el-button>
        <div style="margin-top:20px" class="infoItem">规格管理</div>系统规格
        <span class="specbtn" :key="i" v-for="(item,i) in spec">{{item.name}}</span>
        <div style="margin-top:20px">
            自定义规格
            <span class="specbtn" :key="i" v-for="(item,i) in spec">{{item.name}}</span>
            <el-button type="primary" size="medium" @click="addSpec">添加规格</el-button>
        </div>

        <!-- 分类弹窗 -->
        <el-dialog title="申请分类" width="30%" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="一级分类" :label-width="formLabelWidth">
                    <el-input v-model="form.first" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="二级分类" :label-width="formLabelWidth">
                    <el-input v-model="form.second" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="三级分类" :label-width="formLabelWidth">
                    <el-input v-model="form.third" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 添加规格 -->
        <el-dialog title="添加规格" width="30%" :visible.sync="dialogFormVisible2">
            <el-form :model="form">
                <el-form-item label="规格名称" :label-width="formLabelWidth">
                    <el-input v-model="form.first" placeholder="请输入规格名称" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            type: [],
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
            spec: [
                { name: "尺寸", value: "1" },
                { name: "尺寸", value: "1" },
                { name: "尺寸", value: "1" },
                { name: "尺寸", value: "1" }
            ],
            dialogFormVisible:false,
            dialogFormVisible2:false,
            form:{},
            formLabelWidth:"120px"
        };
    },
    methods: {
        handleChange() {},
        // 申请新分类
        appNewType() {
            this.dialogFormVisible = true;
        },
        // 添加规格
        addSpec() {
            this.dialogFormVisible2 = true;
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
.specbtn {
    display: inline-block;
    width: 100px;
    height: 32px;
    border: 1px solid #dcdfe6;
    text-align: center;
    line-height: 32px;
    margin-left: 10px;
}
</style>
