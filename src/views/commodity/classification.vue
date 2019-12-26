<template>
    <!-- 分类规格 -->
    <section style="padding:20px">
        <div class="infoItem">商品分类</div>商品分类：
        <div style="margin-top:20px">
            <el-select v-model="first" @change="choseFirst" placeholder="请选择一级分类">
                <el-option
                    v-for="item in firstType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.id"
                ></el-option>
            </el-select>
            <el-button @click="applyFirst">申请一级分类</el-button>
            <el-input v-if="isShowFirst" v-model="firstInput" style="width:140px" placeholder="请输入分类名称"></el-input>
        </div>
        <div style="margin-top:20px">
            <el-select v-model="second" @change="choseSecond" placeholder="请选择二级分类">
                <el-option
                    v-for="item in secondType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.id"
                ></el-option>
            </el-select>
            <el-button @click="applySecond">申请二级分类</el-button>
            <el-input v-if="isShowSecond"  v-model="secondInput" style="width:140px" placeholder="请输入分类名称"></el-input>
        </div>
        <div style="margin-top:20px">
            <el-select v-model="third" placeholder="请选择三级分类">
                <el-option
                    v-for="item in thirdType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.id"
                ></el-option>
            </el-select>
            <el-button @click="applyThird">申请三级分类</el-button>
            <el-input v-if="isShowThird" v-model="thirdInput" style="width:140px" placeholder="请输入分类名称"></el-input>
        </div>
        <div style="margin-top:10px">
            <el-button @click="submitCategory" type="primary" size="medium">保存</el-button>
            <el-button type="" @click="cancelType" size="medium">取消</el-button>
        </div>

        <div style="margin-top:20px" class="infoItem">规格管理</div>系统规格
        <span class="specbtn" :key="i" v-for="(item,i) in sysSpec">{{item.norms}}</span>
        <div style="margin-top:20px">
            自定义规格
            <span class="specbtn" :key="i" v-for="(item,i) in spec">{{item.norms}}</span>
            <el-button type="primary" size="medium" @click="addSpec">添加规格</el-button>
        </div>

        <!-- 添加规格 -->
        <el-dialog title="添加规格" width="30%" :visible.sync="dialogFormVisible2">
            <el-form :model="form">
                <el-form-item label="规格名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" placeholder="请输入规格名称" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="submitSpec">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import {
    getNormslist,
    addNorms,
    getKindlist,
    addGoodsNewlist
} from "../../api/api";
import axios from "axios";
import qs from "qs";

export default {
    data() {
        return {
            firstType: [],
            secondType: [],
            thirdType: [],
            first: "",
            second: "",
            third: "",
            firstId:0,
            secondId:0,
            thirdId:0,
            firstInput:"",
            secondInput:"",
            thirdInput:"",
            isShowFirst: false,
            isShowSecond: false,
            isShowThird: false,
            spec: [], //自定义规格
            sysSpec: [], //系统规格
            // dialogFormVisible: false,
            dialogFormVisible2: false,
            form: {},
            form2:{},
            formLabelWidth: "120px",
            id:0,
        };
    },
    methods: {
        handleChange() {},
        applyFirst(){
            this.isShowFirst = true;
            this.firstId = 0;
        },
        applySecond(){
            this.isShowSecond = true;
            this.secondId = 0;
        },
        applyThird(){
            this.isShowThird = true;
            this.thirdId = 0;
        },
        // 申请新分类
        appNewType() {
            this.dialogFormVisible = true;
        },
        // 添加规格
        addSpec() {
            this.dialogFormVisible2 = true;
        },
        submitCategory(){
            const params = {
                f_name:this.firstInput,
                s_name:this.secondInput,
                t_name:this.thirdInput,
                f_id:this.firstId,
                s_id:this.secondId,
                t_id:this.thirdId,
            }
            addGoodsNewlist(qs.stringify(params)).then(res=>{
                if (res.data.code==200) {
                        this.$message({
                            message: res.data.msg,
                            type: "success"
                        });
                    }else{
                        this.$message({
                            message: res.data.msg,
                            type: "warning"
                        });
                    }
            }).catch()
            this.getKindlist();
        },
        cancelType() {
            this.isShowFirst = false;
            this.isShowSecond = false;
            this.isShowThird = false;
            this.firstInput = "";
            this.secondInput = "";
            this.thirdInput = "";
        },
        choseFirst(id) {
            const params = {
                pid: id
            };
            getKindlist(params)
                .then(res => {
                    const data = res.data.data;
                    this.secondType = data.data;
                    this.secondType.map(item=>{
                        if(item.status==3){
                            item.label = `${item.label}(待审核)`
                        }
                    })
                    this.second = "";
                    this.third = "";
                    this.firstId = id;
                })
                .catch();
        },
        choseSecond(id) {
            const params = {
                pid: id
            };
            getKindlist(params)
                .then(res => {
                    const data = res.data.data;
                    this.thirdType = data.data;
                    this.thirdType.map(item=>{
                        if(item.status==3){
                            item.label = `${item.label}(待审核)`
                        }
                    })
                    this.third = "";
                    this.thirdId = id;
                })
                .catch();
        },
        choseThird(id) {
            this.thirdId = id;
        },
        getNormslist() {
            getNormslist()
                .then(res => {
                    const data = res.data.data;
                    this.spec = data.data;
                    this.sysSpec = data.system;
                })
                .catch();
        },
        getKindlist() {
            const params = {
                pid: 0
            };
            getKindlist(params)
                .then(res => {
                    const data = res.data.data;
                    this.firstType = data.data;
                    this.firstType.map(item=>{
                        if(item.status==3){
                            item.label = `${item.label}(待审核)`
                        }
                    })
                    
                })
                .catch();
        },
        submitSpec() {
            const params = {
                name: this.form.name
            };
            addNorms(qs.stringify(params))
                .then(res => {
                    if (res.data.code==200) {
                        this.$message({
                            message: res.data.msg,
                            type: "success"
                        });
                    }else{
                        this.$message({
                            message: res.data.msg,
                            type: "warning"
                        });
                    }
                })
                .catch();
            this.dialogFormVisible2 = false;
            this.getNormslist();
        }
    },
    created() {},
    mounted() {
        this.getNormslist();
        this.getKindlist();
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
