<template>
    <!-- 店铺信息 -->
    <section style="padding:20px">
        <el-form class="shopInfo" ref="form" :model="form" label-width="80px">
            <div class="infoItem">店铺信息</div>
            <el-form-item label="店铺logo:">
                <el-upload
                    class="avatar-uploader"
                    action="http://up.qiniup.com"
                    :data="qiniuData"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload" 
                >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </el-form-item>
            <el-form-item label="店铺名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item> 
            <el-form-item style="width:542px" label="联系电话">
                <el-input style="width:80%" v-model="form.mobile" placeholder="请输入号码1"></el-input>
                <el-button @click="addPhone">添加</el-button>
                <template v-if="isPhoneNum2">
                    <el-input
                        style="width:80%;margin-top:10px"
                        v-model="form.mobile2"
                        placeholder="请输入号码2"
                    ></el-input>
                    <el-button @click="cancelPhone">删除</el-button>
                </template>
            </el-form-item>
            <el-form-item label="店铺链接">
                <el-input v-model="link" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="店铺介绍">
                <el-input type="textarea" v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <!-- <el-button>取消</el-button> -->
            </el-form-item>
            <div class="infoItem">店铺资料</div>
            <div style="padding:10px">
                店铺类型：
                <span>{{typeName}}</span>
            </div>
            <div style="padding:10px">
                店铺归属地：
                <span>{{belongArea}}</span>
            </div>
            <div style="padding:10px" class="demo-image__preview">
                <div>相关证件:</div>
                <div class="flex-wrap">
                    <div class="img-wrap">
                        <span class="img-title">营业执照</span>
                        <el-image style="width: 200px; height: 150px" :src="url1" :fit="fit"></el-image>
                    </div>
                    <div class="img-wrap">
                        <span class="img-title">法人身份证正面</span>
                        <el-image style="width: 200px; height: 150px" :src="url2" :fit="fit"></el-image>
                    </div>
                    <div class="img-wrap">
                        <span class="img-title">法人身份证反面</span>
                        <el-image style="width: 200px; height: 150px" :src="url3" :fit="fit"></el-image>
                    </div>
                    <div class="img-wrap">
                        <span class="img-title">法人手持身份证</span>
                        <el-image style="width: 200px; height: 150px" :src="url4" :fit="fit"></el-image>
                    </div>
                </div>
                <div class="flex-wrap">
                    <div class="img-wrap" v-for="(item,i) in items" :key="i">
                        <span class="img-title">其他资质</span>
                        <el-image style="width: 200px; height: 150px" :src="items[i]" :fit="fit"></el-image>
                    </div>
                </div>
            </div>
        </el-form>
    </section>
</template>

<script>
import { getInformation, submitInformation } from "../../api/api";
import axios from "axios";

export default {
    data() {
        return {
            form: {
                logo: "",
                name: "",
                mobile: "",
                mobile2: "",
                description: ""
            },
            link: "",
            upload_qiniu_addr: "http://img.pintaihui.cn/",
            qiniuData: { key: "", token: "" },
            imageUrl: "",
            Global: {
                dataUrl: "https://office.pintaihui.cn"
            },
            isPhoneNum2: false,
            typeName: "", //店铺类型
            belongArea: "", //店铺归属地
            url1: "",
            url2: "",
            url3: "",
            url4: "",
            fit: "scale-down",
            items: [] //其他资质证明
        };
    },
    methods: {
        getQiniuToken: function() {
            const _this = this;
            axios
                .post(this.Global.dataUrl + "/api/v1/qiniu/token")
                .then(function(res) {
                    console.log(res);
                    if (res.data) {
                        console.log(res.data.token);
                        _this.qiniuData.token = res.data.data.token;
                    } else {
                        _this.$message({
                            message: res.data.msg,
                            duration: 2000,
                            type: "warning"
                        });
                    }
                });
        },
        beforeAvatarUpload: function(file) {
            console.log(file.name);
            this.qiniuData.key = file.name;
            const isJPG = file.type === "image/jpeg";
            const isPNG = file.type === "image/png";
            const isGIF = file.type === "image/gif";
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG && !isPNG) {
                this.$message.error("图片只能是 JPG/PNG/GIF 格式!");
                return false;
            }
            if (!isLt2M) {
                this.$message.error("图片大小不能超过 2MB!");
                return false;
            }
        },
        handleAvatarSuccess: function(res, file) {
            console.log(res.key);
            this.imageUrl = this.upload_qiniu_addr + res.key;
            console.log(this.imageUrl);
        },
        handleError: function(res) {
            this.$message({
                message: "上传失败",
                duration: 2000,
                type: "warning"
            });
        },
        // 保存
        onSubmit() {
            const params = {
                logo: this.imageUrl,
                name: this.form.name,
                mobile: `${this.form.mobile},${this.form.mobile2}`,
                description: this.form.description
            };
            
            submitInformation(params)
                .then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: res.data.msg,
                            type: "success"
                        });
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: "warning"
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 添加号码
        addPhone() {
            this.isPhoneNum2 = true;
        },
        cancelPhone() {
            this.isPhoneNum2 = false;
            this.form.mobile2 = "";
        },
        // 获取店铺信息
        getInformation() {
            getInformation().then(res => {
                const data = res.data.data.data;
                this.imageUrl = data.logo;
                this.form.name = data.name;
                this.form.description = data.description;
                this.form.mobile = data.mobile.split(",")[0];
                this.form.mobile2 = data.mobile.split(",")[1];
                console.log(this.form.mobile2);
                if (this.form.mobile2.length > 0) this.isPhoneNum2 = true;
                this.link = data.link;
                this.typeName = data.type_name;
                this.belongArea = data.address;
                this.url1 = data.rz.company_license;
                this.url2 = data.rz.identity_front;
                this.url3 = data.rz.identity_back;
                this.url4 = data.rz.people_identity_front;
                this.items = data.rz.other;
            });
        },
    },
    created() {
        this.getQiniuToken();
    },
    mounted() {
        this.getInformation();
    }
};
</script>

<style lang="scss" scoped>
.shopInfo {
    .infoItem {
        width: 99%;
        padding: 10px;
        background: #f2f2f2;
        margin-bottom: 20px;
    }
    .el-form-item {
        width: 450px;
    }

    .avatar-uploader {
        .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            margin-top: 10px;
        }
        .el-upload:hover {
            border-color: #409eff;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
            border: 1px dashed #d9d9d9;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }
    .el-textarea__inner {
        height: 150px;
    }
    .flex-wrap {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
    .img-wrap {
        position: relative;
    }
    .img-title {
        position: absolute;
        top: -20px;
        left: 64px;
    }
}
</style>
