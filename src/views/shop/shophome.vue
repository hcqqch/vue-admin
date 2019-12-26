<template>
    <!-- 店铺主页 -->
    <section style="padding:20px">
        <el-form class="shopInfo" ref="form" label-width="120px">
            <div class="infoItem">店铺主页</div>
            <el-form-item label="店铺banner图:">
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
            <el-form-item label="店铺活动模块">
                <el-input v-model="active_plate"></el-input>
            </el-form-item>
            <el-form-item label="店铺优惠券显示">
                <el-switch v-model="isCoupon"></el-switch>
            </el-form-item>
            <el-form-item label="店铺商圈显示">
                <el-switch v-model="isCircle"></el-switch>
            </el-form-item>
            <el-form-item label="店铺底部说明">
                <el-input type="textarea" v-model="desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <!-- <el-button>取消</el-button> -->
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
import {
    submitHomepageinfo,
    getHomeInformation,
    getInformation
} from "../../api/api";
import axios from "axios";
import qs from "qs";

export default {
    data() {
        return {
            isCoupon: true, //是否显示优惠券
            isCircle: true, //是否显示商圈
            active_plate: "", //活动模块
            desc: "", //店铺底部说明
            upload_qiniu_addr: "http://q1ecexot0.bkt.clouddn.com/",
            qiniuData: { key: "", token: "" },
            imageUrl: "",
            Global: {
                dataUrl: "http://office.pintaihui.cn"
            }
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
        onSubmit() {
            const params = {
                banner: this.imageUrl,
                coupon_display: this.isCoupon ? 1 : 0,
                circle_display: this.isCoupon ? 1 : 0,
                active_plate: this.active_plate,
                footer_description: this.desc
            };
            console.log(qs.stringify(params));
            submitHomepageinfo(qs.stringify(params), config)
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
        getHomeInformation() {
            getHomeInformation().then(res => {
                const data = res.data.data.data;
                this.imageUrl = data.banner;
                this.active_plate = data.active_plate;
                this.desc = data.footer_description;
                if (data.coupon_display == 1) this.isCoupon = true;
                if (data.coupon_display == 0) this.isCoupon = false;
                if (data.circle_display == 1) this.isCircle = true;
                if (data.circle_display == 0) this.isCircle = false;
            });
        }
    },
    created() {
        this.getQiniuToken();
    },
    mounted() {
        this.getHomeInformation();
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
    .avatar-uploader .el-upload {
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        margin-top: 10px;
    }
    .avatar-uploader .el-upload:hover {
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

    .el-form-item__content {
        width: 450px;
    }
    .el-textarea__inner {
        height: 150px;
    }
}
</style>
