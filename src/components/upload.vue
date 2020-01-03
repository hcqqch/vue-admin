<template>
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
</template>
<script>
export default {
    data() {
        qiniuData:{
            
        }
    },
    methods:{

    },
    created(){
        
    }
};
</script>
<style scoped>
</style>