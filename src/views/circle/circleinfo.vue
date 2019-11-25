<template>
    <section style="padding:20px">
        <div class="infoItem">商圈信息</div>
        <el-card shadow="always">
            <el-row>
                <el-col :span="12">
                    <div>商圈名称：马鞍山钓鱼圈</div>
                </el-col>
                <el-col :span="12">
                    <div>创建时间：2019/10/29</div>
                </el-col>
            </el-row>
        </el-card>

        <el-card style="margin-top:20px" shadow="always">
            <el-row>
                <el-col :span="3">
                    <div class>
                        <div class="des">成员数</div>
                        <div class="num">18</div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class>
                        <div class="des">管理人</div>
                        <div class="num">18</div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class>
                        <div class="des">创建天数</div>
                        <div class="num">18</div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class>
                        <div class="des">访问次数</div>
                        <div class="num">18</div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class>
                        <div class="des">商圈分享（次）</div>
                        <div class="num">18</div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class>
                        <div class="des">商圈动态</div>
                        <div class="num">18</div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class>
                        <div class="des">动态转发量</div>
                        <div class="num">18</div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class>
                        <div class="des">文章转发量</div>
                        <div class="num">18</div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class>
                        <div class="des">商圈视频</div>
                        <div class="num">18</div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class>
                        <div class="des">视频转发量</div>
                        <div class="num">18</div>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <el-card style="margin-top:20px" shadow="always">
            <el-row style="margin-top:20px;line-height:32px;">
                <el-col :span="24">
                    <div>商圈性质：行业圈</div>
                </el-col>
                <el-col :span="24">
                    <div>所属行业：金融圈</div>
                </el-col>
                <el-col :span="24">
                    <div>所属地区：安徽省马鞍山市</div>
                </el-col>
                <el-col :span="24">
                    <div>商圈简介：这只是一个商圈，天哪</div>
                </el-col>
            </el-row>
        </el-card>
    </section>
</template>

<script>
import { getUserList } from "../../api/api";
export default {
    data() {
        return{}
    },
    methods() {},
    mounted() {}
};
</script>

<style lang="scss" scoped>
.el-col-3 {
    text-align: center;
}
.des {
    color: #666666;
    // font-size: 16px;
    padding: 10px;
}
.num {
    font-size: 24px;
}
.infoItem {
    width: 99%;
    padding: 10px;
    background: #f2f2f2;
    margin-bottom: 20px;
}
</style>