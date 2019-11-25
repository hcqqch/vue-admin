<template>
    <!-- 商圈设置 -->
    <section class="setcircle" style="padding:20px">
        <div class="infoItem">商圈设置</div>
        <el-card shadow="always">
            <el-row>
                <el-form ref="form" :model="form" label-width="150px">
                    <el-form-item label="加入是否需要审核">
                        <el-radio v-model="isExamine" label="1">否，不需要审核</el-radio>
                        <el-radio v-model="isExamine" label="2">是，需要审核</el-radio>
                    </el-form-item>
                    <el-form-item label="加入商圈是否收费">
                        <el-radio v-model="isFree" label="1">否，不需要收费</el-radio>
                        <el-radio v-model="isFree" label="2">是，需要收费</el-radio>
                        <span v-if="isFree!=1">
                            收费金额:
                            <el-input style="width:120px" placeholder="请输入金额（元）" v-model="price" clearable></el-input>
                        </span>
                    </el-form-item>
                    <el-form-item label="管理员权限">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="允许发布动态"></el-checkbox>
                            <el-checkbox label="允许发布文章"></el-checkbox>
                            <el-checkbox label="允许发布视频"></el-checkbox>
                            <el-checkbox label="允许提出成员"></el-checkbox>
                            <el-checkbox label="允许审核加入申请"></el-checkbox>
                            <el-checkbox label="允许修改公告"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="管理员管理">
                        <el-transfer :titles="['管理员', '非管理员']" v-model="shuttle" :data="shdata"></el-transfer>
                    </el-form-item>
                    <el-form-item label="商圈logo">
                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="商圈封面">
                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="商圈宣传视频">
                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="轮播图">
                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </el-row>
        </el-card>
    </section>
</template>

<script>
import { getUserList } from "../../api/api";
export default {
    data() {
        const generateData = _ => {
            const data = [];
            for (let i = 1; i <= 15; i++) {
                data.push({
                    key: i,
                    label: `备选项 ${i}`,
                    disabled: i % 4 === 0
                });
            }
            console.log(data);
            return data;
        };
        return {
            form: {},
            price:'',//收费金额
            isExamine: "1", //是否需要审核
            isFree: "1", //是否需要收费
            checkList: [], //管理员权限
            shdata: generateData(), //穿梭框所有的值
            shuttle: [1, 4], //穿梭框左边的值
            imageUrl: "",//上传图片地址
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
        }
    },
    mounted() {}
};
</script>

<style lang="scss">
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
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
}
</style>