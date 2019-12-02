<template>
    <!-- 登录 -->
    <el-form
        :model="ruleForm2"
        :rules="rules2"
        ref="ruleForm2"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container"
    >
        <img @click="showCode" class="code-login" src="../assets/code.png" alt="切换登录" title="切换登录方式" />
        <h3 class="title">圈助商户管理平台</h3>
        <div v-show="isShow">
            <el-form-item prop="account">
                <el-input
                    type="text"
                    v-model="ruleForm2.account"
                    auto-complete="off"
                    placeholder="请输入用户名"
                ></el-input>
            </el-form-item>
            <el-form-item prop="shop">
                <el-select v-model="ruleForm2.shop_id" placeholder="请选择店铺">
                    <!-- <el-option label="店铺1" value="owner"></el-option>
                    <el-option label="店铺2" value="service"></el-option>
                    <el-option label="店铺3" value="admin"></el-option> -->
                </el-select>
            </el-form-item>
            <el-form-item prop="identity">
                <el-select v-model="ruleForm2.account_id" placeholder="请选择您的身份">
                    <el-option label="店主" value="owner"></el-option>
                    <el-option label="客服" value="service"></el-option>
                    <el-option label="管理员" value="admin"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input
                    type="password"
                    v-model="ruleForm2.checkPass"
                    auto-complete="off"
                    placeholder="请输入密码"
                ></el-input>
            </el-form-item>
            <el-link type="primary" href target="_blank">官网下载app</el-link>
            <el-link style="float:right" :underline="true" type="primary" href target="_blank">忘记密码</el-link>

            <el-form-item style="margin-top:20px">
                <SliderVerificationCode v-model="slideValue" />
            </el-form-item>

            <el-form-item style="width:100%;margin-top:10px">
                <el-button
                    type="primary"
                    style="width:100%;"
                    @click.native.prevent="handleSubmit2"
                    :loading="logining"
                >登录</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>

<script>
// import { requestLogin } from "../api/api";
import SliderVerificationCode from "slider-verification-code";
import "slider-verification-code/lib/slider-verification-code.css";
import Vue from "vue";
import { requestLogin } from '../api/api';
Vue.use(SliderVerificationCode);
export default {
    data() {
        return {
            logining: false,
            ruleForm2: {
                account: "",
				checkPass: "",
				shop_id:"",
				account_id:""
            },
            rules2: {
                account: [
                    { required: true, message: "请输入用户名", trigger: "blur" }
				],
				shop: [
                    { required: true, message: "请选择店铺", trigger: "change" }
				],
				identity: [
                    { required: true, message: "请选择您的身份", trigger: "change" }
                ],
                checkPass: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            },
            slideValue: false,
            isShow: true
        };
    },
    methods: {
        handleSubmit2(ev) {
			const params = this.ruleForm2
			requestLogin(params).then((res)=>{

			})
            this.$router.push("/survey");
            // return false;
            // var _this = this;
            // this.$refs.ruleForm2.validate(valid => {
            //     if (valid) {
            //         if (this.slideValue == false) {
            //             this.$message("您没有通过验证");
            //             return false;
            //         }
            //         //_this.$router.replace('/table');
            //         this.logining = true;
            //         var loginParams = {
            //             username: this.ruleForm2.account,
            //             password: this.ruleForm2.checkPass
            //         };
            //         // this.$router.push({ path: "/survey" });
            //         requestLogin(loginParams).then(data => {
            //             this.logining = false;
            //             //NProgress.done();
            //             let { msg, code, user } = data;
            //             if (code !== 200) {
            //                 this.$message({
            //                     message: msg,
            //                     type: "error"
            //                 });
            //             } else {
            //                 sessionStorage.setItem(
            //                     "user",
            //                     JSON.stringify(user)
            //                 );
            //                 this.$router.push({ path: "/survey" });
            //             }
            //         });
            //     } else {
            //         console.log("error submit!!");
            //         return false;
            //     }
            // });
        },
        // 点击切换二维码显示
        showCode() {
			this.isShow = !this.isShow;
			// this.isShow = !this.isShow;
			
        }
	},
	mounted() {
		
	},
};
</script>

<style lang="scss" scoped>
.login-container {
    position: relative;
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .el-select {
        width: 100%;
    }
    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .remember {
        margin: 0px 0px 35px 0px;
    }
    .code-login {
        position: absolute;
        width: 20px;
        height: 20px;
        right: 20px;
        top: 20px;
        cursor: pointer;
    }
}
</style>
