<template>
    <!-- 个人信息 -->
    <section style="padding:20px">
        <div class="infoItem">个人信息</div>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="用户名">
                <el-input v-model="form.account" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="所属部门">
                <el-input v-model="form.department_name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="form.mobile" :disabled="phoneDis" style="width:77%"></el-input>
                <el-button v-if="phoneDis" @click="changeMobile">更换</el-button>
                <el-button v-if="!phoneDis" @click="saveMobile">确定</el-button>
            </el-form-item>
            <el-form-item label="创建日期">
                <el-input v-model="form.created_at" :disabled="true" style="width:77%"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input
                    type="password"
                    v-model="form.password"
                    placeholder="请输入密码"
                    :disabled="psdDis"
                    style="width:77%"
                ></el-input>
                <el-input
                    v-if="!psdDis"
                    type="password"
                    v-model="form.re_password"
                    placeholder="请确认密码"
                    :disabled="psdDis"
                    style="width:77%;margin-top:10px"
                ></el-input>
                <el-button v-if="psdDis" @click="changePsd">修改</el-button>
                <el-button v-if="!psdDis" @click="savePsd">确定</el-button>
            </el-form-item>
            <el-form-item label="绑定圈助账号">
                <el-input
                    style="width:77%"
                    v-model="form.bind_mobile"
                    :disabled="bindDis"
                    placeholder
                ></el-input>
                <el-button v-if="!bindDis&&form.bind_mobile!==''" @click="saveBind">确定</el-button>
                <el-button v-if="!bindDis&&form.bind_mobile==''" @click="saveunBind">确定</el-button>
                <el-button v-if="bindDis&&form.bind_mobile==''" @click="changeBind">绑定</el-button>
                <el-button v-if="bindDis&&form.bind_mobile!==''" @click="saveunBind">解绑</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>
<script>
import {
    getEmployeeInfo,
    updatePsd,
    updateMobile,
    bindAccount,
    unbindAccount
} from "../../api/api";
import utils from "../../common/js/util";

export default {
    data() {
        return {
            form: {
                account: "",
                department_name: "",
                mobile: "",
                created_at: "",
                password: "12345678",
                re_password:"",
                bind_mobile: ""
            },
            phoneDis: true,
            psdDis: true,
            bindDis: true
        };
    },
    methods: {
        changeMobile() {
            this.phoneDis = false;
        },
        changePsd() {
            this.psdDis = false;
            this.form.password = "";
            this.form.re_password = "";
        },
        changeBind() {
            this.bindDis = false;
        },
        saveMobile() {
            const params = {
                phone: this.form.mobile
            };
            updateMobile(params)
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
                .catch(err => {
                    console.log(err);
                });
                this.phoneDis =true;
        },
        savePsd() {
            const params = {
                password: this.form.password,
                re_password:this.form.re_password
            };
            updatePsd(params)
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
                .catch(err => {
                    console.log(err);
                });
                this.psdDis =true;
        },
        saveBind() {
            const params = {
                user: this.form.bind_mobile
            };
            bindAccount(params)
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
                .catch(err => {
                    console.log(err);
                });
                this.bindDis =true;
        },
        saveunBind() {
            // const params = {
            //     user: this.form.bind_mobile
            // };
            unbindAccount()
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
                .catch(err => {
                    console.log(err);
                });
                this.bindDis =true;
                this.form.bind_mobile = ""
        },
        getEmployeeInfo() {
            getEmployeeInfo()
                .then(res => {
                    const data = res.data.data.data;
                    this.form.account = data.account;
                    this.form.department_name = data.department_name;
                    this.form.mobile = data.mobile;
                    this.form.created_at = data.created_at;
                    this.form.bind_mobile = data.bind_mobile;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.getEmployeeInfo();
    }
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