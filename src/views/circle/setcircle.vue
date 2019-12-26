<template>
    <!-- 商圈设置 -->
    <section class="setcircle" style="padding:20px">
        <div class="infoItem">商圈设置</div>
        <el-card shadow="always">
            <el-row>
                <el-form ref="form" :model="form" label-width="150px">
                    <el-form-item label="加入是否需要审核">
                        <el-radio v-model="form.isExamine" label="0">否，不需要审核</el-radio>
                        <el-radio v-model="form.isExamine" label="1">是，需要审核</el-radio>
                    </el-form-item>
                    <el-form-item label="加入商圈是否收费">
                        <el-radio v-model="form.isFree" label="0">否，不需要收费</el-radio>
                        <el-radio v-model="form.isFree" label="1">是，需要收费</el-radio>
                        <span v-if="form.isFree!=0">
                            收费金额:
                            <el-input
                                style="width:120px"
                                placeholder="请输入金额（元）"
                                v-model="form.price"
                                clearable
                            ></el-input>
                        </span>
                    </el-form-item>
                    <el-form-item label="管理员权限">
                        <el-checkbox-group v-model="form.checkList">
                            <el-checkbox label="1">允许发布动态</el-checkbox>
                            <el-checkbox label="2">允许发布文章</el-checkbox>
                            <el-checkbox label="3">允许发布视频</el-checkbox>
                            <el-checkbox label="4">允许提出成员</el-checkbox>
                            <el-checkbox label="5">允许审核加入申请</el-checkbox>
                            <el-checkbox label="6">允许修改公告</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="管理员管理">
                        <el-transfer
                            :titles="['管理员', '非管理员']"
                            v-model="form.shuttle"
                            :data="form.shdata"
                        ></el-transfer>
                    </el-form-item>
                    <el-form-item label="商圈logo" required>
                        <el-upload
                            class="avatar-uploader"
                            action="http://up.qiniup.com"
                            :show-file-list="false"
                            :data="qiniuData"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="商圈封面图" required>
                        <el-upload
                            class="avatar-uploader"
                            action="http://up.qiniup.com"
                            :show-file-list="false"
                            :data="qiniuData"
                            :on-success="handleAvatarSuccess2"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img v-if="imageUrl2" :src="imageUrl2" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="商圈宣传视频" required>
                        <el-upload
                            class="avatar-uploader"
                            action="http://up.qiniup.com"
                            :show-file-list="false"
                            :data="qiniuData"
                            :on-success="handleAvatarSuccess3"
                            :before-upload="beforeAvatarUpload2"
                        >
                            <video v-if="videosrc" :src="videosrc" class="video"></video>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="轮播图" style="width:940px" required>
                        <img v-for="(item,i) in img_json" :key="i" :src="item" alt />
                        <el-upload
                            action="http://up.qiniup.com"
                            list-type="picture-card"
                            :data="qiniuData"
                            :before-upload="beforeAvatarUpload"
                            :on-success="handleAvatarSuccess4"
                            :on-remove="handleRemove"
                        >
                            <i class="el-icon-plus"></i>
                            <div slot="file" slot-scope="{file}">
                                <span class="el-upload-list__item-actions">
                                    <span
                                        class="el-upload-list__item-preview"
                                        @click="handleLink(file)"
                                    >
                                        <i class="el-icon-zoom-in"></i>
                                    </span>
                                </span>
                            </div>
                        </el-upload>
                    </el-form-item>
                    <div style="text-align:center">
                        <el-button @click="submitSetting" type="primary">保存设置</el-button>
                    </div>
                </el-form>
            </el-row>
        </el-card>
        <el-dialog width="30%" title="链接地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="该图链接地址">
                    <el-input v-model="formInline.link" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitLink">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import { setCircle, getCircleInfo } from "../../api/api";
import utils from "@/common/js/util";
import axios from "axios";
import qs from "qs";

export default {
    data() {
        return {
            form: {
                isExamine: "", //是否需要审核
                isFree: "", //是否需要收费
                price: "", //收费金额
                checkList: [], //管理员权限
                shdata: [], //穿梭框所有的值
                shuttle: [] //穿梭框右边的值
            },
            formInline: {
                link: ""
            },
            dialogFormVisible: false,
            upload_qiniu_addr: "http://video.pintaihui.cn/",
            upload_qiniu_addr2: "http://q1ecexot0.bkt.clouddn.com/",
            qiniuData: { key: "", token: "" },
            imageUrl1: "",
            imageUrl2: "",
            videosrc: "",
            Global: {
                dataUrl: "http://office.pintaihui.cn/api/v1"
            },
            img_json: [],
            link_json: []
        };
    },
    methods: {
        getQiniuToken: function() {
            const _this = this;
            axios
                .post(this.Global.dataUrl + "/qiniu/token")
                .then(function(res) {
                    if (res.data) {
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
        handleAvatarSuccess(res, file) {
            this.imageUrl1 = this.upload_qiniu_addr2 + res.key;
            if (res.key !== "") {
                this.$message({
                    message: "上传成功",
                    type: "success"
                });
            } else {
                this.$message({
                    message: "上传失败",
                    type: "warning"
                });
            }
        },
        handleAvatarSuccess2(res, file) {
            this.imageUrl2 = this.upload_qiniu_addr2 + res.key;
            if (res.key !== "") {
                this.$message({
                    message: "上传成功",
                    type: "success"
                });
            } else {
                this.$message({
                    message: "上传失败",
                    type: "warning"
                });
            }
        },
        handleAvatarSuccess3(res, file) {
            this.videosrc = this.upload_qiniu_addr + res.key;
            if (res.key !== "") {
                this.$message({
                    message: "上传成功",
                    type: "success"
                });
            } else {
                this.$message({
                    message: "上传失败",
                    type: "warning"
                });
            }
        },
        handleAvatarSuccess4(res, file) {
            if (res.key !== "") {
                this.$message({
                    message: "上传成功",
                    type: "success"
                });
            } else {
                this.$message({
                    message: "上传失败",
                    type: "warning"
                });
            }
            this.img_json.push(this.upload_qiniu_addr2 + res.key);
            this.dialogFormVisible = true;
        },
        handleRemove(file, fileList) {
            console.log(file);
            return false;
        },
        // handleLink() {
        //     this.dialogFormVisible = true;
        // },
        submitLink() {
            this.link_json.push(this.formInline.link);
            this.dialogFormVisible = false;
        },
        beforeAvatarUpload(file) {
            this.qiniuData.key = file.name;
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error("上传图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        beforeAvatarUpload2(file) {
            this.qiniuData.key = file.name;
        },
        getCircleInfo() {
            getCircleInfo()
                .then(res => {
                    const data = res.data.data;
                    this.form.shdata = data.admin;
                    this.form.shdata.map(item => {
                        item.label = item.account;
                        item.key = item.id;
                    });
                    this.form.isExamine = data.data.is_verify;
                    this.form.isFree = data.data.is_price;
                    if(data.data.price>0){
                        this.form.price = Number(data.data.price);
                    }
                    this.form.checkList =  data.data.checked.split(',');
                    if(data.data.admin_id.length>1){
                        this.form.shuttle = data.data.admin_id.split(',').map(Number);
                    }else{
                        this.form.shuttle = data.data.admin_id;
                    }

                    this.imageUrl1 = data.data.logo;
                    this.imageUrl2 = data.data.thumb;
                    this.videosrc = data.data.video;
                    let imgs = JSON.parse(data.data.imgs);
                    imgs.map(item=>{
                        this.img_json.push(item.img);
                        this.link_json.push(item.link);
                    })
                })
                .catch(err => {
                    console.log(err);
                });
        },
        submitSetting() {
            let price = "";
            let shdata = [];
            if (this.form.isFree == 0) {
                price = 0;
            } else {
                price = this.form.price;
            }
            if (this.form.shdata.length > 0) {
                this.form.shdata.map(item => {
                    shdata.push(item.key);
                });
            }

            const params = {
                is_verify: this.form.isExamine,
                price: price,
                checked: this.form.checkList.toString(),
                admin_id: shdata.toString(),
                logo: this.imageUrl1,
                thumb: this.imageUrl2,
                video: this.videosrc,
                imgs: this.img_json.toString(),
                links: this.link_json.toString()
            };
            console.log(params);
            setCircle(params)
                .then(res => {
                    const data = res.data.data.data;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.getQiniuToken();
        this.getCircleInfo();
    }
};
</script>

<style lang="scss" scoped>
.setcircle {
    .infoItem {
        width: 99%;
        padding: 10px;
        background: #f2f2f2;
        margin-bottom: 20px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 148px;
        height: 148px;
        line-height: 148px;
        text-align: center;
        border: 1px dashed #d9d9d9;
    }
    .avatar {
        width: 148px;
        height: 148px;
        display: block;
    }
    .video {
        position: absolute;
        left: 0px;
        width: 147px;
        height: 147px;
    }
}
</style>