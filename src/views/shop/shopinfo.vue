<template>
    <!-- 店铺信息 -->
    <section style="padding:20px">
        <el-form class="shopInfo" ref="form" :model="form" label-width="80px">
            <div class="infoItem">店铺信息</div>
            <el-form-item label="店铺logo:">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img src="imageUrl" alt />
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
                    <el-button @click="cancelPhone">取消</el-button>
                </template>
            </el-form-item>
            <el-form-item label="店铺链接">
                <!-- <el-input v-model="form.link"></el-input> -->
                <el-input :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="店铺介绍">
                <el-input type="textarea" v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
            <div class="infoItem">店铺资料</div>
            <div style="padding:10px">店铺类型：美食</div>
            <div style="padding:10px">店铺归属地：安徽省鞍山市花山区</div>
            <div class="demo-image__preview">
                相关证件
                <el-image
                    style="width: 100px; height: 100px"
                    :src="url"
                    :preview-src-list="srcList"
                ></el-image>
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
            imageUrl: "",
            form: {
                logo:"",
                name: "",
                mobile: "",
                description: ""
            },
            isPhoneNum2: false,
            url:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            srcList: [
                "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
                "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
            ]
        };
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        onSubmit() {
            // const  params  = JSON.parse(JSON.stringify(this.form))
            // // console.log(JSON.parse(this.form));
            // console.log(params)
            const params = this.form;
            console.log(params);
            submitInformation(params).then(data => {
                console.log(data.data);
            });
        },
        // 添加号码
        addPhone() {
            this.isPhoneNum2 = true;
        },
        cancelPhone() {
            this.isPhoneNum2 = false;
        }
    },
    mounted() {
        getInformation().then(data => {
            // console.log(data);
        });
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
}
</style>
